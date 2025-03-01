import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { Code, Rocket, Terminal, Box, Brain, Heart, Coffee, LucideCode, Smile, Star } from 'lucide-react';

const EnhancedLoader = ({ onComplete }) => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [blobs, setBlobs] = useState([]);
  const [gridPoints, setGridPoints] = useState([]);
  const [factIndex, setFactIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  
  // Maximum loading time in milliseconds (12 seconds)
  const MAX_LOADING_TIME = 12000;
  const LOADING_INCREMENT = 0.65; // Slightly faster progress

  // Skills to display during loading
  const skills = [
    { name: 'React', icon: Code, color: '#61DAFB' },
    { name: 'Node.js', icon: Terminal, color: '#339933' },
    { name: 'TypeScript', icon: LucideCode, color: '#3178C6' },
    { name: 'MongoDB', icon: Box, color: '#47A248' },
    { name: 'UI/UX', icon: Heart, color: '#FF6B6B' },
    { name: 'Problem Solving', icon: Brain, color: '#9C27B0' }
  ];

  // Fun facts to cycle through during loading
  const funFacts = [
    "I spend 10+ hours coding everyday",
    "My first line of code was 'Hello, World!' in Python",
    "I enjoy solving algorithm puzzles in my free time",
    "I'm a big fan of minimalist design principles",
    "I contribute to open-source projects regularly",
    "My favorite VS Code theme is 'Tokyo Night'"
  ];

  // More meaningful loading phases
  const phases = [
    { icon: Terminal, text: "Initializing Experience", description: "Setting up environment" },
    { icon: Code, text: "Compiling Elements", description: "Optimizing components" },
    { icon: Box, text: "Building Interface", description: "Rendering UI components" },
    { icon: Rocket, text: "Launching Portfolio", description: "Preparing for takeoff" }
  ];

  // Force complete loading after maximum time
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (showLoader) {
        setProgress(100);
        setTimeout(() => {
          setShowLoader(false);
          onComplete();
        }, 500);
      }
    }, MAX_LOADING_TIME);

    return () => clearTimeout(timeoutId);
  }, [onComplete, showLoader]);

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

    // Progress animation with more realistic loading
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setShowLoader(false);
            onComplete();
          }, 500);
          return 100;
        }
        // Progress increases more at the beginning, slows in the middle, then speeds up at the end
        const increment = 
          prev < 30 ? LOADING_INCREMENT * 1.2 : 
          prev > 80 ? LOADING_INCREMENT * 1.5 : 
          LOADING_INCREMENT * 0.8;
        return prev + increment;
      });
    }, 25);

    // Phase animation - more time on meaningful phases
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % phases.length);
    }, 3000);

    // Fun facts rotation
    const factInterval = setInterval(() => {
      setFactIndex(prev => (prev + 1) % funFacts.length);
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phaseInterval);
      clearInterval(factInterval);
    };
  }, [onComplete]);

  const CurrentIcon = phases[currentPhase].icon;

  // Format progress to show decimal for more movement
  const formattedProgress = Math.min(100, Math.floor(progress * 10) / 10).toFixed(1);

  // Skip loader if it's already completed
  if (!showLoader) return null;

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className={`fixed inset-0 ${themeConfig[theme].primary} flex flex-col items-center justify-center z-50 overflow-hidden`}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-live="polite"
          aria-busy="true"
          role="progressbar"
          aria-valuenow={Math.floor(progress)}
          aria-valuemin="0"
          aria-valuemax="100"
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

          <div className="relative z-10 space-y-12 px-4 max-w-md">
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
                  className="text-center space-y-2"
                >
                  <motion.h2
                    className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                  >
                    {phases[currentPhase].text}
                  </motion.h2>
                  <motion.p className="text-sm text-white/70">
                    {phases[currentPhase].description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              {/* Progress indicators */}
              <div className="space-y-4">
                {/* Sophisticated progress bar */}
                <div className="relative">
                  <div className="h-1.5 w-64 bg-gray-700/30 rounded-full overflow-hidden">
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
                  
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-white/70">Loading portfolio...</span>
                    <span className="text-xs font-medium text-white">{formattedProgress}%</span>
                  </div>
                </div>
                
                {/* Skills showcase */}
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: progress > (index + 1) * 15 ? 1 : 0, 
                        scale: progress > (index + 1) * 15 ? 1 : 0 
                      }}
                      className="flex flex-col items-center"
                    >
                      <div className="p-2 rounded-full bg-white/10">
                        <skill.icon 
                          className="w-5 h-5" 
                          style={{ color: skill.color }}
                        />
                      </div>
                      <span className="text-xs mt-1 text-white/80">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Fun facts */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={factIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center space-x-2 text-sm text-white/80 mt-6 px-3 py-2 rounded-lg bg-white/5"
                >
                  <Smile className="w-4 h-4 text-yellow-400" />
                  <span>{funFacts[factIndex]}</span>
                </motion.div>
              </AnimatePresence>
              
              {/* Skip button */}
              <motion.button
                onClick={() => {
                  setProgress(100);
                  setTimeout(() => {
                    setShowLoader(false);
                    onComplete();
                  }, 300);
                }}
                className="text-sm text-white/50 hover:text-white/80 transition-colors mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Skip intro
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedLoader;