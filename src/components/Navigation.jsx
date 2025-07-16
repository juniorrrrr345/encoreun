import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiShoppingBag, 
  FiShoppingCart, 
  FiUser, 
  FiPhone,
  FiPackage,
  FiGrid
} from 'react-icons/fi';
import useAuthStore from '../store/useAuthStore';

const Navigation = ({ safeAreaBottom, cartItemCount }) => {
  const location = useLocation();
  const { user } = useAuthStore();

  const navigationItems = [
    { path: '/', icon: FiHome, label: 'Accueil' },
    { path: '/category', icon: FiGrid, label: 'Catégories' },
    { path: '/product', icon: FiShoppingBag, label: 'Produits' },
    { path: '/cart', icon: FiShoppingCart, label: 'Panier', badge: cartItemCount },
    { path: '/contact', icon: FiPhone, label: 'Contact' },
  ];

  // Ajouter l'item admin si l'utilisateur est admin
  if (user?.role === 'admin') {
    navigationItems.push({
      path: '/secret-dashboard',
      icon: FiPackage,
      label: 'Admin'
    });
  }

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-t border-gray-700/50"
      style={{ paddingBottom: `${safeAreaBottom}px` }}
    >
      <div className="flex justify-around items-center py-2 px-4">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative flex flex-col items-center justify-center p-2 rounded-lg
                transition-all duration-200 min-w-0 flex-1
                ${isActive 
                  ? 'text-pink-400 bg-pink-500/20' 
                  : 'text-gray-400 hover:text-pink-300 hover:bg-white/10'
                }
              `}
            >
              <div className="relative">
                <Icon size={20} />
                {item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 truncate max-w-full">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Bouton utilisateur */}
        <Link
          to={user ? '/profile' : '/login'}
          className={`
            flex flex-col items-center justify-center p-2 rounded-lg
            transition-all duration-200 min-w-0 flex-1
            ${location.pathname === '/login' || location.pathname === '/profile'
              ? 'text-pink-400 bg-pink-500/20' 
              : 'text-gray-400 hover:text-pink-300 hover:bg-white/10'
            }
          `}
        >
          <FiUser size={20} />
          <span className="text-xs mt-1 truncate max-w-full">
            {user ? 'Profil' : 'Connexion'}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;