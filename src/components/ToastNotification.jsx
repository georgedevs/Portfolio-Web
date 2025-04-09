import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

//toast notification system
export const useToast = () => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = ({ message, type = 'success', duration = 3000 }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
};

// Toast container component
export const ToastContainer = ({ toasts, removeToast }) => {
  const { theme } = useTheme();

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getToastClasses = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-4 border-green-500 bg-green-500/10';
      case 'error':
        return 'border-l-4 border-red-500 bg-red-500/10';
      case 'warning':
        return 'border-l-4 border-yellow-500 bg-yellow-500/10';
      case 'info':
      default:
        return 'border-l-4 border-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`${themeConfig[theme].accent} ${getToastClasses(toast.type)} p-4 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-3`}
          >
            {getToastIcon(toast.type)}
            <p className={`${themeConfig[theme].text} text-sm flex-1`}>{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-full hover:bg-gray-500/20"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default { useToast, ToastContainer };