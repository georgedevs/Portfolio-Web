'use client'
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from 'framer-motion';

export const RainBackground = () => {
    const [raindrops, setRaindrops] = useState([]);
    const { theme } = useTheme();
  
    useEffect(() => {
      const generateRaindrops = () => {
        const isMobile = window.innerWidth < 768;
        // Significantly reduced raindrop count
        const raindropCount = isMobile ? 10 : 20;
        const newRaindrops = Array.from({ length: raindropCount }).map((_, index) => ({
          id: index,
          x: Math.random() * 100,
          y: -20,
          size: Math.random() * 1.5 + 0.5,
          delay: Math.random() * 2,
          duration: Math.random() * 1.5 + 1.5, // Slightly slower for better effect
          opacity: Math.random() * 0.2 + 0.1, // More subtle opacity
          blur: Math.random() * 0.5
        }));
        setRaindrops(newRaindrops);
      };
  
      generateRaindrops();
      window.addEventListener('resize', generateRaindrops);
      return () => window.removeEventListener('resize', generateRaindrops);
    }, []);
  
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {raindrops.map((raindrop) => (
          <motion.div
            key={raindrop.id}
            className="absolute bg-gradient-to-b from-gray-400/40 to-gray-300/20" // More subtle colors
            style={{
              width: `${raindrop.size}px`,
              height: `${raindrop.size * 15}px`,
              left: `${raindrop.x}%`,
              opacity: raindrop.opacity,
              filter: `blur(${raindrop.blur}px)`,
              backdropFilter: 'blur(0.5px)',
              borderRadius: '100px'
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