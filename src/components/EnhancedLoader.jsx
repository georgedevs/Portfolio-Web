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
  
  // Maximum loading time in milliseconds (reduced from 12 seconds to 6 seconds)
  const MAX_LOADING_TIME = 6000;
  const LOADING_INCREMENT = 1.5; // Faster progress

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
        }, 300); // Faster transition out
      }
    }, MAX_LOADING_TIME);

    return () => clearTimeout(timeoutId);
  }, [onComplete, showLoader]);

  useEffect(() => {
    // Generate abstract background blobs - REDUCED quantity
    const newBlobs = Array.from({ length: 2 }).map((_, i) => ({
      id: i,
      scale: Math.random() * 0.5 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 5 + 5
    }));
    setBlobs(newBlobs);

    // Generate grid points for background - REDUCED quantity with increased spacing
    const points = [];
    const spacing = 80; // Increased from 50 for fewer points
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
          }, 300); // Faster completion
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
    }, 1500); // Faster phases

    // Fun facts rotation
    const factInterval = setInterval(() => {
      setFactIndex(prev => (prev + 1) % funFacts.length);
    }, 2000); // Faster rotation

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
          transition={{ duration: 0.3 }} // Faster exit
          aria-live="polite"
          aria-busy="true"
          role="progressbar"
          aria-valuenow={Math.floor(progress)}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {/* Abstract animated background - SIMPLIFIED */}
          {blobs.map(blob => (
            <motion.div
              key={blob.id}
              className="absolute bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
              style={{
                width: '40vw',
                height: '40vw',
                left: `${blob.x}%`,
                top: `${blob.y}%`,
                scale: blob.scale,
                willChange: 'transform'
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

          {/* Grid background - SIMPLIFIED, rendered fewer points */}
          <div className="absolute inset-0 overflow-hidden">
            {gridPoints.slice(0, 50).map((point, i) => ( // Limit points rendered
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

          <div className="relative z-10 space-y-8 px-4 max-w-md">
            {/* Main loading interface - SIMPLIFIED */}
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
                      background: 'rgba(255, 255, 255, 0.03)',
                      willChange: 'transform'
                    }}
                  >
                    <CurrentIcon className="w-16 h-16 text-white relative z-10" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Loading text and progress - SIMPLIFIED */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <motion.h2
                    className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                  >
                    {phases[currentPhase].text}
                  </motion.h2>
                </motion.div>
              </AnimatePresence>

              {/* Progress indicators - SIMPLIFIED */}
              <div className="space-y-4">
                {/* Sophisticated progress bar */}
                <div className="relative">
                  <div className="h-1.5 w-64 bg-gray-700/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
                        willChange: 'transform'
                      }}
                    />
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-white/70">Loading portfolio...</span>
                    <span className="text-xs font-medium text-white">{formattedProgress}%</span>
                  </div>
                </div>
                
                {/* Skills showcase - SIMPLIFIED */}
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {skills.slice(0, 4).map((skill, index) => ( // Show fewer skills
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