import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { MessageSquare, Bot, X, Sparkles } from 'lucide-react';

const FloatingChatButton = ({ openChat }) => {
  const { theme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show the button after a delay to give users time to see the main content first
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // After showing button, show tooltip briefly
      setTimeout(() => {
        setShowTooltip(true);
        
        // Hide tooltip after 5 seconds
        setTimeout(() => {
          setShowTooltip(false);
          setHasBeenSeen(true);
        }, 5000);
      }, 1000);
    }, 3000); // 3 seconds after page load
    
    return () => clearTimeout(timer);
  }, []);

  // Generate particles for special effects
  const generateParticles = (count = 5) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 40 - 20, // positions particles around the button
      y: Math.random() * 40 - 20,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 2 + 1
    }));
  };

  const [particles] = useState(generateParticles());

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-24 right-6 z-40 md:bottom-8 md:right-8"
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -5 }}
                className={`absolute -top-16 right-0 ${themeConfig[theme].accent} backdrop-blur-md p-3 rounded-lg shadow-lg max-w-[200px] text-center`}
              >
                <div className="relative">
                  <p className={`text-sm font-medium ${themeConfig[theme].text}`}>
                    Chat with my AI assistant to learn more about me!
                  </p>
                  <div className="absolute bottom-[-8px] right-6 w-3 h-3 transform rotate-45 bg-inherit"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Particles around the button for visual interest */}
          {!hasBeenSeen && particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute w-1.5 h-1.5 rounded-full bg-blue-400"
              style={{ 
                x: particle.x, 
                y: particle.y,
                opacity: 0.6
              }}
              animate={{
                x: [particle.x, particle.x + 10, particle.x - 5, particle.x],
                y: [particle.y, particle.y - 10, particle.y + 5, particle.y],
                opacity: [0.6, 0.8, 0.4, 0.6],
                scale: [particle.scale, particle.scale * 1.2, particle.scale * 0.8, particle.scale]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Main button */}
          <motion.button
            onClick={openChat}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => !hasBeenSeen && setShowTooltip(true)}
            onHoverEnd={() => !hasBeenSeen && setShowTooltip(false)}
            animate={!hasBeenSeen ? { 
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0]
            } : {}}
            transition={!hasBeenSeen ? { 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "loop" 
            } : {}}
          >
            {/* Pulsing background */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-md"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Main button background */}
            <div className="relative p-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80 
                              group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Button icon */}
              <div className="relative flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-full h-full text-yellow-300" />
                </motion.div>
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingChatButton;