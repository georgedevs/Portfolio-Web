import React from 'react';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ModernFooter = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${themeConfig[theme].primary} transition-colors duration-500 relative py-8 border-t border-white/10`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 relative"
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(59,130,246,0.1), transparent)',
              'linear-gradient(225deg, rgba(236,72,153,0.1), transparent)',
              'linear-gradient(45deg, rgba(59,130,246,0.1), transparent)'
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
       
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`text-lg font-bold ${themeConfig[theme].text}`}
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Ukoh-Godwin George
            </span>
          </motion.div>

          {/* Copyright */}
          <p className={`${themeConfig[theme].text} opacity-80 text-sm text-center`}>
            © {currentYear} • Built with passion and code
          </p>

        
        </div>
      </motion.div>
    </footer>
  );
};

export default ModernFooter;