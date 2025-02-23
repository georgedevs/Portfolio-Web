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

  // Sophisticated loading phases
  const phases = [
    { icon: Terminal, text: "Initializing Experience" },
    { icon: Code, text: "Compiling Elements" },
    { icon: Box, text: "Building Interface" },
    { icon: Rocket, text: "Launching Portfolio" }
  ];

  useEffect(() => {
    // Generate abstract background blobs
    const newBlobs = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      scale: Math.random() * 0.5 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 5 + 5
    }));
    setBlobs(newBlobs);

    // Generate grid points for background
    const points = [];
    const spacing = 50;
    for (let x = 0; x < window.innerWidth; x += spacing) {
      for (let y = 0; y < window.innerHeight; y += spacing) {
        points.push({
          x,
          y,
          delay: (x + y) / 1000
        });
      }
    }
    setGridPoints(points);

    // Progress and phase animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 0.5;
      });
    }, 20);

    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % phases.length);
    }, 2000);

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
      transition={{ duration: 0.5 }}
    >
      {/* Abstract animated background */}
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

      {/* Grid background */}
      <div className="absolute inset-0 overflow-hidden">
        {gridPoints.map((point, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gray-500/10"
            style={{ left: point.x, top: point.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: point.delay
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-12">
        {/* Main loading interface */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="relative flex justify-center"
            >
              <motion.div
                className="p-8 rounded-2xl backdrop-blur-xl relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)'
                }}
              >
                {/* Animated border */}
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
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ opacity: 0.2 }}
                />

                <CurrentIcon className="w-16 h-16 text-white relative z-10" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Loading text and progress */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <motion.h2
                className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
              >
                {phases[currentPhase].text}
              </motion.h2>
            </motion.div>
          </AnimatePresence>

          {/* Sophisticated progress bar */}
          <div className="relative">
            <div className="h-1 w-64 bg-gray-700/30 rounded-full overflow-hidden">
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
                  duration: 2,
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