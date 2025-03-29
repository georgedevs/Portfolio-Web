import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Github, ExternalLink, Eye, Instagram, X, ChevronRight, ChevronLeft } from 'lucide-react';
import project1 from '../assets/projects/project1.png';
import election from '../assets/projects/election.jpg';
import election2 from '../assets/projects/ELECTION 2.PNG';
import election3 from '../assets/projects/ELECTION 3.PNG';
import election4 from '../assets/projects/ELECTION 4.PNG';
import election5 from '../assets/projects/ELECTION 5.PNG';
import election6 from '../assets/projects/ELECTION 6.PNG';
import portfolio from '../assets/projects/portfolio.PNG';
import empire from '../assets/projects/empire.png';
import micounselor from '../assets/projects/micounselor.png';
import project1Mobile from '../assets/projects/project1-mobile.png';
import portfolioMobile from '../assets/projects/portfolio-mobile.png';
import empireMobile from '../assets/projects/empire-mobile.png';
import micounselorMobile from '../assets/projects/micounselor-mobile.png';
import miibaby from '../assets/projects/miibaby.png';
import miibabyMobile from '../assets/projects/miibabyMobile.png';
import spin from '../assets/projects/spin.png';
import spinMobile from '../assets/projects/spinMobile.png';
import projectrix from '../assets/projects/projectrix.png';
import projectrixMobile from '../assets/projects/projectrixMobile.png';
import { useRef } from 'react';
import { RainBackground } from './RainBackground';

const ModernProjects = () => {
  const { theme } = useTheme();
  const [selectedProjectGallery, setSelectedProjectGallery] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const projectsRef = useRef(null)

  //Project pagination
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  

  const filters = ['all', 'fullstack', 'frontend',];

  const projects = [
    {
      title: "Projectrix",
      description: "A comprehensive collaborative development platform that connects developers with meaningful projects and team members. Projectrix leverages AI to generate personalized project ideas based on technology preferences, complexity level, and team size requirements. The platform features a robust collaboration system that manages team formation, role assignments, and project tracking, while integrating with tools like GitHub and Discord. Advanced features include user profiles, real-time notifications, feedback collection, and a complete subscription management system with payment processing via Flutterwave.",
      tags: ["Next.js", "Node.js", "TypeScript", "MongoDB", "Redis", "Express", "Socket.io", "OpenAI", "Firebase Auth", "Tailwind CSS"],
      image: projectrix,
      mobileImage: projectrixMobile,
      github: null,
      live: "https://www.projectrix.app/",
      category: "fullstack",
      number: "01"
    },
    {
      title: "SkillNest",
      description: "An innovative full-stack e-learning platform revolutionizing online education through cutting-edge technology and user-centric design. Built with a large-scale codebase implementing advanced state management techniques, the platform offers video-based courses, real-time progress tracking, secure payment integration, and a seamless, intuitive user experience. The system includes comprehensive admin dashboards, course management tools, and student analytics, designed to bridge the gap between learners and quality educational content across various disciplines.",
      tags: ["Next.js", "Node.js", "TypeScript", "MongoDB", "Redis", "React", "Express", "JWT", "Stripe", "Socket.io"],
      image: project1,
      mobileImage: project1Mobile,
      github: null,
      live: "https://skill-nest-client.vercel.app/",
      category: "fullstack",
      number: "02"
    },

    {
      title: "MiCounselor",
      description: "An innovative anonymous marriage counseling platform that prioritizes user privacy and security while supporting over 500+ users. Built with a comprehensive tech stack, the platform enables users to maintain complete anonymity while connecting with counselors through secure video calls. Features include sophisticated booking systems, real-time communication via Daily.CO API, secure authentication, custom email/SMS notifications, and comprehensive admin dashboards for counselors and administrators, all built with advanced state management for this large-scale codebase.",
      tags: ["Next.js", "Node.js", "TypeScript", "MongoDB", "Redis", "Daily.CO", "Socket.io", "Tailwind CSS", "JWT", "Redux"],
      image: micounselor,
      mobileImage: micounselorMobile,
      github: null,
      live: "https://testing-george.vercel.app/",
      category: "fullstack",
      number: "03"
    },
    {
      title: "Personal Portfolio",
      description: "A sophisticated, responsive personal portfolio website meticulously crafted to showcase professional projects, skills, and creative capabilities. Leveraging modern web technologies, the site features smooth, engaging animations, multiple color mode support, and an intuitive, interactive design that provides a comprehensive overview of professional achievements and technical expertise.",
      tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
      image: portfolio,
      mobileImage: portfolioMobile,
      github: "https://github.com/georgedevs/Portfolio",
      live: "https://ukohgodwingeorge-portfolio.vercel.app/",
      category: "frontend",
      number: "04"
    },
 
    {
      title: "Empire Books Concept Website",
      description: "A modern and responsive website built for Empire Books Concept Ltd., a book publishing company founded in 2024. The project highlights their preschool, pre-primary, and primary textbooks while featuring upcoming publications. Developed using React for dynamic user interfaces and TailwindCSS for elegant, responsive styling, the website combines aesthetic design with seamless functionality.",
      tags: ["React", "Tailwind CSS", "Framer Motion", "Responsive Design"],
      image: empire,
      mobileImage: empireMobile,
      github: "https://github.com/georgedevs/EmpireBooks",
      live: "https://empire-books.vercel.app/",
      category: "frontend",
      number: "05"
    },
    {
      title: "E-Voting System",
      description: "A comprehensive digital voting platform designed to modernize and secure the electoral process. The system provides a user-friendly interface for voters, administrators, and election officials, implementing robust authentication, real-time vote tracking, and transparent result management. Key features include secure login, candidate registration, voting mechanism, and detailed election analytics.",
      tags: ["PHP", "MySQL", "Bootstrap", "XAMPP", "HTML", "CSS", "JavaScript"],
      image: election,
      mobileImage: null,
      github: "https://github.com/georgedevs/E-Voting-System",
      live: null,
      category: "fullstack",
      galleryImages: [
        { original: election, thumbnail: election },
        { original: election2, thumbnail: election2 },
        { original: election3, thumbnail: election3 },
        { original: election4, thumbnail: election4 },
        { original: election5, thumbnail: election5 },
        { original: election6, thumbnail: election6 },
      ],
      instagramPost: 'DCO5boliTIB',
      number: "06"
    },
  
    {
      title: "Spin-The-Wheel Promotion",
      description: "A sophisticated promotional spin-the-wheel application featuring modern animations, responsive UI design, and complex backend logic for prize distribution. The application implements detailed probability calculations for winning, allocations, and spin limits. Developed external APIs for ticket creation and validation that seamlessly integrate with the client's existing website, tracking all activity through a comprehensive admin dashboard. Engineered for high performance, successfully handling 256,000 users with minimal latency while maintaining data integrity across transactions.",
      tags: ["Next.js", "TypeScript", "React", "PostgreSQL", "Prisma", "Supabase", "Framer Motion", "Tailwind CSS", "REST API", "Authentication"],
      image: spin,
      mobileImage: spinMobile,
      github: null,
      live: "https://wheelspin.vercel.app/",
      category: "fullstack",
      number: "07"
    },
    {
      title: "Valentine's Day Experience",
      description: "A charming, interactive Valentine's Day website created for a client, featuring elegant animations and engaging user interactions. The site showcases modern UI design with animated love quotes, floating hearts, and interactive elements that create a memorable user experience. Built with a focus on fluid animations and responsive design, the website provides an immersive digital Valentine's experience with customizable love messages, background music integration, and animated particles for a truly delightful experience.",
      tags: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS", "Animation"],
      image: miibaby,
      mobileImage: miibabyMobile,
      github: null,
      live: "https://miibaby.vercel.app/",
      category: "frontend",
      number: "08"
    },

    
  ];



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

  const openGallery = (projectGallery) => setSelectedProjectGallery(projectGallery);
  const closeGallery = () => setSelectedProjectGallery(null);
  const openInstagramPost = (postId) => setSelectedPost(postId);
  const closeInstagramPost = () => setSelectedPost(null);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  
    // Calculate total pages
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
      
      // Add a small delay to ensure content updates before scrolling
      setTimeout(() => {
        if (projectsRef.current) {
          projectsRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    };
    // Pagination handlers
    const nextPage = () => {
      if (currentPage < totalPages) {
        handlePageChange(currentPage + 1);
      }
    };
  
    const prevPage = () => {
      if (currentPage > 1) {
        handlePageChange(currentPage - 1);
      }
    };
  
    // Reset to first page when filter changes
    useEffect(() => {
      setCurrentPage(1);
    }, [activeFilter]);
  

    const ProjectImage = ({ project, onGalleryOpen, onInstagramOpen }) => {
      const [isMobile, setIsMobile] = useState(false);
    
      useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
      }, []);
    
      if (isMobile && project.mobileImage) {
        return (
          <div className="w-full space-y-8">
            {/* Mobile Mockup Container */}
            <div className="relative w-full flex justify-center">
              <motion.div
                className="relative w-[280px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Phone frame with adjusted height */}
                <div className="relative rounded-[2.5rem] overflow-hidden border-[12px] border-gray-900 shadow-2xl bg-gray-900">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-32 bg-black rounded-b-3xl z-20" />
                  
                  {/* Screen content */}
                  <motion.img 
                    src={project.mobileImage} 
                    alt="Mobile view"
                    className="w-full object-contain rounded-xl"
                  />
                </div>
    
                {/* Floating action buttons */}
                <motion.div
                  className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                  {project.galleryImages && (
                    <motion.button
                      onClick={() => onGalleryOpen(project.galleryImages)}
                      className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                  )}
                </motion.div>
    
                {/* Reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-[2.5rem] pointer-events-none" />
              </motion.div>
            </div>
          </div>
        );
      }
    
      // Desktop view remains unchanged
      return (
        <motion.div 
          className="w-full lg:w-3/5 relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
              <RainBackground/>
          <div className="relative overflow-hidden rounded-2xl aspect-video group">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500"
              whileHover={{ scale: 1.1 }}
            />
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300
                flex items-end justify-center p-8"
            >
              <div className="flex gap-4">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-6 h-6 text-white" />
                  </motion.a>
                )}
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="w-6 h-6 text-white" />
                  </motion.a>
                )}
                {project.galleryImages && (
                  <motion.button
                    onClick={() => onGalleryOpen(project.galleryImages)}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye className="w-6 h-6 text-white" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      );
    };

  return (
    <div className={`py-24 ${themeConfig[theme].primary} transition-colors duration-500 min-h-screen relative overflow-hidden`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-departure">
            Featured <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Projects</span>
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-8" />
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white'
                    : `${themeConfig[theme].accent} hover:bg-blue-500/10`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div ref={projectsRef} className="space-y-32" key={currentPage}>
        {currentProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                offscreen: {
                  y: 100,
                  opacity: 0
                },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    bounce: 0.4,
                    duration: 0.8
                  }
                }
              }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
              className="relative group"
            >
              <div className={`
                ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                flex flex-col lg:flex-row gap-12 items-center relative
              `}>
                <motion.div
                  animate={{
                    scale: hoveredProject === index ? 1.2 : 1,
                    opacity: hoveredProject === index ? 0.15 : 0.1
                  }}
                  className="absolute -top-16 -left-8 text-9xl font-bold z-0 font-departure bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                >
                  {project.number}
                </motion.div>

                <ProjectImage 
  project={project}
  onGalleryOpen={openGallery}
  onInstagramOpen={openInstagramPost}
/>

                <motion.div 
                  className="w-full lg:w-2/5 space-y-6"
                  variants={{
                    hover: { x: index % 2 === 0 ? 20 : -20 }
                  }}
                >
                  <motion.h3 
                    className={`text-3xl font-bold ${themeConfig[theme].text} font-departure`}
                    whileHover={{ x: 10 }}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.div 
                    className={`p-6 rounded-2xl ${themeConfig[theme].accent} backdrop-blur-lg relative overflow-hidden group`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20" />
                    </div>
                    
                    <p className={`${themeConfig[theme].text} opacity-90 relative z-10`}>
                      {project.description}
                    </p>
                  </motion.div>

                  <motion.div 
                    className="flex flex-wrap gap-2"
                    variants={{
                      hover: { y: -5 }
                    }}
                  >
                    {project.tags.map(tag => (
                      <motion.span
                        key={tag}
                        className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-500 backdrop-blur-sm
                          hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
    
                  {index !== filteredProjects.length - 1 && (
                    <div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 w-1/3 h-px overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16 space-x-4">
            <motion.button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-3 rounded-full transition-all duration-300 ${
                currentPage === 1 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'hover:bg-blue-500/10 active:scale-95'
              }`}
              whileHover={{ scale: currentPage !== 1 ? 1.1 : 1 }}
              whileTap={{ scale: currentPage !== 1 ? 0.9 : 1 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, pageIndex) => (
                <motion.button
                  key={pageIndex}
                  onClick={() => handlePageChange(pageIndex + 1)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentPage === pageIndex + 1
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-full transition-all duration-300 ${
                currentPage === totalPages 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'hover:bg-blue-500/10 active:scale-95'
              }`}
              whileHover={{ scale: currentPage !== totalPages ? 1.1 : 1 }}
              whileTap={{ scale: currentPage !== totalPages ? 0.9 : 1 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        )}
          </div>
    
          <AnimatePresence>
            {selectedProjectGallery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 modal-container p-4 backdrop-blur-lg"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-full max-w-4xl relative"
                >
                  <motion.button 
                    onClick={closeGallery}
                    className="absolute -top-12 right-0 text-white flex items-center space-x-2 hover:text-blue-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                    <span>Close</span>
                  </motion.button>
                  <ImageGallery
                    items={selectedProjectGallery}
                    showPlayButton={false}
                    showFullscreenButton={true}
                    showNav={true}
                    useBrowserFullscreen={false}
                    additionalClass="gallery-custom"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
    
          <AnimatePresence>
            {selectedPost && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 modal-container p-4 backdrop-blur-lg"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-full max-w-md relative"
                >
                  <motion.button 
                    onClick={closeInstagramPost}
                    className="absolute -top-12 right-0 text-white flex items-center space-x-2 hover:text-blue-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                    <span>Close</span>
                  </motion.button>
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <iframe 
                      src={`https://www.instagram.com/p/${selectedPost}/embed`}
                      width="100%" 
                      height="500"
                      frameBorder="0"
                      scrolling="no"
                      allowFullScreen={true}
                      className="w-full"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };
    
    export default ModernProjects;