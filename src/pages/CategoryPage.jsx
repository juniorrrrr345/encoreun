import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryPage = () => {
  const { category } = useParams();

  return (
    <div className="min-h-screen px-6 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center py-16">
          <h1 className="font-custom text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 capitalize">
            {category}
          </h1>
          <p className="text-gray-300 mb-4">
            Catégorie: {category}
          </p>
          <p className="text-gray-400">
            Les produits de cette catégorie seront affichés ici prochainement.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryPage;