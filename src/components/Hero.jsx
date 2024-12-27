import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useTheme, themeConfig } from '../context/ThemeContext';

const RainBackground = () => {
  const [raindrops, setRaindrops] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const generateRaindrops = () => {
      const isMobile = window.innerWidth < 768;
      const raindropCount = isMobile ? 25 : 50; // Reduce raindrops on mobile
      const newRaindrops = Array.from({ length: raindropCount }).map((_, index) => ({
        id: index,
        x: Math.random() * 100,
        y: -20,
        size: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 2,
        duration: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.3 + 0.2,
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
          className="absolute bg-gradient-to-b from-gray-400/50 to-gray-300/30"
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

const ModernHero = () => {
  const { theme } = useTheme();
  const [displayedName, setDisplayedName] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedDescription, setDisplayedDescription] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const name = "Ukoh-Godwin George";
  const description = "Crafting digital experiences with code. Specialized in building exceptional applications that combine innovative design with robust functionality. Let's turn your vision into reality.";
  const roles = [
    'Full Stack Developer',
    'Software Engineer',
    'Frontend Specialist',
    'Backend Developer',
  ];

  // Mobile-optimized animations
  const mobileVariants = {
    name: {
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
    },
    role: {
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.3 } }
    },
    description: {
      hidden: { x: 100, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.6 } }
    }
  };

  useEffect(() => {
    if (!isMobile) {
      // Desktop typing animation
      let index = 0;
      const typeName = async () => {
        if (index <= name.length) {
          setDisplayedName(name.slice(0, index));
          index++;
          setTimeout(typeName, 100);
        } else {
          setShowCursor(false);
        }
      };
      typeName();
    } else {
      // Instant display on mobile
      setDisplayedName(name);
      setShowCursor(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      let index = 0;
      const typeDescription = async () => {
        if (index <= description.length) {
          setDisplayedDescription(description.slice(0, index));
          index++;
          setTimeout(typeDescription, 20);
        }
      };
      typeDescription();
    } else {
      setDisplayedDescription(description);
    }
  }, [isMobile]);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (displayedRole.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
          setDisplayedRole(currentRole.substring(0, displayedRole.length - 1));
        }
      } else {
        if (displayedRole.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else {
          setDisplayedRole(currentRole.substring(0, displayedRole.length + 1));
        }
      }
    }, isMobile ? 30 : (isDeleting ? 50 : 100)); // Faster on mobile

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex, isMobile]);

  return (
    <div className={`min-h-screen ${themeConfig[theme].primary} transition-colors duration-500 overflow-hidden relative flex items-center justify-center`}>
      <RainBackground />
      
      <motion.div 
        className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-6 sm:space-y-8">
          <motion.div
            initial={isMobile ? "hidden" : { opacity: 0, y: 20 }}
            animate={isMobile ? "visible" : { opacity: 1, y: 0 }}
            variants={mobileVariants.name}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                {displayedName}
              </span>
              {showCursor && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-blue-500"
                >
                  |
                </motion.span>
              )}
            </h1>
            
            <motion.div 
              className="h-8 sm:h-10"
              initial={isMobile ? "hidden" : {}}
              animate={isMobile ? "visible" : {}}
              variants={mobileVariants.role}
            >
              <div className={`text-lg sm:text-xl lg:text-2xl font-medium ${themeConfig[theme].text}`}>
                <motion.span
                  animate={{
                    color: ['#3B82F6', '#8B5CF6', '#EC4899', '#3B82F6'],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  {displayedRole}
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={isMobile ? "hidden" : { opacity: 0, y: 20 }}
            animate={isMobile ? "visible" : { opacity: 1, y: 0 }}
            variants={mobileVariants.description}
            className={`relative p-4 sm:p-6 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg`}
          >
            <motion.div
              className="absolute inset-0 rounded-xl opacity-30"
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(59,130,246,0.2), transparent)',
                  'linear-gradient(225deg, rgba(236,72,153,0.2), transparent)',
                  'linear-gradient(45deg, rgba(59,130,246,0.2), transparent)'
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <p className={`text-sm sm:text-base ${themeConfig[theme].text} relative z-10`}>
              {displayedDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4"
          >
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg ${themeConfig[theme].button} flex items-center justify-center space-x-2 text-sm sm:text-base`}
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={() => window.open('/RESUME.pdf', '_blank')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg border-2 ${themeConfig[theme].borderButton} 
                hover:bg-blue-500/10 transition-colors duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base`}
            >
              <span>Download CV</span>
              <Download className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModernHero;