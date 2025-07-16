import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiVideo, FiLink, FiSettings, FiSave, FiLogOut, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useProductStore from '../store/useProductStore';
import useAuthStore from '../store/useAuthStore';
import Loader from '../components/Loader';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { products, loading, fetchProducts } = useProductStore();
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [orderLink, setOrderLink] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [isAuthenticated, navigate, fetchProducts]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleVideoUpdate = (productId) => {
    if (videoUrl.trim()) {
      // Ici vous pourriez appeler une API pour sauvegarder
      toast.success('Vidéo mise à jour avec succès');
      setVideoUrl('');
      setSelectedProduct(null);
    }
  };

  const handleOrderLinkUpdate = (productId) => {
    if (orderLink.trim()) {
      // Ici vous pourriez appeler une API pour sauvegarder
      toast.success('Lien de commande mis à jour avec succès');
      setOrderLink('');
      setSelectedProduct(null);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-custom text-5xl md:text-6xl font-bold text-white mb-2">
              Panel Administration
            </h1>
            <p className="text-xl text-gray-300">
              Bienvenue, {user?.name}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FiLogOut className="mr-2" />
            Déconnexion
          </button>
        </div>

        {/* Statistiques */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-2">Total Produits</h3>
            <p className="text-3xl font-bold text-white">{products.length}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-2">Avec Vidéos</h3>
            <p className="text-3xl font-bold text-white">
              {products.filter(p => p.video).length}
            </p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-2">Avec Liens</h3>
            <p className="text-3xl font-bold text-white">
              {products.filter(p => p.orderLink).length}
            </p>
          </div>
        </motion.div>

        {/* Gestion des produits */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Gestion des Produits</h2>
            <button className="flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
              <FiPlus className="mr-2" />
              Ajouter un produit
            </button>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-300">Aucun produit disponible</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Liste des produits */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Produits ({products.length})</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className={`bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 cursor-pointer hover:bg-gray-700/50 transition-colors ${
                        selectedProduct?._id === product._id ? 'border-white' : ''
                      }`}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">{product.name}</h4>
                          <p className="text-gray-400 text-sm">{product.price}€</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-400 hover:text-white">
                            <FiEdit size={16} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-400">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 space-x-4 text-xs">
                        <span className={`${product.video ? 'text-green-400' : 'text-red-400'}`}>
                          {product.video ? '📹 Vidéo' : '❌ Pas de vidéo'}
                        </span>
                        <span className={`${product.orderLink ? 'text-green-400' : 'text-red-400'}`}>
                          {product.orderLink ? '🔗 Lien' : '❌ Pas de lien'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuration du produit sélectionné */}
              {selectedProduct ? (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Configuration: {selectedProduct.name}
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Vidéo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FiVideo className="inline mr-2" />
                        URL de la vidéo
                      </label>
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                        placeholder="https://example.com/video.mp4"
                      />
                      <button
                        onClick={() => handleVideoUpdate(selectedProduct._id)}
                        className="mt-2 px-4 py-2 bg-white text-black text-sm rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <FiSave className="inline mr-2" />
                        Sauvegarder la vidéo
                      </button>
                    </div>

                    {/* Lien de commande */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FiLink className="inline mr-2" />
                        Lien de commande
                      </label>
                      <input
                        type="url"
                        value={orderLink}
                        onChange={(e) => setOrderLink(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                        placeholder="https://example.com/order/product"
                      />
                      <button
                        onClick={() => handleOrderLinkUpdate(selectedProduct._id)}
                        className="mt-2 px-4 py-2 bg-white text-black text-sm rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <FiSave className="inline mr-2" />
                        Sauvegarder le lien
                      </button>
                    </div>

                    {/* Informations actuelles */}
                    <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Informations actuelles</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Vidéo actuelle:</span>
                          <span className="text-white ml-2">
                            {selectedProduct.video || 'Aucune vidéo'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Lien de commande:</span>
                          <span className="text-white ml-2">
                            {selectedProduct.orderLink || 'Aucun lien'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-400">Sélectionnez un produit pour le configurer</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminPage;