import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiLinkedin } from 'react-icons/fi';

const ContactPage = () => {
  return (
    <div className="min-h-screen px-6 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="font-custom text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent mb-4">
            Informations
          </h1>
          <p className="text-xl text-gray-200">
            Découvrez notre univers et restez connecté
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-12"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              À propos de notre boutique
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Bienvenue dans notre boutique en ligne où nous proposons une sélection 
              soigneusement choisie de produits de qualité. Notre mission est de vous 
              offrir une expérience d'achat exceptionnelle avec des articles tendance 
              et des prix compétitifs.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Nous nous engageons à vous fournir un service client de qualité et 
              une satisfaction garantie. N'hésitez pas à nous contacter pour toute 
              question ou assistance.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Suivez-nous sur les réseaux sociaux
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-xl border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 group"
            >
              <FiInstagram className="text-3xl text-pink-400 group-hover:text-pink-300 mb-3" />
              <span className="text-white font-medium">Instagram</span>
              <span className="text-gray-400 text-sm">@avecamour</span>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group"
            >
              <FiFacebook className="text-3xl text-blue-400 group-hover:text-blue-300 mb-3" />
              <span className="text-white font-medium">Facebook</span>
              <span className="text-gray-400 text-sm">@avecamour</span>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-400/20 to-blue-500/20 rounded-xl border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 group"
            >
              <FiTwitter className="text-3xl text-blue-400 group-hover:text-blue-300 mb-3" />
              <span className="text-white font-medium">Twitter</span>
              <span className="text-gray-400 text-sm">@avecamour</span>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group"
            >
              <FiYoutube className="text-3xl text-red-400 group-hover:text-red-300 mb-3" />
              <span className="text-white font-medium">YouTube</span>
              <span className="text-gray-400 text-sm">Avec Amour</span>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-xl border border-blue-600/30 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <FiLinkedin className="text-3xl text-blue-400 group-hover:text-blue-300 mb-3" />
              <span className="text-white font-medium">LinkedIn</span>
              <span className="text-gray-400 text-sm">Avec Amour</span>
            </motion.a>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Restez informé de nos dernières nouveautés, promotions et actualités !
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;