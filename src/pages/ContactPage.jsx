import React from 'react';
import { motion } from 'framer-motion';

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

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            À propos de nous
          </h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>
              Bienvenue dans notre boutique en ligne "Avec Amour". Nous sommes passionnés par la sélection 
              de produits uniques et de qualité pour vous offrir une expérience d'achat exceptionnelle.
            </p>
            <p>
              Notre équipe travaille avec soin pour vous proposer une collection variée qui répond 
              à tous vos besoins. Chaque produit est choisi avec attention pour garantir votre satisfaction.
            </p>
            <p>
              Nous croyons en l'importance de la qualité et du service client. C'est pourquoi nous 
              nous efforçons de vous offrir une expérience d'achat simple, rapide et agréable.
            </p>
            <p>
              Merci de votre confiance et de votre soutien. Nous sommes ravis de vous accompagner 
              dans vos achats et de vous faire découvrir nos nouveautés régulièrement.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;