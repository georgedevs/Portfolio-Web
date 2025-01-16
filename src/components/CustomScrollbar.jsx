import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const CustomScrollbar = () => {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  // Smooth scroll progress
  const scrollProgress = useSpring(
    useTransform(
      scrollY,
      [0, documentHeight - viewportHeight],
      [0, 100]
    ),
    { damping: 15, stiffness: 100 }
  );

  // Update dimensions and check mobile
  useEffect(() => {
    const updateDimensions = () => {
      setViewportHeight(window.innerHeight);
      setDocumentHeight(document.documentElement.scrollHeight);
      setIsMobile(window.innerWidth < 768); // 768px is typical tablet/mobile breakpoint
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('load', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('load', updateDimensions);
    };
  }, []);

  const [currentPercentage, setCurrentPercentage] = useState(0);
  
  useEffect(() => {
    return scrollProgress.onChange(latest => {
      setCurrentPercentage(Math.round(latest));
    });
  }, [scrollProgress]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 hidden md:flex">
      {/* Percentage display */}
      <div className="relative min-w-[40px] text-center">
        <motion.div
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-bold rounded-lg px-2 py-1"
        >
          {currentPercentage}%
        </motion.div>
      </div>

      {/* Scrollbar track - explicitly set to 60vh */}
      <div className="relative h-[60vh] w-1 bg-gray-200/20 rounded-full overflow-hidden">
        {/* Gradient fill container */}
        <div className="absolute inset-0 w-full">
          {/* Gradient background that fills from top to bottom */}
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
            style={{ 
              height: `${currentPercentage}%`,
              transition: 'height 0.1s ease-out'
            }}
          />
        </div>

        {/* Interactive hover effect */}
        <motion.div 
          className="absolute inset-0 bg-white/20 rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </div>
    </div>
  );
};

export default CustomScrollbar;