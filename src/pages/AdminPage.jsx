import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiVideo, FiLink, FiSettings, FiSave } from 'react-icons/fi';
import useProductStore from '../store/useProductStore';
import useAdminStore from '../store/useAdminStore';

const AdminPage = () => {
  const { products, fetchProducts } = useProductStore();
  const { externalLinks, updateExternalLinks, updateProductVideo, updateProductOrderLink } = useAdminStore();
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [orderLink, setOrderLink] = useState('');

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleVideoUpdate = (productId) => {
    if (videoUrl.trim()) {
      updateProductVideo(productId, videoUrl);
      setVideoUrl('');
      setSelectedProduct(null);
    }
  };

  const handleOrderLinkUpdate = (productId) => {
    if (orderLink.trim()) {
      updateProductOrderLink(productId, orderLink);
      setOrderLink('');
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="font-custom text-5xl md:text-6xl font-bold text-white mb-4">
            Panel Administration
          </h1>
          <p className="text-xl text-gray-300">
            Gérez vos produits, vidéos et liens de commande
          </p>
        </div>

        {/* Configuration des liens externes */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <FiSettings className="text-white text-2xl mr-3" />
            <h2 className="text-2xl font-bold text-white">Configuration Générale</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Lien de commande par défaut
              </label>
              <input
                type="url"
                value={externalLinks.orderLink}
                onChange={(e) => updateExternalLinks({ orderLink: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                placeholder="https://example.com/order"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Lien de contact
              </label>
              <input
                type="url"
                value={externalLinks.contactLink}
                onChange={(e) => updateExternalLinks({ contactLink: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                placeholder="https://example.com/contact"
              />
            </div>
          </div>
        </motion.div>

        {/* Gestion des produits */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Gestion des Produits</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Liste des produits */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Produits</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 cursor-pointer hover:bg-gray-700/50 transition-colors"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <h4 className="text-white font-medium">{product.name}</h4>
                    <p className="text-gray-400 text-sm">{product.price}€</p>
                    <div className="flex items-center mt-2 space-x-4 text-xs">
                      <span className="text-gray-500">
                        {product.video ? '📹 Vidéo' : '❌ Pas de vidéo'}
                      </span>
                      <span className="text-gray-500">
                        {product.orderLink ? '🔗 Lien' : '❌ Pas de lien'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration du produit sélectionné */}
            {selectedProduct && (
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
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminPage;