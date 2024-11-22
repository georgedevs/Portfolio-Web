import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { Code, Brain, Rocket, GraduationCap } from 'lucide-react';

const About = () => {
  const { theme } = useTheme();

  const AnimatedSection = ({ children, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.8,
          delay: index * 0.2,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
        className="relative"
      >
        {children}
      </motion.div>
    );
  };
  const SmoothScroll = ({ children }) => {
    const { theme } = useTheme();
    const containerRef = useRef(null);
    const [pageHeight, setPageHeight] = useState(0);
    
    const { scrollY } = useScroll();
    const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight]);
    const physics = { damping: 15, mass: 0.27, stiffness: 55 };
    const spring = useSpring(transform, physics);
  
    useEffect(() => {
      setPageHeight(containerRef.current?.scrollHeight || 0);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden">
          <motion.div
            ref={containerRef}
            style={{ y: spring }}
            className="w-full"
          >
            {children}
          </motion.div>
        </div>
      );
    };
  

  const skills = [
    { icon: Code, label: 'Full Stack Development', description: 'Proficient in both frontend and backend technologies' },
    { icon: Brain, label: 'Problem Solving', description: 'Analytical approach to complex challenges' },
    { icon: Rocket, label: 'Innovation', description: 'Pushing boundaries with creative solutions' },
    { icon: GraduationCap, label: 'Continuous Learning', description: 'Always expanding knowledge and skills' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div className={`py-20 ${themeConfig[theme].primary} transition-colors duration-500 min-h-screen`}>
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Me</span>
          </h2>
          <div className={`h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500`} />
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
        >
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <motion.div
              className={`p-6 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg relative overflow-hidden`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
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
              <p className={`text-lg relative z-10 ${themeConfig[theme].text}`}>
                I'm a passionate Full Stack Developer with a keen eye for creating elegant solutions 
                to complex problems. My journey in technology has been driven by curiosity and a 
                desire to build meaningful applications that make a difference.
              </p>
            </motion.div>

            <motion.div
              className={`p-6 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg relative overflow-hidden`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'linear-gradient(225deg, rgba(236,72,153,0.3), transparent)',
                    'linear-gradient(45deg, rgba(59,130,246,0.3), transparent)',
                    'linear-gradient(225deg, rgba(236,72,153,0.3), transparent)'
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              <p className={`text-lg relative z-10 ${themeConfig[theme].text}`}>
                With experience in both frontend and backend development, I specialize in 
                creating scalable web applications using modern technologies. I'm always 
                eager to learn new skills and stay up-to-date with the latest industry trends.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.label}
                className={`p-6 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <motion.div
                  className="mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <skill.icon className={`w-8 h-8 ${themeConfig[theme].text}`} />
                </motion.div>
                <h3 className={`text-lg font-semibold mb-2 ${themeConfig[theme].text}`}>
                  {skill.label}
                </h3>
                <p className={`text-sm ${themeConfig[theme].text} opacity-80`}>
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;