import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from 'framer-motion';

export const RainBackground = () => {
    const [raindrops, setRaindrops] = useState([]);
    const { theme } = useTheme();
  
    useEffect(() => {
      const generateRaindrops = () => {
        const isMobile = window.innerWidth < 768;
        const raindropCount = isMobile ? 5 : 10;
        const newRaindrops = Array.from({ length: raindropCount }).map((_, index) => ({
          id: index,
          x: Math.random() * 100,
          y: -20,
          size: Math.random() * 1.5 + 0.5,
          delay: Math.random() * 2,
          duration: Math.random() * 1.5 + 1.5,
          opacity: Math.random() * 0.15 + 0.05, 
          blur: Math.random() * 0.5
        }));
        setRaindrops(newRaindrops);
      };
  
      generateRaindrops();
      const handleResize = () => {
        const width = window.innerWidth;
        if (width < 768 && prevWidth >= 768 || width >= 768 && prevWidth < 768) {
          generateRaindrops();
          prevWidth = width;
        }
      };
      
      let prevWidth = window.innerWidth;
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {raindrops.map((raindrop) => (
          <motion.div
            key={raindrop.id}
            className="absolute bg-gradient-to-b from-gray-400/40 to-gray-300/20"
            style={{
              width: `${raindrop.size}px`,
              height: `${raindrop.size * 15}px`,
              left: `${raindrop.x}%`,
              opacity: raindrop.opacity,
              filter: `blur(${raindrop.blur}px)`,
              borderRadius: '100px',
              willChange: 'transform' // Performance optimization
            }}
            initial={{ y: -20 }}
            animate={{ y: '120vh' }}
            transition={{
              duration: raindrop.duration,
              delay: raindrop.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
};