import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiHeart, FiStar, FiTruck, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';

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

  const socialLinks = [
    { name: 'Instagram', icon: FiInstagram, url: '#', color: 'hover:text-gray-300' },
    { name: 'Facebook', icon: FiFacebook, url: '#', color: 'hover:text-gray-300' },
    { name: 'Twitter', icon: FiTwitter, url: '#', color: 'hover:text-gray-300' },
    { name: 'YouTube', icon: FiYoutube, url: '#', color: 'hover:text-gray-300' },
  ];

  return (
    <div className="min-h-screen bg-black">
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
            className="font-custom text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white"
          >
            Avec Amour
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
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
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Découvrir la Boutique
            </Link>
            
            <Link
              to="/category"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Voir les Catégories
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gray-500/10 rounded-full blur-xl"></div>
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
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
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

      {/* Social Media Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="py-16 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="bg-gray-900/20 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Suivez-nous
            </h2>
            <p className="text-xl text-gray-300 mb-8">
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
                    transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                    className={`w-12 h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-gray-700 hover:border-gray-600 ${social.color}`}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
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
            className="bg-gray-900/20 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Prêt à Commencer ?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Rejoignez des milliers de clients satisfaits et découvrez 
              notre sélection unique de produits
            </p>
            <Link
              to="/product"
              className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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