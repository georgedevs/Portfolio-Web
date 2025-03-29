import  { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CustomScrollbar = () => {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  // Calculate scroll percentage directly without spring animation
  const scrollPercentage = useTransform(
    scrollY,
    [0, documentHeight - viewportHeight],
    [0, 100],
    { clamp: true } // This ensures the value stays between 0-100
  );

  // Update dimensions and check mobile
  useEffect(() => {
    const updateDimensions = () => {
      const vh = window.innerHeight;
      const dh = document.documentElement.scrollHeight;
      setViewportHeight(vh);
      setDocumentHeight(dh);
      setIsMobile(window.innerWidth < 768);
    };

    // Initial update
    updateDimensions();
    
    // Update on resize and content load
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(document.documentElement);

    return () => resizeObserver.disconnect();
  }, []);

  const [currentPercentage, setCurrentPercentage] = useState(0);
  
  useEffect(() => {
    // Updated to use the new .on("change", callback) method instead of .onChange(callback)
    const unsubscribe = scrollPercentage.on("change", latest => {
      // Round to nearest integer and clamp between 0-100
      const percentage = Math.max(0, Math.min(100, Math.round(latest)));
      setCurrentPercentage(percentage);
    });
    
    // Return the unsubscribe function for cleanup
    return unsubscribe;
  }, [scrollPercentage]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 md:flex">
      {/* Percentage display */}
      <div className="relative min-w-[40px] text-center">
        <motion.div
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-bold rounded-lg px-2 py-1"
        >
          {currentPercentage}%
        </motion.div>
      </div>

      {/* Scrollbar track */}
      <div className="relative h-[60vh] w-1 bg-gray-200/20 rounded-full overflow-hidden">
        {/* Gradient fill */}
        <motion.div 
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
          style={{ height: `${currentPercentage}%` }}
        />

        {/* Hover effect */}
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