"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme, themeConfig } from "../context/ThemeContext"
import { X, ChevronRight } from "lucide-react"
import { RiReactjsLine, RiNodejsLine } from "react-icons/ri"
import {
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiRedis,
  SiNextdotjs,
  SiPostgresql,
  SiTensorflow,
  SiPython,
  SiVite,
} from "react-icons/si"
import { GiArtificialIntelligence } from "react-icons/gi"
import { RainBackground } from "./RainBackground"
import demo from '../assets/demo.png'

const Technologies = () => {
  const { theme } = useTheme()
  const [selectedTech, setSelectedTech] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // tech data
  const techData = {
    frontend: [
      {
        icon: RiReactjsLine,
        name: "React",
        color: "#61DAFB",
        backgroundColor: "rgba(97, 218, 251, 0.1)",
        orbitPosition: 0, // 0 degrees (right)
        description: "Building interactive, component-based user interfaces with cutting-edge React architecture.",
        skills: ["Component Design", "Hooks", "State Management", "Performance Optimization"],
        projects: 2,
        experience: "3 years",
      },
      {
        icon: SiNextdotjs,
        name: "Next.js",
        color: theme === "light" ? "#000000" : "#ffffff",
        backgroundColor: theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.15)",
        orbitPosition: 90, // 90 degrees (bottom)
        description: "Leveraging server-side rendering and static site generation for optimal web performance.",
        skills: ["SSR", "Static Generation", "API Routes", "Incremental Static Regeneration"],
        projects: 3,
        experience: "2 years",
      },
      {
        icon: SiVite,
        name: "Vite",
        color: "#646CFF",
        backgroundColor: "rgba(100, 108, 255, 0.1)",
        orbitPosition: 180, // 180 degrees (left)
        description: "Using modern build tools for lightning-fast development and optimized production builds.",
        skills: ["HMR", "ESM", "Plugin System", "Build Optimization"],
        projects: 2,
        experience: "1 year",
      },
      {
        icon: SiTypescript,
        name: "TypeScript",
        color: "#3178C6",
        backgroundColor: "rgba(49, 120, 198, 0.1)",
        orbitPosition: 270, // 270 degrees (top)
        description: "Implementing type-safe JavaScript with advanced type inference and compile-time checks.",
        skills: ["Type Definitions", "Generics", "Interfaces", "Advanced Types"],
        projects: 2,
        experience: "2 years",
      },
    ],
    backend: [
      {
        icon: RiNodejsLine,
        name: "Node.js",
        color: "#339933",
        backgroundColor: "rgba(51, 153, 51, 0.1)",
        orbitPosition: 45, // 45 degrees
        description: "Building scalable server-side applications with event-driven, non-blocking I/O.",
        skills: ["Express", "Async Programming", "Stream Processing", "Microservices"],
        projects: 3,
        experience: "2 years",
      },
      {
        icon: SiExpress,
        name: "Express",
        color: theme === "light" ? "#000000" : "#ffffff",
        backgroundColor: theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.15)",
        orbitPosition: 135, // 135 degrees
        description: "Crafting robust, flexible web servers and APIs with minimal overhead.",
        skills: ["Routing", "Middleware", "Authentication", "Error Handling"],
        projects: 3,
        experience: "2 years",
      },
      {
        icon: SiMongodb,
        name: "MongoDB",
        color: "#47A248",
        backgroundColor: "rgba(71, 162, 72, 0.1)",
        orbitPosition: 225, // 225 degrees
        description: "Designing flexible, scalable NoSQL database solutions for modern web applications.",
        skills: ["Document Modeling", "Aggregation", "Indexing", "Sharding"],
        projects: 3,
        experience: "2 years",
      },
      {
        icon: SiPostgresql,
        name: "PostgreSQL",
        color: "#336791",
        backgroundColor: "rgba(51, 103, 145, 0.1)",
        orbitPosition: 315, // 315 degrees
        description: "Implementing complex relational database solutions with advanced querying capabilities.",
        skills: ["Complex Joins", "Transactions", "Stored Procedures", "Full-Text Search"],
        projects: 2,
        experience: "1 year",
      },
    ],
    specialized: [
      {
        icon: SiPython,
        name: "Python",
        color: "#3776AB",
        backgroundColor: "rgba(55, 118, 171, 0.1)",
        orbitPosition: 22.5, // 22.5 degrees
        description:
          "Developing versatile, powerful applications across data science, web, and machine learning domains.",
        skills: ["Data Analysis", "Machine Learning", "Web Development", "Scripting"],
        projects: 1,
        experience: "1 year",
      },
      {
        icon: GiArtificialIntelligence,
        name: "ML",
        color: "#FF6F61",
        backgroundColor: "rgba(255, 111, 97, 0.1)",
        orbitPosition: 112.5, // 112.5 degrees
        description: "Designing intelligent systems that learn and adapt using advanced algorithms.",
        skills: ["Deep Learning", "Neural Networks", "Model Training", "Feature Engineering"],
        projects: 1,
        experience: "1 year",
      },
      {
        icon: SiRedis,
        name: "Redis",
        color: "#DC382D",
        backgroundColor: "rgba(220, 56, 45, 0.1)",
        orbitPosition: 202.5, // 202.5 degrees
        description: "Implementing high-performance caching and real-time data storage strategies.",
        skills: ["Caching", "Pub/Sub", "Rate Limiting", "Session Management"],
        projects: 2,
        experience: "1 year",
      },
      {
        icon: SiTensorflow,
        name: "TensorFlow",
        color: "#FF6F61",
        backgroundColor: "rgba(255, 111, 97, 0.1)",
        orbitPosition: 292.5, // 292.5 degrees
        description: "Building and deploying machine learning models with advanced frameworks.",
        skills: ["Neural Network Design", "Model Deployment", "Transfer Learning", "Keras Integration"],
        projects: 1,
        experience: "1 year",
      },
    ],
  }

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Improved TechCircle component with enhanced styling and animations
  const TechCircle = ({ techs, radius, rotationDuration, clockwise = true, color, circleIndex }) => {
    // Higher z-index for inner circles to ensure they're always clickable
    const baseZIndex = 1000 - circleIndex * 100 // Inner: 900, Middle: 800, Outer: 700

    return (
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: radius * 2,
          height: radius * 2,
          marginLeft: -radius,
          marginTop: -radius,
          border: `1px dashed ${color}60`,
          boxShadow: `0 0 15px ${color}20, inset 0 0 15px ${color}15`,
          zIndex: baseZIndex - 50,
        }}
        animate={{ rotate: clockwise ? 360 : -360 }}
        transition={{
          duration: rotationDuration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {techs.map((tech) => {
          // Calculate position on the circle using trigonometry
          const angle = (tech.orbitPosition * Math.PI) / 180

          return (
            <div
              key={tech.name}
              className="absolute"
              style={{
                width: 40,
                height: 40,
                left: `calc(50% - 20px + ${radius * Math.cos(angle)}px)`,
                top: `calc(50% - 20px + ${radius * Math.sin(angle)}px)`,
                zIndex: baseZIndex,
                pointerEvents: "auto",
              }}
            >
              <motion.div
                className="w-full h-full rounded-xl flex items-center justify-center cursor-pointer group shadow-lg backdrop-blur-md"
                style={{
                  backgroundColor: tech.backgroundColor,
                  boxShadow: `0 0 15px ${tech.color}30`,
                  border: `1px solid ${tech.color}30`,
                }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: `0 0 20px ${tech.color}60`,
                  backgroundColor: `${tech.backgroundColor.slice(0, -4)}0.2)`,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTech(tech)}
                // Counter-rotate to keep icons upright
                animate={{ rotate: clockwise ? -360 : 360 }}
                transition={{
                  duration: rotationDuration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <tech.icon className="w-5 h-5" style={{ color: tech.color }} />

                {/* tech name tooltip on hover */}
                <div className="absolute opacity-0 group-hover:opacity-100 -bottom-8 whitespace-nowrap bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-lg pointer-events-none transition-opacity duration-200 shadow-lg transform -translate-x-1/2 left-1/2">
                  {tech.name}
                </div>
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    )
  }

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
        <motion.div className={`text-center mb-16 sm:mb-20 lg:mb-24 ${isMobile ? "mb-36" : ""}`}>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-departure"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Tech{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Stack
            </span>
          </motion.h2>
          <motion.div
            className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ delay: 0.3 }}
          />
          <motion.p
            className={`max-w-xl mx-auto ${themeConfig[theme].text} opacity-80`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4 }}
          >
            My toolkit of technologies that I&apos;ve mastered to build modern, scalable applications.
          </motion.p>
        </motion.div>

        {/* Main content area with side cards and center wheel */}
        <div className={`flex flex-col lg:flex-row gap-6 relative`}>
          {/* Left column - Frontend and Backend on desktop */}
          <div className={`hidden lg:flex flex-col flex-1 gap-6`}>
            <TechGroup
              title="Frontend"
              techs={[techData.frontend[0], techData.frontend[1], techData.frontend[2]]} // React, Next.js, Vite
              color="blue"
              setSelectedTech={setSelectedTech}
              theme={theme}
            />
            <TechGroup
              title="Backend"
              techs={[techData.backend[0], techData.backend[1], techData.frontend[3]]} // Node.js, Express, TypeScript
              color="green"
              setSelectedTech={setSelectedTech}
              theme={theme}
            />
          </div>

          {/* Center */}
          <div
            className="relative flex-1 flex justify-center items-center"
            style={{
              height: isMobile ? 400 : isTablet ? 420 : 440,
              marginBottom: isMobile ? "6rem" : isTablet ? "3rem" : 0,
              marginTop: isMobile ? "4rem" : 0,
            }}
          >
            {/* Tech circles in reverse order to ensure inner circles are rendered on top */}
            {/* Outer circle - Frontend tech - lowest z-index */}
            <TechCircle
              techs={techData.frontend}
              radius={isMobile ? 170 : 190}
              rotationDuration={80}
              clockwise={false}
              color="#61DAFB" 
              circleIndex={3} // Lowest priority (lowest z-index)
            />

            {/* Middle circle - Backend tech */}
            <TechCircle
              techs={techData.backend}
              radius={isMobile ? 120 : 140}
              rotationDuration={60}
              clockwise={true}
              color="#339933" 
              circleIndex={2} // Middle priority
            />

            {/* Inner circle highest z-index rendered last */}
            <TechCircle
              techs={techData.specialized}
              radius={isMobile ? 70 : 85}
              rotationDuration={40}
              clockwise={false}
              color="#FF6F61"
              circleIndex={1} // Highest priority (highest z-index)
            />

                  {/* Logo  in center */}
                  <div
              className={`absolute z-[1100] rounded-full flex items-center justify-center overflow-hidden ${themeConfig[theme].accent}`}
              style={{
                width: isMobile ? 100 : 110,
                height: isMobile ? 100 : 110,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 20px rgba(30, 64, 175, 0.25)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
              }}
            >
            

              {/* Logo placeholder */}
              <div className="relative z-20 w-full h-full flex items-center justify-center">
                
               <img 
                src= {demo}
                alt = "Logo Here"
               />
              </div>
            </div>

            {/* Enhanced decorative radial gradient background */}
            <div
              className="absolute top-1/2 left-1/2 rounded-full -z-10"
              style={{
                width: isMobile ? 340 : 380,
                height: isMobile ? 340 : 380,
                marginLeft: isMobile ? -170 : -190,
                marginTop: isMobile ? -170 : -190,
                background:
                  "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(15, 23, 42, 0) 70%)",
              }}
            />

            {/* Enhanced inner glow ring immediately around center */}
            <div
              className="absolute top-1/2 left-1/2 rounded-full z-[1050]"
              style={{
                width: isMobile ? 110 : 120,
                height: isMobile ? 110 : 120,
                marginLeft: isMobile ? -55 : -60,
                marginTop: isMobile ? -55 : -60,
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
                background: "transparent",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                opacity: 0.7,
              }}
            />
          </div>

          {/* Right column - Databases and AI/ML on desktop */}
          <div className={`hidden lg:flex flex-col flex-1 gap-6`}>
            <TechGroup
              title="Databases"
              techs={[techData.backend[2], techData.backend[3], techData.specialized[2]]} // MongoDB, PostgreSQL, Redis
              color="purple"
              setSelectedTech={setSelectedTech}
              theme={theme}
            />
            <TechGroup
              title="AI & ML"
              techs={[techData.specialized[0], techData.specialized[1], techData.specialized[3]]} // Python, ML, TensorFlow
              color="orange"
              setSelectedTech={setSelectedTech}
              theme={theme}
            />
          </div>
        </div>

        {/* Mobile and tablet cards - shown below the wheel */}
        <div className={`lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mt-24`}>
          <TechGroup
            title="Frontend"
            techs={[techData.frontend[0], techData.frontend[1], techData.frontend[2]]} // React, Next.js, Vite
            color="blue"
            setSelectedTech={setSelectedTech}
            theme={theme}
          />
          <TechGroup
            title="Backend"
            techs={[techData.backend[0], techData.backend[1], techData.frontend[3]]} // Node.js, Express, TypeScript
            color="green"
            setSelectedTech={setSelectedTech}
            theme={theme}
          />
          <TechGroup
            title="Databases"
            techs={[techData.backend[2], techData.backend[3], techData.specialized[2]]} // MongoDB, PostgreSQL, Redis
            color="purple"
            setSelectedTech={setSelectedTech}
            theme={theme}
          />
          <TechGroup
            title="AI & ML"
            techs={[techData.specialized[0], techData.specialized[1], techData.specialized[3]]} // Python, ML, TensorFlow
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
              className="fixed inset-0 z-[2000]  flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              onClick={() => setSelectedTech(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`w-full max-w-2xl ${themeConfig[theme].accent} rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-xl`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal background effects */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${selectedTech.color}50, transparent 70%)`,
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
                      <selectedTech.icon className="w-12 h-12 md:w-16 md:h-16" style={{ color: selectedTech.color }} />
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
                      <h4 className={`text-lg md:text-xl font-semibold mb-4 ${themeConfig[theme].text}`}>Key Skills</h4>
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
                      <h4 className={`text-lg md:text-xl font-semibold mb-4 ${themeConfig[theme].text}`}>Experience</h4>

                      {/* Experience stats */}
                      <div className="space-y-5">
                        {/* Years */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className={`text-sm ${themeConfig[theme].text} opacity-70`}>Years</span>
                            <span className={`text-sm font-medium ${themeConfig[theme].text}`}>
                              {selectedTech.experience}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200/20 rounded-full h-2">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: selectedTech.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${Number.parseInt(selectedTech.experience) * 25}%` }}
                              transition={{ duration: 0.8, type: "spring" }}
                            />
                          </div>
                        </div>

                        {/* Projects */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className={`text-sm ${themeConfig[theme].text} opacity-70`}>Projects</span>
                            <span className={`text-sm font-medium ${themeConfig[theme].text}`}>
                              {selectedTech.projects}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200/20 rounded-full h-2">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: selectedTech.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${selectedTech.projects * 20}%` }}
                              transition={{ duration: 0.8, type: "spring" }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: selectedTech.backgroundColor }}>
                        <p className={`${themeConfig[theme].text} text-sm`}>
                          I&apos;ve been working with {selectedTech.name} for {selectedTech.experience}, using it in{" "}
                          {selectedTech.projects} professional projects.
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
  )
}

// Tech Group component for category display
const TechGroup = ({ title, techs, color, setSelectedTech, theme, className = "" }) => {
  const gradients = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-violet-500",
    pink: "from-pink-500 to-rose-500",
    orange: "from-orange-500 to-amber-500",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${themeConfig[theme].accent} p-6 rounded-xl backdrop-blur-xl relative overflow-hidden ${className}`}
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
              <tech.icon
                style={{
                  color: tech.color,
                }}
                className="w-5 h-5"
              />
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
  )
}

export default Technologies
