import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useProductStore from '../store/useProductStore';
import Loader from '../components/Loader';

const ProductPage = () => {
  const { id } = useParams();
  const { selectedProduct, loading, fetchProductById } = useProductStore();

  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader size="large" />
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen px-6 py-8 bg-black">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className="font-custom text-4xl font-bold text-white mb-4">
            Produit non trouvé
          </h1>
          <p className="text-gray-300 mb-4">
            Le produit que vous recherchez n'existe pas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image du produit */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-square bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-2xl overflow-hidden"
          >
            {selectedProduct.image ? (
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-gray-400 text-6xl">📦</div>
              </div>
            )}
          </motion.div>

          {/* Détails du produit */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h1 className="font-custom text-4xl font-bold text-white mb-4">
              {selectedProduct.name}
            </h1>
            
            <div className="text-3xl font-bold text-white mb-6">
              {selectedProduct.price}€
            </div>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {selectedProduct.description}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-400">
                <span className="text-sm">Catégorie:</span>
                <span className="ml-2 text-white capitalize">{selectedProduct.category}</span>
              </div>
              
              <div className="flex items-center text-gray-400">
                <span className="text-sm">Référence:</span>
                <span className="ml-2 text-white">{selectedProduct._id}</span>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <button className="w-full py-3 px-6 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200">
                Ajouter au panier
              </button>
              
              <button className="w-full py-3 px-6 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-200">
                Voir les détails
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPage;