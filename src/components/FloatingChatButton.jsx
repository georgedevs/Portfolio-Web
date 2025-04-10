"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
import { Bot, Sparkles } from "lucide-react"

const FloatingChatButton = ({ openChat }) => {
  const { theme } = useTheme()
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasBeenSeen, setHasBeenSeen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Show the button after a delay to give users time to see the main content first
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)

      // After showing button, show tooltip briefly
      setTimeout(() => {
        setShowTooltip(true)

        // Hide tooltip after 5 seconds
        setTimeout(() => {
          setShowTooltip(false)
          setHasBeenSeen(true)
        }, 5000)
      }, 1000)
    }, 3000) // 3 seconds after page load

    return () => clearTimeout(timer)
  }, [])

  // Generate particles for special effects
  const generateParticles = (count = 5) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 40 - 20, 
      y: Math.random() * 40 - 20,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 2 + 1,
    }))
  }

  const [particles] = useState(generateParticles())

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-40 md:right-8"
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {/* Improved Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-16 right-0 bg-black/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
                style={{ width: "180px" }}
              >
                <div className="relative px-3 py-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
                    <p className="text-xs font-medium text-blue-400">AI Assistant</p>
                  </div>
                  <p className="text-sm font-medium text-white">Ask me anything!</p>

                  {/* Triangle pointer */}
                  <div className="absolute bottom-[-8px] right-6 w-4 h-4 rotate-45 bg-black/80"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Particles around the button */}
          {!hasBeenSeen &&
            particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1.5 h-1.5 rounded-full bg-blue-400"
                style={{
                  x: particle.x,
                  y: particle.y,
                  opacity: 0.6,
                }}
                animate={{
                  x: [particle.x, particle.x + 10, particle.x - 5, particle.x],
                  y: [particle.y, particle.y - 10, particle.y + 5, particle.y],
                  opacity: [0.6, 0.8, 0.4, 0.6],
                  scale: [particle.scale, particle.scale * 1.2, particle.scale * 0.8, particle.scale],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Main button */}
          <motion.button
            onClick={openChat}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => !hasBeenSeen && setShowTooltip(true)}
            onHoverEnd={() => !hasBeenSeen && setShowTooltip(false)}
            animate={
              !hasBeenSeen
                ? {
                    y: [0, -10, 0],
                    rotate: [0, 5, 0, -5, 0],
                  }
                : {}
            }
            transition={
              !hasBeenSeen
                ? {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }
                : {}
            }
          >
            {/* Pulsing background */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-md"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Main button background */}
            <div className="relative p-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80 
                              group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Button icon */}
              <div className="relative flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-full h-full text-yellow-300" />
                </motion.div>
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingChatButton
