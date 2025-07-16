import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShoppingCart, FiHeart, FiStar, FiPlay, FiPause } from 'react-icons/fi';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Données de démonstration pour le produit
  const product = {
    _id: id,
    name: 'Produit Premium Ultra',
    description: 'Un produit exceptionnel de haute qualité avec des finitions soignées et des matériaux nobles. Ce produit unique combine design moderne et fonctionnalité pour offrir une expérience utilisateur incomparable.',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop'
    ],
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    features: [
      'Matériaux de haute qualité',
      'Design moderne et élégant',
      'Finition soignée',
      'Garantie 2 ans',
      'Livraison gratuite'
    ],
    specifications: {
      'Matériau': 'Acier inoxydable premium',
      'Dimensions': '15 x 10 x 5 cm',
      'Poids': '250g',
      'Couleur': 'Argenté mat',
      'Garantie': '2 ans'
    }
  };

  const handleVideoToggle = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const handleCommander = () => {
    // Lien externe vers une plateforme de commande
    window.open('https://www.amazon.fr', '_blank');
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header avec bouton retour */}
        <div className="mb-8">
          <Link 
            to="/category"
            className="inline-flex items-center text-pink-400 hover:text-pink-300 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Retour aux catégories
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Section Images/Vidéo */}
          <div className="space-y-6">
            {/* Image principale */}
            <div className="aspect-square bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
              {selectedImage === 'video' ? (
                <div className="relative w-full h-full">
                  <video
                    className="w-full h-full object-cover"
                    controls={isVideoPlaying}
                    autoPlay={isVideoPlaying}
                    muted
                    loop
                  >
                    <source src={product.video} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                  {!isVideoPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={handleVideoToggle}
                        className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
                      >
                        <FiPlay size={24} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Galerie d'images */}
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-pink-500' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              {/* Bouton vidéo */}
              <button
                onClick={() => setSelectedImage('video')}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center ${
                  selectedImage === 'video' 
                    ? 'border-pink-500 bg-pink-500/20' 
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                }`}
              >
                <FiPlay size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Section Informations */}
          <div className="space-y-6">
            {/* Titre et prix */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}
                    />
                  ))}
                </div>
                <span className="text-gray-300 text-sm">
                  {product.rating} ({product.reviews} avis)
                </span>
              </div>

              {/* Prix */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-pink-400">
                  {product.price}€
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {product.originalPrice}€
                </span>
                <span className="bg-pink-500 text-white text-sm px-2 py-1 rounded-full">
                  -25%
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Caractéristiques */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Caractéristiques</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Spécifications */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Spécifications</h3>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-700/50">
                    <span className="text-gray-400">{key}</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bouton d'action */}
            <div className="pt-6">
              <button
                onClick={handleCommander}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <FiShoppingCart className="inline mr-2" />
                Commander maintenant
              </button>
            </div>

            {/* Disponibilité */}
            <div className="text-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {product.inStock ? '✓ En stock' : '✗ Rupture de stock'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;