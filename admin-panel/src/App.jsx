import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import AddProductPage from './pages/AddProductPage.jsx';

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
      
      <Route path="/add-product" element={
        <Layout user={defaultUser}>
          <AddProductPage />
        </Layout>
      } />
      

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;