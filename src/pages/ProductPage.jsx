import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen px-6 py-8 bg-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center py-16">
          <h1 className="font-custom text-4xl font-bold text-white mb-4">
            Détail du Produit
          </h1>
          <p className="text-gray-300 mb-4">
            Produit ID: {id}
          </p>
          <p className="text-gray-400">
            Cette page sera développée prochainement avec tous les détails du produit.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPage;