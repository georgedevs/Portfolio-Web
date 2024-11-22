import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Menu } from '@headlessui/react';
import { Palette, ChevronDown, Menu as MenuIcon, X } from 'lucide-react';
import demo from '../assets/demo.png';

const ModernNavbar = () => {
  const { theme, toggleTheme, availableThemes } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const Logo = () => (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="relative w-10 h-10 md:w-12 md:h-12"
    >
      <div className={`w-full h-full rounded-xl flex items-center justify-center overflow-hidden`}>
          <img src={demo} alt="logo" className="w-full h-full" />
      </div>
    </motion.div>
  );

  const SocialIcon = ({ Icon, href, label, index }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: index * 0.1
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-2 md:p-3 rounded-lg ${themeConfig[theme].accent} 
        hover:${themeConfig[theme].buttonOutline} transition-colors duration-200 group`}
    >
      <Icon className={`w-4 h-4 md:w-5 md:h-5 ${themeConfig[theme].text}`} />
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-xs
          ${themeConfig[theme].accent} whitespace-nowrap ${themeConfig[theme].text}
          backdrop-blur-sm border ${themeConfig[theme].border} hidden md:block`}
      >
        {label}
      </motion.span>
    </motion.a>
  );


  const AvailableIndicator = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"
      />
      <span className={`text-sm font-medium ${themeConfig[theme].text}`}>
        Available for work
      </span>
    </motion.div>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 ${themeConfig[theme].primary} 
        backdrop-blur-xl ${scrolled ? 'shadow-lg' : ''} transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16 lg:h-20">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <AvailableIndicator />
            
            <div className="flex items-center space-x-4">
            <SocialIcon Icon={FaGithub} href="https://github.com/georgedevs" label="GitHub" index={0} />
                  <SocialIcon Icon={FaLinkedin} href="https://ng.linkedin.com/in/ukoh-godwin-george-b72b5b32a" label="LinkedIn" index={1} />
                  <SocialIcon Icon={FaInstagram} href="https://www.instagram.com/george_devss/" label="Instagram" index={2} />
            </div>

            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} availableThemes={availableThemes} />
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${themeConfig[theme].accent}`}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className={`py-4 space-y-4 ${themeConfig[theme].secondary} rounded-b-xl`}>
                <div className="flex justify-center space-x-4">
                  <SocialIcon Icon={FaGithub} href="https://github.com/georgedevs" label="GitHub" index={0} />
                  <SocialIcon Icon={FaLinkedin} href="https://ng.linkedin.com/in/ukoh-godwin-george-b72b5b32a" label="LinkedIn" index={1} />
                  <SocialIcon Icon={FaInstagram} href="https://www.instagram.com/george_devss/" label="Instagram" index={2} />
                </div>

                <div className="px-4">
                  <div className={`p-3 rounded-lg ${themeConfig[theme].accent} flex items-center justify-center space-x-2`}>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-2 h-2 rounded-full bg-green-400"
                    />
                    <span className={`text-sm font-medium ${themeConfig[theme].text}`}>
                      Available for work
                    </span>
                  </div>
                </div>

                <div className="px-4">
                  <MobileThemeSwitcher 
                    theme={theme} 
                    toggleTheme={toggleTheme} 
                    availableThemes={availableThemes} 
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Separate Theme Switcher Components
const ThemeSwitcher = ({ theme, toggleTheme, availableThemes }) => (
  <Menu as="div" className="relative">
    <Menu.Button
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg
        ${themeConfig[theme].buttonOutline} hover:${themeConfig[theme].accent}
        transition-colors duration-200`}
    >
      <Palette className="w-5 h-5" />
      <span className="font-medium">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
      <ChevronDown className="w-4 h-4" />
    </Menu.Button>

    <AnimatePresence>
      <Menu.Items
        as={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg ${themeConfig[theme].secondary} 
          backdrop-blur-xl border ${themeConfig[theme].border} p-2`}
      >
        {availableThemes.map((themeName) => (
          <ThemeMenuItem 
            key={themeName} 
            themeName={themeName} 
            currentTheme={theme} 
            onClick={() => toggleTheme(themeName)} 
          />
        ))}
      </Menu.Items>
    </AnimatePresence>
  </Menu>
);

const MobileThemeSwitcher = ({ theme, toggleTheme, availableThemes }) => (
  <div className={`rounded-xl ${themeConfig[theme].accent} p-3`}>
    <div className="space-y-2">
      <div className="flex items-center space-x-2 px-2">
        <Palette className="w-4 h-4" />
        <span className="text-sm font-medium">Theme</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {availableThemes.map((themeName) => (
          <button
            key={themeName}
            onClick={() => toggleTheme(themeName)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors
              ${theme === themeName ? themeConfig[themeName].accent : ''}
              ${themeConfig[theme].text} flex items-center space-x-2`}
          >
            <div className={`w-2 h-2 rounded-full ${themeConfig[themeName].primary}`} />
            <span>{themeName.charAt(0).toUpperCase() + themeName.slice(1)}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const ThemeMenuItem = ({ themeName, currentTheme, onClick }) => (
  <Menu.Item>
    {({ active }) => (
      <motion.button
        whileHover={{ scale: 1.02, x: 4 }}
        onClick={onClick}
        className={`w-full text-left px-4 py-3 rounded-lg transition-colors
          ${active ? themeConfig[themeName].accent : ''}
          ${currentTheme === themeName ? themeConfig[themeName].accent : ''}
          ${themeConfig[currentTheme].text} flex items-center space-x-2`}
      >
        <motion.div 
          className={`w-3 h-3 rounded-full ${themeConfig[themeName].primary}`}
          whileHover={{ scale: 1.2 }}
        />
        <span>{themeName.charAt(0).toUpperCase() + themeName.slice(1)}</span>
      </motion.button>
    )}
  </Menu.Item>
);

export default ModernNavbar;