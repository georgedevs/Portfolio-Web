"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme, themeConfig } from "../context/ThemeContext"
import { Code, Rocket, Terminal, Box, Brain, Heart, LucideCode, Sparkles, Zap, Cpu } from "lucide-react"

const EnhancedLoader = ({ onComplete }) => {
  const { theme } = useTheme()
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [blobs, setBlobs] = useState([])
  const [factIndex, setFactIndex] = useState(0)
  const [showLoader, setShowLoader] = useState(true)

  // Maximum loading time in milliseconds 
  const MAX_LOADING_TIME = 8000
  const LOADING_INCREMENT = 1.2 

  // Skills to display during loading
  const skills = [
    { name: "React", icon: Code, color: "#61DAFB" },
    { name: "Node.js", icon: Terminal, color: "#339933" },
    { name: "TypeScript", icon: LucideCode, color: "#3178C6" },
    { name: "MongoDB", icon: Box, color: "#47A248" },
    { name: "UI/UX", icon: Heart, color: "#FF6B6B" },
    { name: "AI", icon: Brain, color: "#9C27B0" },
  ]

  // Fun facts to cycle through during loading 
  const funFacts = [
    "I spend 10+ hours coding everyday",
    "My first line of code was in Python",
    "I contribute to open-source projects",
    "My favorite theme is 'Tokyo Night'",
  ]

  const phases = [
    { icon: Terminal, text: "Initializing", description: "Setting up environment" },
    { icon: Cpu, text: "Processing", description: "Optimizing components" },
    { icon: Sparkles, text: "Polishing", description: "Enhancing visuals" },
    { icon: Rocket, text: "Launching", description: "Ready for takeoff" },
  ]

  // Force complete loading after maximum time
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (showLoader) {
        setProgress(100)
        setTimeout(() => {
          setShowLoader(false)
          onComplete()
        }, 300)
      }
    }, MAX_LOADING_TIME)

    return () => clearTimeout(timeoutId)
  }, [onComplete, showLoader])

  useEffect(() => {
    // Generate abstract background blobs 
    const newBlobs = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      scale: Math.random() * 0.5 + 0.5,
      x: 20 + Math.random() * 60, 
      y: 20 + Math.random() * 60,
      duration: Math.random() * 5 + 5,
    }))
    setBlobs(newBlobs)

    // Progress animation with more realistic loading
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            setShowLoader(false)
            onComplete()
          }, 300)
          return 100
        }
        // Progress increases more at the beginning, slows in the middle, then speeds up at the end
        const increment =
          prev < 30 ? LOADING_INCREMENT * 1.2 : prev > 80 ? LOADING_INCREMENT * 1.5 : LOADING_INCREMENT * 0.8
        return Math.min(100, prev + increment)
      })
    }, 25)

    // Phase animation
    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length)
    }, 2000) 

    // Fun facts rotation
    const factInterval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length)
    }, 3000) // Slower fact rotation

    return () => {
      clearInterval(progressInterval)
      clearInterval(phaseInterval)
      clearInterval(factInterval)
    }
  }, [onComplete])

  const CurrentIcon = phases[currentPhase].icon

  // Format progress to show decimal for more movement
  const formattedProgress = Math.min(100, Math.floor(progress * 10) / 10).toFixed(1)

  // Skip loader if it's already completed
  if (!showLoader) return null

  // Determine text color based on theme
  const textColor = theme === "light" ? "text-gray-800" : "text-white"
  const textColorMuted = theme === "light" ? "text-gray-600" : "text-white/70"
  const iconColor = theme === "light" ? "text-gray-800" : "text-white"
  const progressTrackColor = theme === "light" ? "bg-gray-300/50" : "bg-gray-700/30"
  const skillBgColor = theme === "light" ? "bg-gray-200/80" : "bg-white/10"
  const cardBgColor = theme === "light" ? "bg-white/40" : "bg-black/20"

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className={`fixed inset-0 ${themeConfig[theme].primary} flex flex-col items-center justify-center z-50 overflow-hidden`}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-live="polite"
          aria-busy="true"
          role="progressbar"
          aria-valuenow={Math.floor(progress)}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {/* Abstract animated background  */}
          {blobs.map((blob) => (
            <motion.div
              key={blob.id}
              className={`absolute rounded-full blur-3xl ${theme === "light" ? "bg-gradient-to-r from-blue-300/20 via-purple-300/20 to-pink-300/20" : "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"}`}
              style={{
                width: "40vw",
                height: "40vw",
                left: `${blob.x}%`,
                top: `${blob.y}%`,
                scale: blob.scale,
                willChange: "transform",
              }}
              animate={{
                x: [-20, 20, -20],
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: blob.duration * 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}

          <motion.div
            className={`relative z-10 ${cardBgColor} backdrop-blur-xl p-8 rounded-2xl shadow-lg max-w-md mx-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              {/* Main loading interface - improved layout */}
              <div className="relative flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhase}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200, 
                      damping: 25, 
                    }}
                    className="relative flex justify-center"
                  >
                    <motion.div
                      className={`p-6 rounded-full ${theme === "light" ? "bg-white/80" : "bg-gray-800/80"} shadow-md relative overflow-hidden`}
                      style={{ willChange: "transform" }}
                    >
                      <CurrentIcon className={`w-12 h-12 ${iconColor} relative z-10`} />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Loading text and progress  */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7 }} 
                    className="text-center space-y-1"
                  >
                    <motion.h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                      {phases[currentPhase].text}
                    </motion.h2>
                    <p className={`text-sm ${textColorMuted}`}>{phases[currentPhase].description}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Fun fact display */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={factIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 text-center"
                  >
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <p className={`text-sm italic ${textColorMuted}`}>{funFacts[factIndex]}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Progress indicators */}
                <div className="space-y-4">
                  {/* progress bar */}
                  <div className="relative">
                    <div className={`h-2 w-full ${progressTrackColor} rounded-full overflow-hidden`}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          width: `${progress}%`,
                          background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)",
                          willChange: "transform",
                        }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>

                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-xs ${textColorMuted}`}>Loading portfolio...</span>
                      <span className={`text-xs font-medium ${textColor}`}>{formattedProgress}%</span>
                    </div>
                  </div>

                  {/* Skills showcase */}
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: progress > (index + 1) * 12 ? 1 : 0,
                          scale: progress > (index + 1) * 12 ? 1 : 0,
                        }}
                        className="flex flex-col items-center"
                      >
                        <div className={`p-2 rounded-full ${skillBgColor} shadow-sm`}>
                          <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
                        </div>
                        <span className={`text-xs mt-1 ${textColor}`}>{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Skip button */}
                <motion.button
                  onClick={() => {
                    setProgress(100)
                    setTimeout(() => {
                      setShowLoader(false)
                      onComplete()
                    }, 300)
                  }}
                  className={`text-sm ${textColorMuted} hover:${textColor} transition-colors mt-4 py-1 px-4 rounded-full border border-transparent hover:border-current`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Skip intro
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EnhancedLoader
