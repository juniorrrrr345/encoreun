import React from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiUsers, FiShoppingCart, FiSettings } from 'react-icons/fi';
import useAuthStore from '../store/useAuthStore';

const AdminPage = () => {
  const { user, logout } = useAuthStore();

  const adminStats = [
    { icon: FiPackage, label: 'Produits', value: '0', color: 'pink' },
    { icon: FiUsers, label: 'Utilisateurs', value: '0', color: 'purple' },
    { icon: FiShoppingCart, label: 'Commandes', value: '0', color: 'emerald' },
    { icon: FiSettings, label: 'Paramètres', value: '-', color: 'amber' },
  ];

  return (
    <div className="min-h-screen px-6 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-custom text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Administration
            </h1>
            <p className="text-gray-300">
              Bienvenue, {user?.name} - Panel d'administration
            </p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Déconnexion
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {adminStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="text-2xl text-pink-400" />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <h3 className="text-gray-300 font-medium">{stat.label}</h3>
            </motion.div>
          ))}
        </div>

        {/* Admin Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-4 bg-pink-500/20 border border-pink-500/30 rounded-lg text-pink-300 hover:bg-pink-500/30 transition-colors">
              Ajouter un produit
            </button>
            <button className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-colors">
              Gérer les utilisateurs
            </button>
            <button className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 hover:bg-emerald-500/30 transition-colors">
              Voir les commandes
            </button>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-6">
            <p className="text-gray-300">
              Interface d'administration en développement. Les fonctionnalités complètes seront ajoutées prochainement.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminPage;