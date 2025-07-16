import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiArrowRight, FiChevronLeft, FiChevronRight, FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
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

  // Produits populaires pour la page d'accueil
  const popularProducts = [
    {
      _id: 'pop1',
      name: 'T-shirt Premium',
      description: 'T-shirt en coton bio de haute qualité',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 124
    },
    {
      _id: 'pop2',
      name: 'Crème Hydratante',
      description: 'Crème hydratante 24h',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 234
    },
    {
      _id: 'pop3',
      name: 'Lampe Design',
      description: 'Lampe moderne pour votre intérieur',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 78
    },
    {
      _id: 'pop4',
      name: 'Bague Diamant',
      description: 'Bague en or blanc avec diamant',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 67
    },
    {
      _id: 'pop5',
      name: 'Smartphone Pro',
      description: 'Smartphone dernière génération',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 234
    },
    {
      _id: 'pop6',
      name: 'Sneakers Running',
      description: 'Chaussures de course professionnelles',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 178
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      emerald: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      amber: 'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
      blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
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
        className="text-center mb-8"
      >
        <h1 className="font-custom text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent mb-3">
          Catégories
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Explorez notre collection organisée par catégories pour trouver exactement ce que vous cherchez
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                  {/* Image */}
                  <div className="aspect-[3/2] relative overflow-hidden">
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
                    <div className="absolute top-3 right-3">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <FiGrid className="text-white text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-pink-300 transition-colors">
                        {category.name}
                      </h3>
                      <FiArrowRight className="text-gray-400 group-hover:text-pink-400 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* Product count if available */}
                    {category.productCount && (
                      <div className="mt-2 text-xs text-gray-400">
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

      {/* Section Produits Populaires */}
      <div className="max-w-6xl mx-auto mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-custom text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Produits Populaires
          </h2>
          <p className="text-lg text-gray-200">
            Découvrez nos produits les plus appréciés
          </p>
        </motion.div>

        <div className="products-grid grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {popularProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              {/* Product Image */}
              <div className="aspect-square relative overflow-hidden">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-gray-400 text-4xl">📦</div>
                  </div>
                )}
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Link
                      to={`/product/${product._id}`}
                      className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
                    >
                      <FiShoppingCart size={18} />
                    </Link>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <FiHeart size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>
                )}
                
                {/* Price and Action */}
                <div className="flex justify-between items-center">
                  <span className="text-pink-400 font-bold text-lg">
                    {product.price}€
                  </span>
                  <Link
                    to={`/product/${product._id}`}
                    className="px-4 py-2 bg-pink-500 text-white text-sm rounded-full hover:bg-pink-600 transition-colors"
                  >
                    Voir détails
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;