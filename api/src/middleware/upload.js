const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuration du stockage avec organisation par dossiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Organiser par type de fichier et par date
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    
    let subDir = 'images';
    if (file.mimetype.startsWith('video/')) {
      subDir = 'videos';
    }
    
    const uploadDir = path.join(__dirname, '../../uploads', subDir, `${year}`, `${month}`);
    
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Générer un nom de fichier unique et SEO-friendly
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const baseName = file.originalname.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});

// Filtre pour les types de fichiers autorisés
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ];
  
  const allowedVideoTypes = [
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/x-msvideo', // .avi
    'video/x-ms-wmv'   // .wmv
  ];
  
  if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Type de fichier non autorisé: ${file.mimetype}. Types autorisés: images (JPEG, PNG, GIF, WebP, SVG) et vidéos (MP4, MOV, AVI)`), false);
  }
};

// Configuration de multer avec limites adaptées
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max (pour les vidéos)
    files: 20 // Maximum 20 fichiers
  }
});

// Middleware pour uploader une seule image
const uploadSingle = upload.single('image');

// Middleware pour uploader plusieurs images
const uploadMultiple = upload.array('images', 20);

// Middleware pour uploader images et vidéos
const uploadMixed = upload.fields([
  { name: 'images', maxCount: 15 },
  { name: 'videos', maxCount: 5 }
]);

// Middleware pour gérer les erreurs d'upload
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Fichier trop volumineux. Taille maximum : 50MB pour les vidéos, 5MB pour les images'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Trop de fichiers. Maximum : 20 fichiers au total'
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Champ de fichier inattendu'
      });
    }
  }
  
  if (err.message.includes('Type de fichier non autorisé')) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  console.error('Erreur upload:', err);
  next(err);
};

// Fonction pour supprimer un fichier
const deleteFile = (filePath) => {
  try {
    let fullPath;
    if (path.isAbsolute(filePath)) {
      fullPath = filePath;
    } else {
      // Si c'est un chemin relatif comme "/uploads/images/2024/01/file.jpg"
      fullPath = path.join(__dirname, '../..', filePath);
    }
    
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`📁 Fichier supprimé: ${fullPath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erreur suppression fichier:', error);
    return false;
  }
};

// Fonction pour obtenir l'URL d'un fichier
const getFileUrl = (filePath) => {
  if (!filePath) return null;
  const baseUrl = process.env.API_URL || 'http://localhost:5000';
  
  // Si le chemin commence déjà par /uploads, l'utiliser tel quel
  if (filePath.startsWith('/uploads')) {
    return `${baseUrl}${filePath}`;
  }
  
  // Sinon, ajouter le préfixe /uploads
  return `${baseUrl}/uploads/${filePath}`;
};

// Fonction pour optimiser les images (placeholder pour future implémentation)
const optimizeImage = async (filePath) => {
  // TODO: Implémenter l'optimisation d'images avec sharp ou similar
  // Pour l'instant, retourner le chemin tel quel
  return filePath;
};

// Fonction pour obtenir les informations d'un fichier
const getFileInfo = (filePath) => {
  try {
    const fullPath = path.join(__dirname, '../..', filePath);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      const ext = path.extname(filePath).toLowerCase();
      
      return {
        exists: true,
        size: stats.size,
        sizeFormatted: formatFileSize(stats.size),
        lastModified: stats.mtime,
        type: getFileType(ext),
        extension: ext
      };
    }
    return { exists: false };
  } catch (error) {
    console.error('Erreur info fichier:', error);
    return { exists: false, error: error.message };
  }
};

// Fonction pour formater la taille des fichiers
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Fonction pour déterminer le type de fichier
const getFileType = (extension) => {
  const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const videoExts = ['.mp4', '.mov', '.avi', '.wmv', '.mpeg'];
  
  if (imageExts.includes(extension)) return 'image';
  if (videoExts.includes(extension)) return 'video';
  return 'unknown';
};

// Middleware pour nettoyer les anciens fichiers (appelé périodiquement)
const cleanupOldFiles = (maxAgeInDays = 30) => {
  const uploadsDir = path.join(__dirname, '../../uploads');
  const maxAge = maxAgeInDays * 24 * 60 * 60 * 1000; // en millisecondes
  
  function cleanDirectory(dir) {
    try {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          cleanDirectory(filePath);
        } else {
          const now = new Date().getTime();
          const fileAge = now - stat.mtime.getTime();
          
          if (fileAge > maxAge) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Fichier ancien supprimé: ${filePath}`);
          }
        }
      });
    } catch (error) {
      console.error('Erreur nettoyage:', error);
    }
  }
  
  if (fs.existsSync(uploadsDir)) {
    cleanDirectory(uploadsDir);
  }
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  uploadMixed,
  handleUploadError,
  deleteFile,
  getFileUrl,
  optimizeImage,
  getFileInfo,
  formatFileSize,
  getFileType,
  cleanupOldFiles
};