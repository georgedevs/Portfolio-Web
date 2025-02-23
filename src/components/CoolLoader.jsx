import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { Code, Rocket, Terminal, Box } from 'lucide-react';

const ModernLoader = ({ onComplete }) => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [blobs, setBlobs] = useState([]);
  const [gridPoints, setGridPoints] = useState([]);

  const phases = [
    { icon: Terminal, text: "Initializing Experience" },
    { icon: Code, text: "Compiling Elements" },
    { icon: Box, text: "Building Interface" },
    { icon: Rocket, text: "Launching Portfolio" }
  ];

  useEffect(() => {
    // Generate background elements
    const newBlobs = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      scale: Math.random() * 0.5 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 5 + 5
    }));
    setBlobs(newBlobs);

    // Simplified grid points for better performance
    const points = [];
    const spacing = window.innerWidth < 768 ? 75 : 50; // Larger spacing on mobile
    for (let x = 0; x < window.innerWidth; x += spacing) {
      for (let y = 0; y < window.innerHeight; y += spacing) {
        points.push({
          x,
          y,
          delay: (x + y) / 2000 // Faster delay
        });
      }
    }
    setGridPoints(points);

    // Faster progress increment
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 200); // Reduced final delay
          return 100;
        }
        return prev + 2; // Increased increment for faster progress
      });
    }, 10); // Reduced interval

    // Faster phase transitions
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % phases.length);
    }, 750); // Reduced from 2000ms to 750ms

    return () => {
      clearInterval(progressInterval);
      clearInterval(phaseInterval);
    };
  }, [onComplete]);

  const CurrentIcon = phases[currentPhase].icon;

  return (
    <motion.div
      className={`fixed inset-0 ${themeConfig[theme].primary} flex items-center justify-center z-50 overflow-hidden`}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }} // Faster exit transition
    >
      {/* Optimized background animations */}
      {blobs.map(blob => (
        <motion.div
          key={blob.id}
          className="absolute bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          style={{
            width: '40vw',
            height: '40vw',
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            scale: blob.scale
          }}
          animate={{
            x: [-20, 20, -20],
            y: [-20, 20, -20],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Simplified grid for better performance */}
      <div className="absolute inset-0 overflow-hidden">
        {gridPoints.map((point, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gray-500/10"
            style={{ left: point.x, top: point.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: point.delay
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-8"> {/* Reduced spacing */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20
              }}
              className="relative flex justify-center"
            >
              <motion.div
                className="p-6 rounded-2xl backdrop-blur-xl relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)'
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    background: [
                      "linear-gradient(0deg, transparent 0%, #3B82F6 50%, transparent 100%)",
                      "linear-gradient(90deg, transparent 0%, #8B5CF6 50%, transparent 100%)",
                      "linear-gradient(180deg, transparent 0%, #EC4899 50%, transparent 100%)",
                      "linear-gradient(270deg, transparent 0%, #3B82F6 50%, transparent 100%)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ opacity: 0.2 }}
                />

                <CurrentIcon className="w-12 h-12 text-white relative z-10" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="space-y-4"> {/* Reduced spacing */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <motion.h2
                className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
              >
                {phases[currentPhase].text}
              </motion.h2>
            </motion.div>
          </AnimatePresence>

          <div className="relative">
            <div className="h-1 w-48 sm:w-64 bg-gray-700/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 0%'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernLoader;