import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Tableau de bord', href: '/', icon: '📊' },
    { name: 'Produits', href: '/products', icon: '📦' },
    { name: 'Catégories', href: '/categories', icon: '🏷️' },
    { name: 'Informations', href: '/info', icon: 'ℹ️' },
    { name: 'Commandes', href: '/orders', icon: '🛒' },
    { name: 'Profil', href: '/profile', icon: '👤' },
  ];

  const handleLogout = () => {
    // Désactivé - pas de déconnexion nécessaire
    console.log('Déconnexion désactivée');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-xl border-r border-gray-700 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-colors"
          >
            <span className="sr-only">Fermer le menu</span>
            ✕
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-item ${
                    isActive ? 'nav-item-active' : 'nav-item-inactive'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium shadow-lg">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">
                {user?.name || 'Utilisateur'}
              </p>
              <p className="text-xs text-gray-400">
                {user?.email || 'admin@example.com'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 p-1 text-gray-400 hover:text-gray-200 transition-colors"
              title="Déconnexion"
            >
              🚪
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex items-center h-16 bg-gray-800 shadow-lg border-b border-gray-700">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <span className="sr-only">Ouvrir le menu</span>
            ☰
          </button>
          <div className="flex-1 px-4">
            <h2 className="text-lg font-semibold text-white">
              {navigation.find(item => item.href === location.pathname)?.name || 'Admin Panel'}
            </h2>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 bg-gray-900 min-h-screen">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-75 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;