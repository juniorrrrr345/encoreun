import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useProductStore from '../store/useProductStore';
import Loader from '../components/Loader';

const CategoryPage = () => {
  const { category } = useParams();
  const { products, loading, fetchProductsByCategory } = useProductStore();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [category, fetchProductsByCategory]);

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
        <div className="text-center mb-12">
          <h1 className="font-custom text-4xl font-bold text-white mb-4 capitalize">
            {category}
          </h1>
          <p className="text-gray-300 mb-4">
            Découvrez nos produits dans la catégorie {category}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-300 text-lg mb-6">
              Aucun produit disponible dans cette catégorie pour le moment.
            </p>
            <p className="text-gray-400">
              Revenez bientôt pour découvrir nos nouveautés !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-600/20 to-gray-700/20 flex items-center justify-center">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-4xl">📦</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">
                      {product.price}€
                    </span>
                    <Link
                      to={`/product/${product._id}`}
                      className="px-3 py-1 bg-white text-black text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Voir
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CategoryPage;