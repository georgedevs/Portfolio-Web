import React from 'react';
import { motion } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { Github, ExternalLink } from 'lucide-react';
import project1 from '../assets/projects/project1.jpg';
import election from '../assets/projects/election.jpg';

const Projects = () => {
  const { theme } = useTheme();

  const projects = [
    {
      title: "E-Voting System",
      description: "A secure electronic voting system built with PHP and MySQL, featuring user authentication, real-time vote counting, and admin dashboard for election management.",
      tags: ["PHP", "MySQL", "Bootstrap", "XAMPP", "HTML", "CSS", "JavaScript"],
      image: election,
      github: "https://github.com/georgedevs/E-Voting-System",
      live: null // No live demo for this project
    },
    {
      title: "Personal Portfolio",
      description: "A modern, responsive portfolio website showcasing my projects and skills. Built with React and featuring smooth animations, dark mode support, and interactive elements.",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      image: "/api/placeholder/600/400",
      github: "", // To be updated
      live: "" // To be updated
    },
    {
      title: "SkillNest",
      description: "A full-stack e-learning platform revolutionizing online education. Features video-based courses, real-time progress tracking, secure payments, and an intuitive user experience.",
      tags: ["Next.js", "Node.js", "TypeScript", "MongoDB", "React", "Express"],
      image: project1,
      github: null, // Private repository
      live: "https://skill-nest-client.vercel.app/"
    }
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
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Projects</span>
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`${themeConfig[theme].accent} rounded-xl overflow-hidden backdrop-blur-lg relative`}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Project Image */}
              <motion.div 
                className="relative aspect-video overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className={`text-xl font-bold ${themeConfig[theme].text}`}>
                  {project.title}
                </h3>
                
                <p className={`${themeConfig[theme].text} opacity-80 text-sm`}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 pt-4">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      className="flex items-center space-x-2 text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      <span className={`${themeConfig[theme].text}`}>Code</span>
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      className="flex items-center space-x-2 text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className={`${themeConfig[theme].text}`}>Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Animated Gradient Border */}
              <motion.div
                className="absolute inset-0 -z-10 opacity-30"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(59,130,246,0.3), transparent)',
                    'linear-gradient(225deg, rgba(236,72,153,0.3), transparent)',
                    'linear-gradient(45deg, rgba(59,130,246,0.3), transparent)'
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;