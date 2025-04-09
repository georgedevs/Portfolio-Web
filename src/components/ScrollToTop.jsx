import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 45 }}
          whileHover={{ 
            scale: 1.1,
            rotate: -15,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-24 md:bottom-8 right-8 md:right-24 z-50 w-12 h-12 rounded-xl overflow-hidden shadow-lg"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-90"
            animate={{
              background: [
                'linear-gradient(45deg, rgb(59,130,246), rgb(139,92,246))',
                'linear-gradient(225deg, rgb(139,92,246), rgb(236,72,153))',
                'linear-gradient(45deg, rgb(236,72,153), rgb(59,130,246))'
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Glowing effect */}
          <motion.div
            className="absolute inset-0 blur-xl opacity-50"
            animate={{
              background: [
                'linear-gradient(45deg, rgb(59,130,246), transparent)',
                'linear-gradient(225deg, rgb(236,72,153), transparent)',
                'linear-gradient(45deg, rgb(59,130,246), transparent)'
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          {/* Border animation */}
          <motion.div
            className="absolute inset-0 opacity-50"
            animate={{
              background: [
                'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)'
              ],
              backgroundSize: ['200% 100%'],
              backgroundPosition: ['-200% 0', '200% 0']
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Arrow icon */}
          <motion.div 
            className="relative z-10 w-full h-full flex items-center justify-center"
            animate={{ 
              y: [0, -4, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;