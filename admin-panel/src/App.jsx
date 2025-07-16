import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  // Utilisateur par défaut pour le panel admin
  const defaultUser = {
    id: 1,
    name: 'Administrateur',
    email: 'admin@example.com',
    role: 'admin'
  };

  return (
    <Routes>
      <Route path="/" element={
        <Layout user={defaultUser}>
          <DashboardPage />
        </Layout>
      } />
      
      <Route path="/products" element={
        <Layout user={defaultUser}>
          <ProductsPage />
        </Layout>
      } />
      
      <Route path="/orders" element={
        <Layout user={defaultUser}>
          <OrdersPage />
        </Layout>
      } />
      
      <Route path="/profile" element={
        <Layout user={defaultUser}>
          <ProfilePage />
        </Layout>
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;