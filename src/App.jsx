import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

import Loader from './components/Loader';
import Navigation from './components/Navigation';
import useAuthStore from './store/useAuthStore';

// Import des pages avec lazy loading
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AllProductsPage = React.lazy(() => import('./pages/AllProductsPage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const InfoPage = React.lazy(() => import('./pages/InfoPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));

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
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
  </div>
);

// Composant de protection pour les routes admin
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });

  // Initialisation de l'application
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsInitialized(true);
      } catch (error) {
        setError('Échec de l\'initialisation de l\'application. Veuillez réessayer.');
      }
    };

    initializeApp();
  }, []);

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
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader size="large" />
      </div>
    );
  }

  // Affichage d'erreur
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full text-white relative overflow-hidden bg-black">
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
                <Route path="/product" element={<AllProductsPage />} />
                <Route path="/" element={<InfoPage />} />
                <Route path="/category" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  } 
                />
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
            background: '#000000',
            color: '#ffffff',
            border: '1px solid #333333'
          }
        }}
      />
    </div>
  );
}

export default App;