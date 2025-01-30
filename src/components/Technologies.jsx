import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { 
  RiReactjsLine, 
  RiNodejsLine
} from 'react-icons/ri';
import {
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiRedis,
  SiNextdotjs,
  SiPostgresql,
  SiPytorch,
  SiTensorflow,
  SiPython
} from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';

const Technologies = () => {
  const { theme } = useTheme();
  const [selectedTech, setSelectedTech] = useState(null);

  const technologies = [
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
    },
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
    },
    { 
      icon: SiPostgresql, 
      name: 'PostgreSQL',
      color: '#336791',
      description: 'Implementing complex relational database solutions with advanced querying capabilities.',
      skills: ['Complex Joins', 'Transactions', 'Stored Procedures', 'Full-Text Search']
    },
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
      description: 'Designing intelligent systems that learn and adapt using advanced algorithms and data-driven insights.',
      skills: ['Deep Learning', 'Neural Networks', 'Model Training', 'Feature Engineering']
    },
    { 
      icon: SiTensorflow, 
      name: 'TensorFlow',
      color: '#FF6F61',
      description: 'Building and deploying machine learning models with Googles open-source deep learning framework.',
      skills: ['Neural Network Design', 'Model Deployment', 'Transfer Learning', 'Keras Integration']
    },
    { 
      icon: SiPytorch, 
      name: 'PyTorch',
      color: '#EE4C2C',
      description: 'Creating dynamic neural networks with Facebooks flexible deep learning research platform.',
      skills: ['Dynamic Computation Graphs', 'Research Prototyping', 'GPU Acceleration', 'Model Optimization']
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className={`py-20 ${themeConfig[theme].primary} transition-colors duration-500 relative overflow-hidden`}>
      {/* Subtle Background Animation */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(59,130,246,0.1), transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(236,72,153,0.1), transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(59,130,246,0.1), transparent 50%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-departure">
            Tech <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Arsenal</span>
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </motion.div>

        {/* Tech Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative"
          variants={containerVariants}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className={`p-6 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg relative overflow-hidden group cursor-pointer`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(59,130,246,0.3), transparent)',
                    'linear-gradient(225deg, rgba(236,72,153,0.3), transparent)',
                    'linear-gradient(45deg, rgba(59,130,246,0.3), transparent)'
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="mb-4 flex justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <tech.icon 
                    className={`w-12 h-12 ${themeConfig[theme].text} transition-all duration-300 
                      group-hover:scale-125 group-hover:rotate-12`}
                    style={{ color: tech.color }}
                  />
                </motion.div>
                <h3 className={`text-lg font-semibold text-center mb-2 ${themeConfig[theme].text}`}>
                  {tech.name}
                </h3>
                <p className={`text-sm text-center ${themeConfig[theme].text} opacity-80`}>
                  {tech.description.split(' ').slice(0, 10).join(' ')}...
                </p>
              </div>

              {/* Hover effect circle */}
              <motion.div
                className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-30"
                style={{ background: tech.color }}
                initial={false}
                animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Tech Modal */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
              onClick={() => setSelectedTech(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`w-full max-w-2xl ${themeConfig[theme].accent} rounded-2xl p-8 relative`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center mb-6">
                  <selectedTech.icon 
                    className={`w-16 h-16 mr-6`}
                    style={{ color: selectedTech.color }}
                  />
                  <div>
                    <h3 className={`text-3xl font-bold ${themeConfig[theme].text}`}>
                      {selectedTech.name}
                    </h3>
                    <p className={`${themeConfig[theme].text} opacity-80`}>
                      {selectedTech.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className={`text-xl font-semibold mb-4 ${themeConfig[theme].text}`}>
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
                    <h4 className={`text-xl font-semibold mb-4 ${themeConfig[theme].text}`}>
                      Expertise Level
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <motion.div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: '85%', 
                          backgroundColor: selectedTech.color 
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 0.8, type: 'spring' }}
                      />
                    </div>
                    <p className={`mt-2 ${themeConfig[theme].text} opacity-80`}>
                      Advanced Proficiency
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute top-4 right-4 p-2 rounded-full ${themeConfig[theme].buttonOutline}`}
                  onClick={() => setSelectedTech(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Technologies;