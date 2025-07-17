import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import InfoPage from './pages/InfoPage.jsx';

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
          <ProductsPage />
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
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;