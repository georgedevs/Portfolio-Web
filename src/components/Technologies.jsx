import React from 'react';
import { motion } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { 
  RiReactjsLine, 
  RiNodejsLine,
  RiGatsbyLine
} from 'react-icons/ri';
import {
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiRedis,
  SiNextdotjs
} from 'react-icons/si';

const Technologies = () => {
  const { theme } = useTheme();

  const technologies = [
    { 
      icon: RiReactjsLine, 
      name: 'React',
      color: '#61DAFB',
      description: 'Building interactive UIs'
    },
    { 
      icon: SiNextdotjs, 
      name: 'Next.js',
      color: '#000000',
      description: 'Full-stack React framework'
    },
    { 
      icon: SiTypescript, 
      name: 'TypeScript',
      color: '#3178C6',
      description: 'Type-safe JavaScript'
    },
    { 
      icon: SiMongodb, 
      name: 'MongoDB',
      color: '#47A248',
      description: 'NoSQL database'
    },
    { 
      icon: SiRedis, 
      name: 'Redis',
      color: '#DC382D',
      description: 'In-memory data store'
    },
    { 
      icon: RiNodejsLine, 
      name: 'Node.js',
      color: '#339933',
      description: 'JavaScript runtime'
    },
    { 
      icon: SiExpress, 
      name: 'Express',
      color: '#000000',
      description: 'Web framework for Node.js'
    },
    { 
      icon: RiGatsbyLine, 
      name: 'Gatsby',
      color: '#663399',
      description: 'Static site generator'
    }
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
    <div className={`py-20 ${themeConfig[theme].primary} transition-colors duration-500`}>
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
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
            Tech <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Stack</span>
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </motion.div>

        {/* Tech Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className={`p-6 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg relative overflow-hidden group`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
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
                    className={`w-12 h-12 ${themeConfig[theme].text}`}
                    style={{ color: tech.color }}
                  />
                </motion.div>
                <h3 className={`text-lg font-semibold text-center mb-2 ${themeConfig[theme].text}`}>
                  {tech.name}
                </h3>
                <p className={`text-sm text-center ${themeConfig[theme].text} opacity-80`}>
                  {tech.description}
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
      </motion.div>
    </div>
  );
};

export default Technologies;