import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiShoppingBag, 
  FiPhone,
  FiGrid
} from 'react-icons/fi';

const Navigation = ({ safeAreaBottom }) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', icon: FiHome, label: 'Accueil' },
    { path: '/category', icon: FiGrid, label: 'Catégories' },
    { path: '/product', icon: FiShoppingBag, label: 'Produits' },
    { path: '/contact', icon: FiPhone, label: 'Contact' },
  ];

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
              </div>
              <span className="text-xs mt-1 truncate max-w-full">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;