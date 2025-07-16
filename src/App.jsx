import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

import useAuthStore from './store/useAuthStore';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import useCart from './hooks/useCart';

// Import des pages avec lazy loading
const HomePage = React.lazy(() => import('./pages/HomePage'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));

const InfoPage = React.lazy(() => import('./pages/InfoPage'));

// Hook pour gérer le nombre d'articles dans le panier
const useCartItemCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = (event) => {
      if (event && event.detail !== undefined) {
        setCount(event.detail);
      } else {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCount(cart.length);
      }
    };

    updateCount();
    window.addEventListener('cartUpdated', updateCount);
    return () => window.removeEventListener('cartUpdated', updateCount);
  }, []);

  return count;
};

// Composant pour l'arrière-plan
const BackgroundComponent = () => (
  <div className="fixed inset-0 overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: 'url("/background.PNG")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent" />
  </div>
);

function App() {
  const { user, checkAuth, checkingAuth } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });

  const cartItemCount = useCartItemCount();

  // Initialisation de l'application
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await checkAuth();
        setIsInitialized(true);
      } catch (error) {
        setError('Échec de l\'initialisation de l\'application. Veuillez réessayer.');
      }
    };

    initializeApp();
  }, [checkAuth]);

  // Gestion des Safe Areas (pour les appareils mobiles)
  useEffect(() => {
    const updateSafeArea = () => {
      if (window.SafeArea) {
        setSafeAreaInsets({
          top: window.SafeArea.top,
          bottom: window.SafeArea.bottom,
          left: window.SafeArea.left,
          right: window.SafeArea.right
        });
      }
    };

    updateSafeArea();
    window.addEventListener('resize', updateSafeArea);
    return () => window.removeEventListener('resize', updateSafeArea);
  }, []);

  // Affichage du loader pendant l'initialisation
  if (checkingAuth || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  // Affichage d'erreur
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full text-white relative overflow-hidden">
      <BackgroundComponent />
      
      <div 
        className="relative z-10 flex flex-col min-h-screen"
        style={{
          paddingTop: `${safeAreaInsets.top}px`,
          paddingBottom: `${safeAreaInsets.bottom}px`,
          paddingLeft: `${safeAreaInsets.left}px`,
          paddingRight: `${safeAreaInsets.right}px`
        }}
      >
        <Suspense fallback={<Loader />}>
          <main className="flex-grow pb-16">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/" element={<InfoPage />} />
                <Route path="/category" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />

                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
        </Suspense>

        <Navigation 
          safeAreaBottom={safeAreaInsets.bottom}
          cartItemCount={cartItemCount}
        />
      </div>

      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151'
          }
        }}
      />
    </div>
  );
}

export default App;