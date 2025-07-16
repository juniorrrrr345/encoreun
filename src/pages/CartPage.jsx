import React from 'react';
import { motion } from 'framer-motion';
import useCart from '../hooks/useCart';

const CartPage = () => {
  const { cartItems, getTotalPrice, getTotalItems } = useCart();

  return (
    <div className="min-h-screen px-6 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-custom text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-8 text-center">
          Mon Panier
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-300 text-lg mb-4">
              Votre panier est vide
            </p>
            <p className="text-gray-400">
              Ajoutez des produits pour commencer vos achats !
            </p>
          </div>
        ) : (
          <div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">
                  Articles ({getTotalItems()})
                </h2>
                <div className="text-2xl font-bold text-pink-400">
                  Total: {getTotalPrice().toFixed(2)}€
                </div>
              </div>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-2xl">📦</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-gray-400 text-sm">Quantité: {item.quantity}</p>
                    </div>
                    <div className="text-pink-400 font-semibold">
                      {(item.price * item.quantity).toFixed(2)}€
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartPage;