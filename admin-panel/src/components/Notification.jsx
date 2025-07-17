import React from 'react';

const Notification = ({ type = 'info', title, message, onClose, duration = 4000 }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-900',
          border: 'border-green-700',
          text: 'text-green-200',
          icon: '✅'
        };
      case 'error':
        return {
          bg: 'bg-red-900',
          border: 'border-red-700',
          text: 'text-red-200',
          icon: '❌'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-900',
          border: 'border-yellow-700',
          text: 'text-yellow-200',
          icon: '⚠️'
        };
      default:
        return {
          bg: 'bg-blue-900',
          border: 'border-blue-700',
          text: 'text-blue-200',
          icon: 'ℹ️'
        };
    }
  };

  const styles = getTypeStyles();

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${styles.bg} ${styles.border} border rounded-lg shadow-xl p-4 animate-slide-up`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-lg">{styles.icon}</span>
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${styles.text}`}>
              {title}
            </h3>
          )}
          {message && (
            <p className={`mt-1 text-sm ${styles.text}`}>
              {message}
            </p>
          )}
        </div>
        {onClose && (
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <span className="sr-only">Fermer</span>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;