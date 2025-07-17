import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useProductStore from '../store/useProductStore';
import Loader from '../components/Loader';

const HomePage = () => {
  const { categories, loading, fetchCategories } = useProductStore();
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 2;

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Catégories par défaut si l'API ne répond pas
  const defaultCategories = [
    { 
      name: 'Vêtements',
      slug: 'vetements',
      description: 'Mode et accessoires tendance',
      image: '/images/categories/clothing.jpg',
      color: 'pink'
    },
    { 
      name: 'Beauté',
      slug: 'beaute',
      description: 'Produits de beauté et cosmétiques',
      image: '/images/categories/beauty.jpg',
      color: 'purple'
    },
    { 
      name: 'Maison',
      slug: 'maison',
      description: 'Décoration et accessoires maison',
      image: '/images/categories/home.jpg',
      color: 'emerald'
    },
    { 
      name: 'Bijoux',
      slug: 'bijoux',
      description: 'Bijoux et accessoires précieux',
      image: '/images/categories/jewelry.jpg',
      color: 'amber'
    },
    { 
      name: 'Tech',
      slug: 'tech',
      description: 'Gadgets et accessoires tech',
      image: '/images/categories/tech.jpg',
      color: 'blue'
    },
    { 
      name: 'Sport',
      slug: 'sport',
      description: 'Équipements et vêtements de sport',
      image: '/images/categories/sport.jpg',
      color: 'green'
    }
  ];

  const categoriesToShow = categories.length > 0 ? categories : defaultCategories;
  
  // Calcul de la pagination
  const totalPages = Math.ceil(categoriesToShow.length / categoriesPerPage);
  const startIndex = (currentPage - 1) * categoriesPerPage;
  const endIndex = startIndex + categoriesPerPage;
  const currentCategories = categoriesToShow.slice(startIndex, endIndex);

  const getColorClasses = (color) => {
    const colorMap = {
      pink: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
      purple: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
      emerald: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
      amber: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
      blue: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
      green: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
    };
    return colorMap[color] || colorMap.pink;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="font-custom text-5xl md:text-6xl font-bold text-white mb-4">
          Catégories
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
          Explorez notre collection organisée par catégories pour trouver exactement ce que vous cherchez
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {currentCategories.map((category, index) => (
            <motion.div
              key={category.slug || category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/category/${category.slug || category.name.toLowerCase()}`}
                className="group block"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                  {/* Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <div 
                      className={`
                        absolute inset-0 bg-gradient-to-br opacity-90
                        ${getColorClasses(category.color)}
                      `}
                    />
                    {category.image && (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Category Icon */}
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <FiGrid className="text-white text-xl" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                                          <h3 className="text-xl font-semibold text-white group-hover:text-gray-300 transition-colors">
                      {category.name}
                    </h3>
                    <FiArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* Product count if available */}
                    {category.productCount && (
                      <div className="mt-3 text-xs text-gray-400">
                        {category.productCount} produit{category.productCount > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-white rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft size={20} />
              Précédent
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    currentPage === index + 1
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-white rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Suivant
              <FiChevronRight size={20} />
            </button>
          </div>
        )}
      </div>


    </div>
  );
};

export default HomePage;