import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { RiReactjsLine, RiNodejsLine } from 'react-icons/ri';
import {
  SiTypescript, SiMongodb, SiExpress, SiRedis, SiNextdotjs,
  SiPostgresql, SiPytorch, SiTensorflow, SiPython
} from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';

const Technologies = () => {
  const { theme } = useTheme();
  const [selectedTech, setSelectedTech] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('frontend');
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Organize technologies by category
  const techCategories = {
    frontend: [
      { 
        icon: RiReactjsLine, 
        name: 'React',
        color: '#61DAFB',
        description: 'Building interactive, component-based user interfaces with cutting-edge React architecture.',
        skills: ['Component Design', 'Hooks', 'State Management', 'Performance Optimization']
      },
      { 
        icon: SiNextdotjs, 
        name: 'Next.js',
        color: '#000000',
        description: 'Leveraging server-side rendering and static site generation for optimal web performance.',
        skills: ['SSR', 'Static Generation', 'API Routes', 'Incremental Static Regeneration']
      },
      { 
        icon: SiTypescript, 
        name: 'TypeScript',
        color: '#3178C6',
        description: 'Implementing type-safe JavaScript with advanced type inference and compile-time checks.',
        skills: ['Type Definitions', 'Generics', 'Interfaces', 'Advanced Types']
      }
    ],
    backend: [
      { 
        icon: RiNodejsLine, 
        name: 'Node.js',
        color: '#339933',
        description: 'Building scalable server-side applications with event-driven, non-blocking I/O.',
        skills: ['Express', 'Async Programming', 'Stream Processing', 'Microservices']
      },
      { 
        icon: SiExpress, 
        name: 'Express',
        color: '#000000',
        description: 'Crafting robust, flexible web servers and APIs with minimal overhead.',
        skills: ['Routing', 'Middleware', 'Authentication', 'Error Handling']
      }
    ],
    database: [
      { 
        icon: SiMongodb, 
        name: 'MongoDB',
        color: '#47A248',
        description: 'Designing flexible, scalable NoSQL database solutions for modern web applications.',
        skills: ['Document Modeling', 'Aggregation', 'Indexing', 'Sharding']
      },
      { 
        icon: SiRedis, 
        name: 'Redis',
        color: '#DC382D',
        description: 'Implementing high-performance caching and real-time data storage strategies.',
        skills: ['Caching', 'Pub/Sub', 'Rate Limiting', 'Session Management']
      },
      { 
        icon: SiPostgresql, 
        name: 'PostgreSQL',
        color: '#336791',
        description: 'Implementing complex relational database solutions with advanced querying capabilities.',
        skills: ['Complex Joins', 'Transactions', 'Stored Procedures', 'Full-Text Search']
      }
    ],
    ai: [
      { 
        icon: SiPython, 
        name: 'Python',
        color: '#3776AB',
        description: 'Developing versatile, powerful applications across data science, web, and machine learning domains.',
        skills: ['Data Analysis', 'Machine Learning', 'Web Development', 'Scripting']
      },
      { 
        icon: GiArtificialIntelligence, 
        name: 'Machine Learning',
        color: '#FF6F61',
        description: 'Designing intelligent systems that learn and adapt using advanced algorithms.',
        skills: ['Deep Learning', 'Neural Networks', 'Model Training', 'Feature Engineering']
      },
      { 
        icon: SiTensorflow, 
        name: 'TensorFlow',
        color: '#FF6F61',
        description: 'Building and deploying machine learning models with advanced frameworks.',
        skills: ['Neural Network Design', 'Model Deployment', 'Transfer Learning', 'Keras Integration']
      }
    ]
  };

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < techCategories[currentCategory].length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }

    setTouchEnd(null);
    setTouchStart(null);
  };

  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    ai: 'AI & ML'
  };

  return (
    <div className={`py-20 ${themeConfig[theme].primary} transition-colors duration-500 relative overflow-hidden`}>
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-departure">
            Tech <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Arsenal</span>
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </motion.div>

        {/* Category Selection */}
        <div className="flex overflow-x-auto no-scrollbar space-x-2 md:space-x-4 mb-8 pb-4">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <motion.button
              key={key}
              onClick={() => {
                setCurrentCategory(key);
                setCurrentSlide(0);
              }}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                currentCategory === key
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white'
                  : `${themeConfig[theme].accent} hover:bg-blue-500/10`
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* Mobile Slider */}
        {isMobile && (
          <div className="relative">
            <div
              ref={sliderRef}
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                className="flex"
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {techCategories[currentCategory].map((tech, index) => (
                  <div key={tech.name} className="w-full flex-shrink-0 px-4">
                    <motion.div
                      className={`p-6 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg relative overflow-hidden`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedTech(tech)}
                    >
                      <div className="flex flex-col items-center text-center">
                        <tech.icon className="w-16 h-16 mb-4" style={{ color: tech.color }} />
                        <h3 className={`text-xl font-bold ${themeConfig[theme].text} mb-2`}>{tech.name}</h3>
                        <p className={`${themeConfig[theme].text} opacity-80 text-sm`}>{tech.description}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Slider Controls */}
            <div className="flex justify-center mt-6 space-x-2">
              {techCategories[currentCategory].map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index
                      ? 'bg-blue-500 w-4'
                      : 'bg-gray-400'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Desktop Grid */}
        {!isMobile && (
          <motion.div 
            className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {techCategories[currentCategory].map((tech) => (
              <motion.div
                key={tech.name}
                className={`p-6 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg relative overflow-hidden cursor-pointer`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedTech(tech)}
              >
                <div className="flex flex-col items-center text-center">
                  <tech.icon className="w-16 h-16 mb-4" style={{ color: tech.color }} />
                  <h3 className={`text-xl font-bold ${themeConfig[theme].text} mb-2`}>{tech.name}</h3>
                  <p className={`${themeConfig[theme].text} opacity-80`}>{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

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
                className={`w-full max-w-2xl ${themeConfig[theme].accent} rounded-2xl p-6 md:p-8 relative`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedTech(null)}
                  className="absolute top-4 right-4 p-2"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex items-center mb-6">
                  <selectedTech.icon 
                    className="w-12 h-12 md:w-16 md:h-16 mr-4 md:mr-6"
                    style={{ color: selectedTech.color }}
                  />
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
                      Proficiency
                    </h4>
                    <div className="space-y-4">
                      <div className="w-full bg-gray-200/20 rounded-full h-2">
                        <motion.div 
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedTech.color }}
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ duration: 0.8, type: 'spring' }}
                        />
                      </div>
                      <p className={`${themeConfig[theme].text} opacity-80 text-sm md:text-base`}>
                        Advanced Proficiency
                      </p>
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

export default Technologies;