import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { Code, Sparkles } from 'lucide-react';

const CoolLoader = ({ onComplete }) => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [particlesCount] = useState(20);
  const [particles, setParticles] = useState([]);
  const [showText, setShowText] = useState(false);

  const text = "Loading Portfolio";
  const letters = Array.from(text);

  useEffect(() => {
    // Show text after a small delay
    setTimeout(() => {
      setShowText(true);
    }, 200);

    // Generate random particles
    const newParticles = Array.from({ length: particlesCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 2 + 1,
      delay: Math.random()
    }));
    setParticles(newParticles);


    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const containerVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={`fixed inset-0 ${themeConfig[theme].primary} flex items-center justify-center z-50`}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full">
        {/* Animated particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-blue-500"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 1, 0.5],
              x: [`${particle.x}%`, `${particle.x + (Math.random() * 20 - 10)}%`],
              y: [`${particle.y}%`, `${particle.y + (Math.random() * 20 - 10)}%`]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear"
            }}
          />
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative space-y-8">
            {/* Animated logo/icon */}
            <motion.div
              className="flex justify-center mb-8"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="relative">
                <Code className="w-16 h-16 text-blue-500" />
                <motion.div
                  className="absolute -right-2 -top-2"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </motion.div>
              </div>
            </motion.div>

            {/* Text reveal animation */}
            <div className="text-center space-y-4 overflow-hidden">
              <motion.div
                initial="hidden"
                animate={showText ? "visible" : "hidden"}
                variants={containerVariants}
                className="overflow-hidden whitespace-nowrap"
              >
                <motion.h2 className="text-3xl font-bold">
                  {letters.map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.h2>
              </motion.div>
              
              {/* Progress text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`text-sm ${themeConfig[theme].text} opacity-60`}
              >
                {progress}%
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-gray-200/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Loading dots */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-2 h-2 rounded-full bg-blue-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: dot * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CoolLoader;