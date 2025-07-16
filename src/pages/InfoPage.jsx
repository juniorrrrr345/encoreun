import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiHeart, FiStar, FiTruck } from 'react-icons/fi';

const InfoPage = () => {
  const features = [
    {
      icon: FiHeart,
      title: 'Avec Amour',
      description: 'Chaque produit est sélectionné avec soin et passion'
    },
    {
      icon: FiStar,
      title: 'Qualité Premium',
      description: 'Des produits de haute qualité pour votre satisfaction'
    },
    {
      icon: FiTruck,
      title: 'Livraison Rapide',
      description: 'Expédition rapide et sécurisée vers chez vous'
    },
    {
      icon: FiShoppingBag,
      title: 'Expérience Unique',
      description: 'Une boutique pensée pour votre plaisir d\'achat'
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
              to="/product"
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

      {/* Features Section */}
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
            Pourquoi Choisir Notre Boutique ?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="py-16 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 backdrop-blur-sm border border-pink-500/30 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Prêt à Commencer ?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Rejoignez des milliers de clients satisfaits et découvrez 
              notre sélection unique de produits
            </p>
            <Link
              to="/product"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FiShoppingBag className="mr-2" />
              Commencer mes Achats
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default InfoPage;