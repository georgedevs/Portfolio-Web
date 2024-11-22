import React from 'react';
import { useTheme, themeConfig } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`${themeConfig[theme].primary} transition-colors duration-500 relative py-6`}>
      <div className="max-w-7xl mx-auto px-4">
        <p className={`${themeConfig[theme].text} opacity-80 text-center text-sm`}>
          © {new Date().getFullYear()} • Made by Ukoh-Godwin George
        </p>
      </div>
    </footer>
  );
};

export default Footer;