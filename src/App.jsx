import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

import Loader from './components/Loader';
import Navigation from './components/Navigation';

// Import des pages avec lazy loading
const HomePage = React.lazy(() => import('./pages/HomePage'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));

const InfoPage = React.lazy(() => import('./pages/InfoPage'));



// Composant pour l'arrière-plan
const BackgroundComponent = () => (
  <div className="fixed inset-0 overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: 'url("/background.PNG")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        filter: 'grayscale(100%) contrast(120%) brightness(0.8)'
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
  </div>
);

function App() {
  const [isInitialized, setIsInitialized] = useState(true);
  const [error, setError] = useState(null);
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });



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
                <Route path="/" element={<InfoPage />} />
                <Route path="/category" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />

                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
        </Suspense>

        <Navigation 
          safeAreaBottom={safeAreaInsets.bottom}
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