import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const ContactPage = () => {
  return (
    <div className="min-h-screen px-6 py-8 bg-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="font-custom text-5xl md:text-6xl font-bold text-white mb-4">
            Contact
          </h1>
          <p className="text-xl text-gray-300">
            Nous sommes là pour vous aider !
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center"
          >
            <FiMail className="text-3xl text-white mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <p className="text-gray-300">contact@avecamour.com</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center"
          >
            <FiPhone className="text-3xl text-white mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Téléphone</h3>
            <p className="text-gray-300">+33 1 23 45 67 89</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center"
          >
            <FiMapPin className="text-3xl text-white mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Adresse</h3>
            <p className="text-gray-300">Paris, France</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Envoyez-nous un message
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sujet
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                placeholder="Sujet de votre message"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white resize-vertical"
                placeholder="Votre message..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-6 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
            >
              Envoyer le message
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;