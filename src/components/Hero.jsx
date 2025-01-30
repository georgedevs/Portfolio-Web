import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Download, Edit2 } from 'lucide-react';
import { useTheme, themeConfig } from '../context/ThemeContext';
import Cookies from 'js-cookie';
const BouncingHelloWorld = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 2, y: 2 });
  const [color, setColor] = useState('text-blue-500');
  const [isExploding, setIsExploding] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const autoExplodeInterval = 30000;

  const colors = [
    'text-blue-500',
    'text-purple-500',
    'text-green-500',
    'text-orange-500',
    'text-pink-500',
    'text-cyan-500',
    'text-yellow-500'
  ];

  const handleMouseMove = (e) => {
    if (!textRef.current) return;
    
    const textRect = textRef.current.getBoundingClientRect();
    const textCenterX = textRect.left + textRect.width / 2;
    const textCenterY = textRect.top + textRect.height / 2;
    
    // Calculate distance from text center
    const distance = Math.sqrt(
      Math.pow(e.clientX - textCenterX, 2) + 
      Math.pow(e.clientY - textCenterY, 2)
    );
    
    // 5cm is approximately 189 pixels (assuming 96 DPI)
    const hoverRange = 189;
    setIsHovered(distance < hoverRange);
  };

  const createParticles = (x, y) => {
    const particleCount = 60; // Increased for more spectacular effect
    const particles = [];
    
    // Create main explosion particles
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = 12 + Math.random() * 8; // More varied velocities
      const size = Math.random() * 12 + 4; // Larger size variation
      
      particles.push({
        id: `main-${i}`,
        x,
        y,
        vx: Math.cos(angle) * velocity * (0.5 + Math.random()),
        vy: Math.sin(angle) * velocity * (0.5 + Math.random()),
        size,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        type: 'gradient',
        gradientType: Math.random() > 0.5 ? 'blue-purple' : 'purple-pink',
        life: 1,
        spinDir: Math.random() > 0.5 ? 1 : -1,
      });
    }
  
    // Add some glowing orb particles
    for (let i = 0; i < particleCount/2; i++) {
      const angle = (i / (particleCount/2)) * Math.PI * 2;
      const velocity = 8 + Math.random() * 6;
      
      particles.push({
        id: `glow-${i}`,
        x,
        y,
        vx: Math.cos(angle) * velocity * (0.5 + Math.random()),
        vy: Math.sin(angle) * velocity * (0.5 + Math.random()),
        size: Math.random() * 6 + 2,
        type: 'glow',
        color: colors[Math.floor(Math.random() * colors.length)].replace('text-', 'bg-'),
        life: 1,
      });
    }
  
    return particles;
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isExploding) {
      const rect = textRef.current.getBoundingClientRect();
      setIsExploding(true);
      setParticles(createParticles(
        e.clientX,
        e.clientY
      ));
  
      setTimeout(() => {
        setPosition({ x: Math.random() * window.innerWidth * 0.8, y: Math.random() * window.innerHeight * 0.8 });
        setVelocity({ x: 2, y: 2 });
        setIsExploding(false);
        setParticles([]);
      }, 1000);
    }
  };

  useEffect(() => {
    const autoExplode = () => {
      if (!isExploding && textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        setIsExploding(true);
        setParticles(createParticles(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        ));
  
        setTimeout(() => {
          setPosition({ x: Math.random() * window.innerWidth * 0.8, y: Math.random() * window.innerHeight * 0.8 });
          setVelocity({ x: 2, y: 2 });
          setIsExploding(false);
          setParticles([]);
        }, 1000);
      }
    };

  const intervalId = setInterval(autoExplode, autoExplodeInterval);
  return () => clearInterval(intervalId);
}, [isExploding]);

  useEffect(() => {
    let animationFrameId;
    
    const animate = () => {
      if (!containerRef.current || !textRef.current || isExploding) return;
      
      const container = containerRef.current.getBoundingClientRect();
      const text = textRef.current.getBoundingClientRect();
      
      setPosition(prevPos => {
        let newX = prevPos.x + velocity.x;
        let newY = prevPos.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;
        let hitEdge = false;

        if (newX < 0 || newX + text.width > container.width) {
          newVelX = -velocity.x;
          hitEdge = true;
        }

        if (newY < 0 || newY + text.height > container.height) {
          newVelY = -velocity.y;
          hitEdge = true;
        }

        if (hitEdge) {
          setVelocity({ x: newVelX, y: newVelY });
          setColor(colors[Math.floor(Math.random() * colors.length)]);
        }

        return {
          x: newX < 0 ? 0 : newX + text.width > container.width ? container.width - text.width : newX,
          y: newY < 0 ? 0 : newY + text.height > container.height ? container.height - text.height : newY
        };
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [velocity, isExploding]);

  useEffect(() => {
    if (!particles.length) return;
  
    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + (particle.type === 'glow' ? 0.1 : 0.2), // Different gravity for different particles
            vx: particle.vx * 0.99, // Add some air resistance
            rotation: particle.rotation + (particle.rotationSpeed || 0),
            life: particle.life - (particle.type === 'glow' ? 0.015 : 0.02), // Different fade rates
          }))
          .filter(particle => particle.life > 0)
      );
    };
  
    const intervalId = setInterval(animateParticles, 16);
    return () => clearInterval(intervalId);
  }, [particles]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden z-0"
      style={{ pointerEvents: 'none', zIndex: 20 }}
    >
      {!isExploding && (
        <motion.div
          ref={textRef}
          className={`text-2xl font-bold font-mono ${color} transition-colors duration-300 cursor-pointer`}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            textShadow: '0 0 10px currentColor',
            pointerEvents: 'auto',
            opacity: 0.6 // Reduced opacity
          }}
          onClick={handleClick}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.2, opacity: 1 }}
        >
          {"<HelloWorld />"}
        </motion.div>
      )}

<AnimatePresence>
  {particles.map(particle => (
    <motion.div
      key={particle.id}
      initial={{ opacity: 1, scale: 1, rotate: particle.rotation || 0 }}
      animate={{
        opacity: particle.life,
        scale: particle.life * (particle.type === 'glow' ? 2 : 1.5),
        rotate: particle.type === 'gradient' ? 
          particle.rotation + (particle.rotationSpeed * particle.spinDir * 360) : 
          particle.rotation,
      }}
      exit={{ opacity: 0, scale: 0 }}
      className={`absolute rounded-full ${
        particle.type === 'glow' ? particle.color : ''
      }`}
      style={{
        left: particle.x,
        top: particle.y,
        width: particle.size,
        height: particle.size,
        background: particle.type === 'gradient' ? 
          particle.gradientType === 'blue-purple' ?
            'linear-gradient(45deg, #3B82F6, #8B5CF6)' :
            'linear-gradient(45deg, #8B5CF6, #EC4899)' :
          undefined,
        boxShadow: particle.type === 'glow' ? 
          `0 0 ${particle.size * 2}px ${particle.color.replace('bg-', 'rgb-')}` :
          `0 0 ${particle.size}px currentColor`,
        transform: `rotate(${particle.rotation}deg)`,
      }}
    />
  ))}
</AnimatePresence>
    </div>
  );
};

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
  const defaultName = "Ukoh-Godwin George";
  const [displayedName, setDisplayedName] = useState('');
  const [editableName, setEditableName] = useState(defaultName);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditHint, setShowEditHint] = useState(false);
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

  // Initialize the component
  useEffect(() => {
    // Clear any existing temporary name cookie
    Cookies.remove('tempName');
    
    if (isMobile) {
      setDisplayedName(editableName);
      setShowCursor(false);
      return;
    }

    if (!isEditing) {
      let timeoutId;
      let index = 0;
      const animateName = () => {
        if (index <= editableName.length) {
          setDisplayedName(editableName.slice(0, index));
          index++;
          timeoutId = setTimeout(animateName, 100);
        } else {
          setShowCursor(false);
        }
      };

      animateName();

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [isMobile, editableName, isEditing]);
  const handleNameClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setShowCursor(true);
      setDisplayedName(editableName);
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setEditableName(newName);
    setDisplayedName(newName);
    Cookies.set('tempName', newName, { expires: 1 });
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    setShowCursor(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };


  // Reset name on page load
  useEffect(() => {
    const savedName = Cookies.get('tempName');
    if (savedName) {
      setEditableName(savedName);
    }
    // Remove the cookie after getting its value
    Cookies.remove('tempName');
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
    'Machine Learning Engineer',
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
      <BouncingHelloWorld/>
      
      <motion.div 
        className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-6 sm:space-y-8">
          <motion.div className="text-center relative"
            onMouseEnter={() => setShowEditHint(true)}
            onMouseLeave={() => setShowEditHint(false)}
          >
            <div className="relative inline-block">
              {isEditing ? (
                <input
                  type="text"
                  value={editableName}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                  onKeyDown={handleKeyDown}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 font-departure bg-transparent border-b-2 border-blue-500 focus:outline-none text-center w-full"
                  autoFocus
                />
              ) : (
                <h1 
                  onClick={handleNameClick}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 font-departure cursor-pointer"
                >
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    {displayedName}
                  </span>
                </h1>
              )}
              
              {showEditHint && !isEditing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap"
                >
                  <div className="flex items-center space-x-1">
                    <Edit2 className="w-3 h-3" />
                    <span>Click to edit name</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                </motion.div>
              )}
            </div>
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