import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import InfoPage from './pages/InfoPage.jsx';
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
    <>
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
        
        <Route path="/categories" element={
          <Layout user={defaultUser}>
            <CategoriesPage />
          </Layout>
        } />
        
        <Route path="/info" element={
          <Layout user={defaultUser}>
            <InfoPage />
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
      
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151'
          }
        }}
      />
    </>
  );
}

export default App;