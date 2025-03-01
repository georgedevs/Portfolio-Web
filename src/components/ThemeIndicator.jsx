import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { Palette } from 'lucide-react';

const ThemeIndicator = () => {
  const { theme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // Hide the indicator after some time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // Hide after 10 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show again when theme changes
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // Hide after 5 seconds on theme change
    
    return () => clearTimeout(timer);
  }, [theme]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 left-8 z-40"
        >
          <motion.div
            className={`${themeConfig[theme].accent} rounded-xl backdrop-blur-xl p-3 shadow-lg relative cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setShowTooltip(true)}
            onHoverEnd={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-blue-500" />
              <span className={`text-sm ${themeConfig[theme].text} font-medium`}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
              </span>
              
              {/* Pulsing dot */}
              <motion.div 
                className="w-2 h-2 rounded-full bg-blue-500"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute -top-20 left-0 right-0 p-3 rounded-lg ${themeConfig[theme].accent} shadow-lg backdrop-blur-lg`}
                >
                  <div className="relative">
                    <p className={`text-sm ${themeConfig[theme].text} font-medium`}>
                      Don't like this theme?
                    </p>
                    <p className={`text-xs ${themeConfig[theme].text} opacity-80`}>
                      Click the palette icon in the navbar to change!
                    </p>
                    <div className="absolute h-4 w-4 bg-inherit transform rotate-45 -bottom-2 left-6" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeIndicator;