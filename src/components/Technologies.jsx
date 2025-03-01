import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { X, ChevronRight, Code } from 'lucide-react';
import { RiReactjsLine, RiNodejsLine } from 'react-icons/ri';
import {
  SiTypescript, SiMongodb, SiExpress, SiRedis, SiNextdotjs,
  SiPostgresql, SiPytorch, SiTensorflow, SiPython,SiVite
} from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { RainBackground } from './RainBackground';

const Technologies = () => {
  const { theme } = useTheme();
  const [selectedTech, setSelectedTech] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Tech data with enhanced information
  const techData = {
    frontend: [
      { 
        icon: RiReactjsLine, 
        name: 'React',
        color: '#61DAFB',
        backgroundColor: 'rgba(97, 218, 251, 0.1)',
        orbitPosition: 0, // Angle around the circle (0-360)
        description: 'Building interactive, component-based user interfaces with cutting-edge React architecture.',
        skills: ['Component Design', 'Hooks', 'State Management', 'Performance Optimization'],
        projects: 2,
        experience: '3 years'
      },
      { 
        icon: SiNextdotjs, 
        name: 'Next.js',
        color: theme === 'light' ? '#000000' : '#ffffff', // Adapt based on theme
        backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)',
        orbitPosition: 120,
        description: 'Leveraging server-side rendering and static site generation for optimal web performance.',
        skills: ['SSR', 'Static Generation', 'API Routes', 'Incremental Static Regeneration'],
        projects: 3,
        experience: '2 years'
      },
      { 
        icon: SiVite, 
        name: 'Vite',
        color: '#646CFF',
        backgroundColor: 'rgba(100, 108, 255, 0.1)',
        orbitPosition: 240,
        description: 'Using modern build tools for lightning-fast development and optimized production builds.',
        skills: ['HMR', 'ESM', 'Plugin System', 'Build Optimization'],
        projects: 2,
        experience: '1 year'
      }
    ],
    backend: [
      { 
        icon: RiNodejsLine, 
        name: 'Node.js',
        color: '#339933',
        backgroundColor: 'rgba(51, 153, 51, 0.1)',
        orbitPosition: 0,
        description: 'Building scalable server-side applications with event-driven, non-blocking I/O.',
        skills: ['Express', 'Async Programming', 'Stream Processing', 'Microservices'],
        projects: 3,
        experience: '2 years'
      },
      { 
        icon: SiExpress, 
        name: 'Express',
        color: theme === 'light' ? '#000000' : '#ffffff', // Adapt based on theme
        backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)',
        orbitPosition: 120,
        description: 'Crafting robust, flexible web servers and APIs with minimal overhead.',
        skills: ['Routing', 'Middleware', 'Authentication', 'Error Handling'],
        projects: 3,
        experience: '2 years'
      },
      { 
        icon: SiTypescript, 
        name: 'TypeScript',
        color: '#3178C6',
        backgroundColor: 'rgba(49, 120, 198, 0.1)',
        orbitPosition: 240,
        description: 'Implementing type-safe JavaScript with advanced type inference and compile-time checks.',
        skills: ['Type Definitions', 'Generics', 'Interfaces', 'Advanced Types'],
        projects: 2,
        experience: '2 years'
      }
    ],
    database: [
      { 
        icon: SiMongodb, 
        name: 'MongoDB',
        color: '#47A248',
        backgroundColor: 'rgba(71, 162, 72, 0.1)',
        orbitPosition: 0,
        description: 'Designing flexible, scalable NoSQL database solutions for modern web applications.',
        skills: ['Document Modeling', 'Aggregation', 'Indexing', 'Sharding'],
        projects: 3,
        experience: '2 years'
      },
      { 
        icon: SiRedis, 
        name: 'Redis',
        color: '#DC382D',
        backgroundColor: 'rgba(220, 56, 45, 0.1)',
        orbitPosition: 120,
        description: 'Implementing high-performance caching and real-time data storage strategies.',
        skills: ['Caching', 'Pub/Sub', 'Rate Limiting', 'Session Management'],
        projects: 2,
        experience: '1 year'
      },
      { 
        icon: SiPostgresql, 
        name: 'PostgreSQL',
        color: '#336791',
        backgroundColor: 'rgba(51, 103, 145, 0.1)',
        orbitPosition: 240,
        description: 'Implementing complex relational database solutions with advanced querying capabilities.',
        skills: ['Complex Joins', 'Transactions', 'Stored Procedures', 'Full-Text Search'],
        projects: 2,
        experience: '1 year'
      }
    ],
    ai: [
      { 
        icon: SiPython, 
        name: 'Python',
        color: '#3776AB',
        backgroundColor: 'rgba(55, 118, 171, 0.1)',
        orbitPosition: 0,
        description: 'Developing versatile, powerful applications across data science, web, and machine learning domains.',
        skills: ['Data Analysis', 'Machine Learning', 'Web Development', 'Scripting'],
        projects: 1,
        experience: '1 year'
      },
      { 
        icon: GiArtificialIntelligence, 
        name: 'Machine Learning',
        color: '#FF6F61',
        backgroundColor: 'rgba(255, 111, 97, 0.1)',
        orbitPosition: 120,
        description: 'Designing intelligent systems that learn and adapt using advanced algorithms.',
        skills: ['Deep Learning', 'Neural Networks', 'Model Training', 'Feature Engineering'],
        projects: 1,
        experience: '1 year'
      },
      { 
        icon: SiTensorflow, 
        name: 'TensorFlow',
        color: '#FF6F61',
        backgroundColor: 'rgba(255, 111, 97, 0.1)',
        orbitPosition: 240,
        description: 'Building and deploying machine learning models with advanced frameworks.',
        skills: ['Neural Network Design', 'Model Deployment', 'Transfer Learning', 'Keras Integration'],
        projects: 1,
        experience: '1 year'
      }
    ]
  };

  // Flatten tech data for easy access
  const allTech = [
    ...techData.frontend,
    ...techData.backend,
    ...techData.database,
    ...techData.ai
  ];

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Create a circle of technology icons
  const TechCircle = ({ techs, radius, rotationDuration, clockwise = true }) => {
    return (
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full border border-dashed"
        style={{
          width: radius * 2,
          height: radius * 2,
          marginLeft: -radius,
          marginTop: -radius,
          // Different border colors for light/dark themes
          borderColor: theme === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)'
        }}
        animate={{ rotate: clockwise ? 360 : -360 }}
        transition={{
          duration: rotationDuration,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {techs.map((tech) => {
          // Calculate position on the circle using trigonometry
          const angle = (tech.orbitPosition * Math.PI) / 180;
          
          return (
            <div
              key={tech.name}
              className="absolute"
              style={{
                width: 45,
                height: 45,
                // Position exactly on the circle's edge
                left: `calc(50% - 22.5px + ${radius * Math.cos(angle)}px)`,
                top: `calc(50% - 22.5px + ${radius * Math.sin(angle)}px)`,
                zIndex: 40 // Higher z-index to ensure clickability
              }}
            >
              <motion.div
                className="w-full h-full rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer group"
                style={{
                  backgroundColor: tech.backgroundColor,
                  boxShadow: `0 0 15px ${tech.color}30`
                }}
                whileHover={{ scale: 1.15, boxShadow: `0 0 20px ${tech.color}60` }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTech(tech)}
              >
                <tech.icon
                  className="w-5 h-5"
                  style={{ color: tech.color }}
                />
                
                {/* Tech name tooltip on hover */}
                <div className="absolute opacity-0 group-hover:opacity-100 -bottom-8 whitespace-nowrap bg-gray-900/80 text-white text-xs px-2 py-1 rounded-lg pointer-events-none transition-opacity duration-300 z-50">
                  {tech.name}
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={`py-24 ${themeConfig[theme].primary} transition-colors duration-500 relative overflow-hidden`}>
      <RainBackground />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div className={`text-center mb-16 sm:mb-20 lg:mb-24 ${isMobile ? 'mb-28' : ''}`}>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-departure"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Tech <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Stack</span>
          </motion.h2>
          <motion.div 
            className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4"
            initial={{ width: 0 }}
            animate={{ width: '5rem' }}
            transition={{ delay: 0.3 }}
          />
          <motion.p
            className={`max-w-xl mx-auto ${themeConfig[theme].text} opacity-80`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4 }}
          >
            My toolkit of technologies that I've mastered to build modern, scalable applications.
          </motion.p>
        </motion.div>

        {/* Main content area with side cards and center wheel */}
        <div className={`flex flex-col lg:flex-row gap-6 relative`}>
          {/* Left column - Frontend and Backend on desktop only */}
          <div className={`hidden lg:flex flex-col flex-1 gap-6`}>
            <TechGroup 
              title="Frontend" 
              techs={techData.frontend} 
              color="blue" 
              setSelectedTech={setSelectedTech} 
              theme={theme}
            />
            <TechGroup 
              title="Backend" 
              techs={techData.backend} 
              color="purple" 
              setSelectedTech={setSelectedTech} 
              theme={theme}
            />
          </div>
          
          {/* Center - Orbital visualization */}
          <div className="relative flex-1 flex justify-center items-center" style={{ 
            height: isMobile ? 450 : isTablet ? 480 : 400,
            marginBottom: isMobile ? '6rem' : isTablet ? '3rem' : 0, // Increased from 4rem to 6rem for mobile
            marginTop: isMobile ? '4rem' : 0 // Increased from 2rem to 4rem for mobile
          }}>
         {/* Center point - core */}
<motion.div 
  className="absolute z-30 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
  style={{
    width: isMobile ? 50 : 60,
    height: isMobile ? 50 : 60,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }}
  animate={{ 
    boxShadow: ['0 0 20px #3B82F680', '0 0 30px #8B5CF680', '0 0 20px #EC489980', '0 0 20px #3B82F680'],
  }}
  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
>
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="text-white font-bold text-center w-full px-1"
    style={{ 
      fontSize: isMobile ? '8px' : '10px',
      lineHeight: isMobile ? '10px' : '12px'
    }}
  >
    Full Stack
    <br />
    Developer
  </motion.div>
</motion.div>
            
            {/* Technology circles - each circle rotates as a whole */}
            <TechCircle 
              techs={techData.ai} 
              radius={isMobile ? 70 : isTablet ? 75 : 80} 
              rotationDuration={40} 
              clockwise={true} 
            />
            <TechCircle 
              techs={techData.database} 
              radius={isMobile ? 105 : isTablet ? 112 : 120} 
              rotationDuration={60} 
              clockwise={false} 
            />
            <TechCircle 
              techs={techData.backend} 
              radius={isMobile ? 140 : isTablet ? 149 : 160} 
              rotationDuration={80} 
              clockwise={true} 
            />
            <TechCircle 
              techs={techData.frontend} 
              radius={isMobile ? 175 : isTablet ? 186 : 200} 
              rotationDuration={100} 
              clockwise={false} 
            />
          </div>
          
          {/* Right column - Database and ML on desktop only */}
          <div className={`hidden lg:flex flex-col flex-1 gap-6`}>
            <TechGroup 
              title="Database" 
              techs={techData.database} 
              color="pink" 
              setSelectedTech={setSelectedTech} 
              theme={theme}
            />
            <TechGroup 
              title="AI & ML" 
              techs={techData.ai} 
              color="orange" 
              setSelectedTech={setSelectedTech} 
              theme={theme}
            />
          </div>
        </div>

        {/* Mobile and tablet cards - shown below the wheel */}
        <div className={`lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mt-24`}> {/* Increased from mt-12 to mt-20 */}
          <TechGroup 
            title="Frontend" 
            techs={techData.frontend} 
            color="blue" 
            setSelectedTech={setSelectedTech} 
            theme={theme}
          />
          <TechGroup 
            title="Backend" 
            techs={techData.backend} 
            color="purple" 
            setSelectedTech={setSelectedTech} 
            theme={theme}
          />
          <TechGroup 
            title="Database" 
            techs={techData.database} 
            color="pink" 
            setSelectedTech={setSelectedTech} 
            theme={theme}
          />
          <TechGroup 
            title="AI & ML" 
            techs={techData.ai} 
            color="orange" 
            setSelectedTech={setSelectedTech} 
            theme={theme}
          />
        </div>

        {/* Tech Details Modal */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              onClick={() => setSelectedTech(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`w-full max-w-2xl ${themeConfig[theme].accent} rounded-2xl p-6 md:p-8 relative overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal background effects */}
                <div 
                  className="absolute inset-0 opacity-20" 
                  style={{ 
                    background: `radial-gradient(circle at 30% 30%, ${selectedTech.color}50, transparent 70%)` 
                  }}
                />
                
                {/* Close button */}
                <button
                  onClick={() => setSelectedTech(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Tech content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div 
                      className="rounded-xl p-4 mr-4 md:mr-6"
                      style={{ backgroundColor: selectedTech.backgroundColor }}
                    >
                      <selectedTech.icon 
                        className="w-12 h-12 md:w-16 md:h-16"
                        style={{ color: selectedTech.color }}
                      />
                    </div>
                    <div>
                      <h3 className={`text-2xl md:text-3xl font-bold ${themeConfig[theme].text}`}>
                        {selectedTech.name}
                      </h3>
                      <p className={`${themeConfig[theme].text} opacity-80 text-sm md:text-base`}>
                        {selectedTech.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                    <div>
                      <h4 className={`text-lg md:text-xl font-semibold mb-4 ${themeConfig[theme].text}`}>
                        Key Skills
                      </h4>
                      <ul className="space-y-2">
                        {selectedTech.skills.map((skill, index) => (
                          <motion.li 
                            key={skill}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center ${themeConfig[theme].text} opacity-80`}
                          >
                            <div 
                              className="w-2 h-2 mr-2 rounded-full" 
                              style={{ backgroundColor: selectedTech.color }}
                            />
                            {skill}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className={`text-lg md:text-xl font-semibold mb-4 ${themeConfig[theme].text}`}>
                        Experience
                      </h4>
                      
                      {/* Experience stats */}
                      <div className="space-y-5">
                        {/* Years */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className={`text-sm ${themeConfig[theme].text} opacity-70`}>Years</span>
                            <span className={`text-sm font-medium ${themeConfig[theme].text}`}>{selectedTech.experience}</span>
                          </div>
                          <div className="w-full bg-gray-200/20 rounded-full h-2">
                            <motion.div 
                              className="h-full rounded-full"
                              style={{ backgroundColor: selectedTech.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${parseInt(selectedTech.experience) * 25}%` }}
                              transition={{ duration: 0.8, type: 'spring' }}
                            />
                          </div>
                        </div>
                        
                        {/* Projects */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className={`text-sm ${themeConfig[theme].text} opacity-70`}>Projects</span>
                            <span className={`text-sm font-medium ${themeConfig[theme].text}`}>{selectedTech.projects}</span>
                          </div>
                          <div className="w-full bg-gray-200/20 rounded-full h-2">
                            <motion.div 
                              className="h-full rounded-full"
                              style={{ backgroundColor: selectedTech.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${selectedTech.projects * 20}%` }}
                              transition={{ duration: 0.8, type: 'spring' }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: selectedTech.backgroundColor }}>
                        <p className={`${themeConfig[theme].text} text-sm`}>
                          I've been working with {selectedTech.name} for {selectedTech.experience}, 
                          using it in {selectedTech.projects} professional projects.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Tech Group component for category display
const TechGroup = ({ title, techs, color, setSelectedTech, theme }) => {
  const gradients = {
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-violet-500",
    pink: "from-pink-500 to-rose-500",
    orange: "from-orange-500 to-amber-500"
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${themeConfig[theme].accent} p-6 rounded-xl backdrop-blur-xl relative overflow-hidden`}
    >
      {/* Header with gradient */}
      <div className="relative mb-4">
        <h3 className={`text-xl font-bold ${themeConfig[theme].text} mb-1`}>{title}</h3>
        <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${gradients[color]}`} />
      </div>
      
      {/* Tech list */}
      <div className="space-y-3">
        {techs.map((tech) => (
          <motion.div
            key={tech.name}
            whileHover={{ x: 5 }}
            className="flex items-center cursor-pointer group"
            onClick={() => setSelectedTech(tech)}
          >
            <div 
              className="p-2 rounded-lg mr-3 flex-shrink-0"
              style={{ 
                backgroundColor: tech.backgroundColor,
              }}
            >
              <tech.icon style={{ 
                color: tech.color 
              }} className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <div className={`font-medium ${themeConfig[theme].text} group-hover:text-blue-500 transition-colors`}>
                {tech.name}
              </div>
              <div className={`text-xs ${themeConfig[theme].text} opacity-70 line-clamp-1`}>
                {tech.experience} experience
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Technologies;