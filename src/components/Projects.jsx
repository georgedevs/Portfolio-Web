import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Github, ExternalLink, Eye, Instagram, X } from 'lucide-react';
import project1 from '../assets/projects/project1.jpg';
import election from '../assets/projects/election.jpg';
import election2 from '../assets/projects/ELECTION 2.PNG';
import election3 from '../assets/projects/ELECTION 3.PNG';
import election4 from '../assets/projects/ELECTION 4.PNG';
import election5 from '../assets/projects/ELECTION 5.PNG';
import election6 from '../assets/projects/ELECTION 6.PNG';
import portfolio from '../assets/projects/portfolio.PNG';
import empirebooks from '../assets/projects/empirebooks.png'

const Projects = () => {
  const [selectedProjectGallery, setSelectedProjectGallery] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const { theme } = useTheme();

  const projects = [
    {
      title: "E-Voting System",
      description: "A comprehensive digital voting platform designed to modernize and secure the electoral process. The system provides a user-friendly interface for voters, administrators, and election officials, implementing robust authentication, real-time vote tracking, and transparent result management. Key features include secure login, candidate registration, voting mechanism, and detailed election analytics.",
      tags: ["PHP", "MySQL", "Bootstrap", "XAMPP", "HTML", "CSS", "JavaScript"],
      image: election,
      github: "https://github.com/georgedevs/E-Voting-System",
      live: null,
      galleryImages: [
        { original: election, thumbnail: election },
        { original: election2, thumbnail: election2 },
        { original: election3, thumbnail: election3 },
        { original: election4, thumbnail: election4 },
        { original: election5, thumbnail: election5 },
        { original: election6, thumbnail: election6 },
      ],
      instagramPost: 'DCO5boliTIB'
    },
    {
      title: "Personal Portfolio",
      description: "A sophisticated, responsive personal portfolio website meticulously crafted to showcase professional projects, skills, and creative capabilities. Leveraging modern web technologies, the site features smooth, engaging animations, multiple color mode support, and an intuitive, interactive design that provides a comprehensive overview of professional achievements and technical expertise.",
      tags: ["React", "Vite","Tailwind CSS", "Framer Motion"],
      image: portfolio,
      github: "https://github.com/georgedevs/Portfolio", 
      live: "https://ukohgodwingeorge-portfolio.vercel.app/",
    },
    {
      title: "SkillNest",
      description: "An innovative full-stack e-learning platform revolutionizing online education through cutting-edge technology and user-centric design. The platform offers video-based courses, real-time progress tracking, secure payment integration, and a seamless, intuitive user experience. Designed to bridge the gap between learners and quality educational content across various disciplines.",
      tags: ["Next.js", "Node.js", "TypeScript", "MongoDB", "React", "Express"],
      image: project1,
      github: null,
      live: "https://skill-nest-client.vercel.app/"
    },
    {
      title: "Empire Books Concept Website",
      description: "A modern and responsive website built for Empire Books Concept Ltd., a book publishing company founded in 2024. The project highlights their preschool, pre-primary, and primary textbooks while featuring upcoming publications. Developed using React for dynamic user interfaces and TailwindCSS for elegant, responsive styling, the website combines aesthetic design with seamless functionality, delivering an engaging and user-friendly experience.",
      tags: ["React", "Tailwind CSS", "Framer Motion", "Responsive Design"],
      image: empirebooks,
      github: "https://github.com/georgedevs/EmpireBooks",
      live: "https://empire-books.vercel.app/"
    },
  ];

  const openGallery = (projectGallery) => {
    setSelectedProjectGallery(projectGallery);
  };

  const closeGallery = () => {
    setSelectedProjectGallery(null);
  };

  const openInstagramPost = (postId) => {
    setSelectedPost(postId);
  };

  const closeInstagramPost = () => {
    setSelectedPost(null);
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        closeGallery();
        closeInstagramPost();
      }
    };

    const handleOutsideClick = (e) => {
      const modalContainers = document.querySelectorAll('.modal-container');
      modalContainers.forEach((container) => {
        if (e.target === container) {
          closeGallery();
          closeInstagramPost();
        }
      });
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-departure">
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
                    target="_blank"
                    rel="noopener noreferrer"
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className={`${themeConfig[theme].text}`}>Live Demo</span>
                    </motion.a>
                  )}
                  {project.instagramPost && (
                    <motion.button
                      onClick={() => openInstagramPost(project.instagramPost)}
                      className="flex items-center space-x-2 text-sm font-medium"
                    >
                      <Instagram  className="w-4 h-4" />
                      <span>View Project Post</span>
                    </motion.button>
                  )}
                   {project.live === null && (
                    <motion.button
                      onClick={() => openGallery(project.galleryImages)}
                      className="flex items-center space-x-2 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Project Images</span>
                    </motion.button>
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

      {/* Image Gallery Modal */}
      {selectedProjectGallery && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 modal-container p-4"
        >
          <div className="w-full max-w-4xl relative">
            <button 
              onClick={closeGallery} 
              className="absolute -top-8 right-0 text-white flex items-center"
            >
              <X className="w-6 h-6 mr-2" /> Close
            </button>
            <ImageGallery 
              items={selectedProjectGallery} 
              showPlayButton={false}
            />
          </div>
        </div>
      )}

      {/* Instagram Post Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 modal-container p-4"
        >
          <div className="w-full max-w-md relative">
            <button 
              onClick={closeInstagramPost} 
              className="absolute -top-8 right-0 text-white flex items-center"
            >
              <X className="w-6 h-6 mr-2" /> Close
            </button>
            <iframe 
              src={`https://www.instagram.com/p/${selectedPost}/embed`}
              width="100%" 
              height="500"
              frameBorder="0"
              scrolling="no"
              allowFullScreen={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
