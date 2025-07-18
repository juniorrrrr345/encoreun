import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiHeart, FiStar, FiTruck } from 'react-icons/fi';

const InfoPage = () => {
  // Produits de démonstration pour la page d'accueil
  const featuredProducts = [
    {
      _id: '1',
      name: 'Produit Premium Ultra',
      description: 'Un produit exceptionnel de haute qualité avec des finitions soignées',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 124
    },
    {
      _id: '2',
      name: 'Collection Exclusive',
      description: 'Édition limitée avec des matériaux nobles et design unique',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 89
    },
    {
      _id: '3',
      name: 'Design Moderne',
      description: 'Style contemporain et élégant pour votre intérieur',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 156
    },
    {
      _id: '4',
      name: 'Édition Spéciale',
      description: 'Produit unique avec finitions soignées et garantie premium',
      price: 399.99,
      originalPrice: 499.99,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
      rating: 5.0,
      reviews: 67
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-custom text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent"
          >
            Avec Amour
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
          >
            Découvrez notre collection unique de produits 
            <br className="hidden md:block" />
            sélectionnés avec passion et amour
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/category"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Découvrir la Boutique
            </Link>
            
            <Link
              to="/category"
              className="px-8 py-4 border-2 border-pink-500 text-pink-300 font-semibold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Voir les Catégories
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
      </motion.section>

      {/* Featured Products Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          >
            Nos Produits Vedettes
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                {/* Product Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Link
                      to={`/product/${product._id}`}
                      className="px-4 py-2 bg-pink-500 text-white text-sm rounded-full hover:bg-pink-600 transition-colors"
                    >
                      Voir détails
                    </Link>
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
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i}
                          size={12}
                          className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-pink-400 font-bold">
                        {product.price}€
                      </span>
                      <span className="text-gray-400 text-sm line-through">
                        {product.originalPrice}€
                      </span>
                    </div>
                    <Link
                      to={`/product/${product._id}`}
                      className="px-3 py-1 bg-pink-500 text-white text-sm rounded-full hover:bg-pink-600 transition-colors"
                    >
                      Voir
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


    </div>
  );
};

export default InfoPage;