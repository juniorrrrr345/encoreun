// Configuration du thème sombre moderne
export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    gray: {
      750: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    success: {
      400: '#4ade80',
      600: '#16a34a',
      700: '#15803d',
    },
    warning: {
      400: '#fbbf24',
      600: '#d97706',
      700: '#b45309',
    },
    danger: {
      400: '#f87171',
      600: '#dc2626',
      700: '#b91c1c',
    },
    info: {
      400: '#60a5fa',
      600: '#2563eb',
      700: '#1d4ed8',
    }
  },
  
  // Animations
  animations: {
    fadeIn: 'fadeIn 0.3s ease-in-out',
    slideUp: 'slideUp 0.3s ease-out',
    bounceIn: 'bounceIn 0.5s ease-out',
  },
  
  // Classes utilitaires
  classes: {
    // Boutons
    btnPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl',
    btnSecondary: 'bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl',
    btnSuccess: 'bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl',
    btnDanger: 'bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl',
    
    // Champs de saisie
    inputField: 'w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200',
    
    // Cartes
    card: 'bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6',
    cardHover: 'bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 hover:bg-gray-750 hover:border-gray-600 transition-all duration-200',
    
    // Tableaux
    tableContainer: 'bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700',
    tableHeader: 'bg-gray-900 text-gray-300 text-xs font-medium uppercase tracking-wider',
    tableRow: 'bg-gray-800 hover:bg-gray-750 transition-colors duration-200',
    tableCell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-300',
    
    // Modals
    modalOverlay: 'fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50',
    modalContent: 'bg-gray-800 rounded-lg shadow-xl border border-gray-700 max-w-md mx-auto mt-20 p-6',
    
    // Navigation
    navItem: 'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
    navItemActive: 'bg-blue-900 text-blue-100 border-r-2 border-blue-500 shadow-lg',
    navItemInactive: 'text-gray-400 hover:bg-gray-800 hover:text-gray-200',
    
    // Statuts
    statusActive: 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-900 text-green-200',
    statusInactive: 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-900 text-red-200',
    
    // Loader
    loader: 'animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500',
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Espacements
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  
  // Typographie
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
};

// Fonction utilitaire pour obtenir une classe conditionnelle
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Fonction pour obtenir une couleur du thème
export const getThemeColor = (color, shade = 600) => {
  return theme.colors[color]?.[shade] || theme.colors.gray[600];
};

// Fonction pour obtenir une classe d'animation
export const getAnimation = (animation) => {
  return theme.animations[animation] || '';
};

export default theme;