import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import toast from 'react-hot-toast';

const AddProductPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [],
    video: null
  });
  
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Vêtements',
    'Beauté',
    'Maison',
    'Bijoux',
    'Tech',
    'Sport'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      const newImages = imageFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setFormData(prev => ({
        ...prev,
        video: {
          file,
          preview: URL.createObjectURL(file)
        }
      }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const removeVideo = () => {
    setFormData(prev => ({
      ...prev,
      video: null
    }));
  };

  const generateDescription = async () => {
    if (!formData.name || !formData.category) {
      toast.error('Veuillez d\'abord saisir le nom et la catégorie du produit');
      return;
    }

    setIsGeneratingDescription(true);
    
    try {
      // Simulation de génération de description basée sur le nom et la catégorie
      const descriptions = {
        'Vêtements': 'Produit vestimentaire de haute qualité, confortable et durable. Design moderne et élégant adapté à tous les styles.',
        'Beauté': 'Produit de beauté naturel et efficace, formulé avec des ingrédients de qualité pour prendre soin de votre peau.',
        'Maison': 'Élément de décoration élégant et fonctionnel pour embellir votre intérieur avec style et raffinement.',
        'Bijoux': 'Bijou précieux et raffiné, créé avec des matériaux nobles pour sublimer votre élégance naturelle.',
        'Tech': 'Appareil technologique innovant et performant, conçu pour améliorer votre expérience quotidienne.',
        'Sport': 'Équipement sportif de qualité professionnelle, optimisé pour vos performances et votre confort.'
      };

      const baseDescription = descriptions[formData.category] || 'Produit exceptionnel de haute qualité avec des finitions soignées.';
      const generatedDescription = `${formData.name} - ${baseDescription}`;

      setFormData(prev => ({
        ...prev,
        description: generatedDescription
      }));

      toast.success('Description générée avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la génération de la description');
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);

    try {
      // Créer un FormData pour l'upload des fichiers
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      submitData.append('category', formData.category);
      submitData.append('stock', formData.stock || '0');

      // Ajouter les images
      formData.images.forEach((image, index) => {
        submitData.append(`images`, image.file);
      });

      // Ajouter la vidéo si présente
      if (formData.video) {
        submitData.append('video', formData.video.file);
      }

      await productService.create(submitData);
      toast.success('Produit ajouté avec succès !');
      navigate('/products');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
      toast.error('Erreur lors de l\'ajout du produit');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Ajouter un produit</h1>
        <p className="text-gray-600">Créez un nouveau produit pour votre boutique</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de base */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de base</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du produit *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: T-shirt Premium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix (€) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="29.99"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="50"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <button
              type="button"
              onClick={generateDescription}
              disabled={isGeneratingDescription || !formData.name || !formData.category}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingDescription ? 'Génération...' : 'Générer automatiquement'}
            </button>
          </div>
          
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description du produit..."
          />
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Images du produit</h3>
          
          <div className="mb-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              📷 Ajouter des images
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.preview}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vidéo */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Vidéo du produit</h3>
          
          <div className="mb-4">
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              🎥 Ajouter une vidéo
            </button>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
          </div>

          {formData.video && (
            <div className="relative">
              <video
                src={formData.video.preview}
                controls
                className="w-full max-w-md rounded-lg"
              />
              <button
                type="button"
                onClick={removeVideo}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Ajout en cours...' : 'Ajouter le produit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;