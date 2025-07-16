import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiArrowRight, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';
import useProductStore from '../store/useProductStore';
import Loader from '../components/Loader';

const HomePage = () => {
  const { categories, loading, fetchCategories } = useProductStore();

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
      color: 'gray'
    },
    { 
      name: 'Beauté',
      slug: 'beaute',
      description: 'Produits de beauté et cosmétiques',
      image: '/images/categories/beauty.jpg',
      color: 'gray'
    },
    { 
      name: 'Maison',
      slug: 'maison',
      description: 'Décoration et accessoires maison',
      image: '/images/categories/home.jpg',
      color: 'gray'
    },
    { 
      name: 'Bijoux',
      slug: 'bijoux',
      description: 'Bijoux et accessoires précieux',
      image: '/images/categories/jewelry.jpg',
      color: 'gray'
    },
    { 
      name: 'Tech',
      slug: 'tech',
      description: 'Gadgets et accessoires tech',
      image: '/images/categories/tech.jpg',
      color: 'gray'
    },
    { 
      name: 'Sport',
      slug: 'sport',
      description: 'Équipements et vêtements de sport',
      image: '/images/categories/sport.jpg',
      color: 'gray'
    }
  ];

  const categoriesToShow = categories.length > 0 ? categories : defaultCategories;

  const getColorClasses = (color) => {
    const colorMap = {
      gray: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
    };
    return colorMap[color] || colorMap.gray;
  };

  const socialLinks = [
    { name: 'Instagram', icon: FiInstagram, url: '#', color: 'hover:text-gray-300' },
    { name: 'Facebook', icon: FiFacebook, url: '#', color: 'hover:text-gray-300' },
    { name: 'Twitter', icon: FiTwitter, url: '#', color: 'hover:text-gray-300' },
    { name: 'YouTube', icon: FiYoutube, url: '#', color: 'hover:text-gray-300' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-black">
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
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explorez notre collection organisée par catégories pour trouver exactement ce que vous cherchez
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesToShow.map((category, index) => (
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
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
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
      </div>

      {/* Social Media Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="max-w-2xl mx-auto bg-gray-900/20 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Suivez-nous
          </h2>
          <p className="text-gray-300 mb-6">
            Restez connecté avec nous sur les réseaux sociaux pour découvrir nos dernières nouveautés
          </p>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className={`w-12 h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-gray-700 hover:border-gray-600 ${social.color}`}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <div className="max-w-2xl mx-auto bg-gray-900/20 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-gray-300 mb-6">
            Découvrez tous nos produits ou contactez-nous pour des recommandations personnalisées
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/product"
              className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Voir tous les produits
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;