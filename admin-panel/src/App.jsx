import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { authService } from './services/api';
import { config } from './config.js';
import Layout from './components/Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

// Composant pour vérifier l'authentification
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // Mode développement - contourne l'authentification
  if (config.bypassAuth) {
    return children;
  }
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  // Vérifier si l'utilisateur est connecté
  const { data: user, isLoading } = useQuery(
    'user',
    authService.getProfile,
    {
      enabled: !!localStorage.getItem('token') && !config.bypassAuth,
      retry: false,
      onError: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  );

  // Utiliser les données mockées en mode développement
  const currentUser = config.bypassAuth ? config.mockUser : user;

  if (isLoading && !config.bypassAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout user={currentUser}>
            <DashboardPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/products" element={
        <ProtectedRoute>
          <Layout user={currentUser}>
            <ProductsPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/orders" element={
        <ProtectedRoute>
          <Layout user={currentUser}>
            <OrdersPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout user={currentUser}>
            <ProfilePage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;