import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { 
  Mail, 
  MessageSquare, 
  User, 
  Send, 
  Phone, 
  MapPin, 
  Check, 
  Loader2, 
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Sparkles,
  Rocket,
  Code,
  CheckCircle2,
  XCircle,
  Gift,
  Clock,
  ThumbsUp,
  UploadCloud
} from 'lucide-react';
import { RainBackground } from './RainBackground';

const EnhancedContact = () => {
  const { theme } = useTheme();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [formProgress, setFormProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgvezbyl';

  // Fancy contact info with motion effects
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+234 912 088 8381',
      gradient: 'from-blue-500 to-cyan-500',
      motion: {
        hover: { rotate: [0, 15, -15, 0], transition: { duration: 0.5 } }
      }
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'gukohgodwin@gmail.com',
      gradient: 'from-purple-500 to-pink-500',
      motion: {
        hover: { scale: [1, 1.1, 1], transition: { duration: 0.5 } }
      }
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Lagos, Nigeria',
      gradient: 'from-orange-500 to-red-500',
      motion: {
        hover: { y: [0, -5, 0], transition: { duration: 0.5 } }
      }
    }
  ];

  // Enhanced social links with hover effects
  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/georgedevs', 
      name: 'GitHub',
      gradient: 'from-gray-700 to-gray-900',
      hoverText: 'Check my repos'
    },
    { 
      icon: Linkedin, 
      href: 'https://ng.linkedin.com/in/ukoh-godwin-george-b72b5b32a', 
      name: 'LinkedIn',
      gradient: 'from-blue-600 to-blue-800',
      hoverText: 'Connect with me'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/george_devss', 
      name: 'Instagram',
      gradient: 'from-pink-500 via-purple-500 to-red-500',
      hoverText: 'Follow my journey'
    }
  ];

  // Special features for project
  const projectFeatures = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Maintainable, scalable code following best practices',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Rocket,
      title: 'Fast Delivery',
      description: 'Quick turnaround times without sacrificing quality',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      icon: Sparkles,
      title: 'Quality Results',
      description: 'Polished, high-performance applications',
      gradient: 'from-amber-500 to-red-400'
    },
    {
      icon: ThumbsUp,
      title: 'Client Satisfaction',
      description: 'Your vision, successfully implemented',
      gradient: 'from-green-500 to-emerald-400'
    }
  ];

  // Calculate form progress based on filled fields
  useEffect(() => {
    let progress = 0;
    if (formState.name) progress += 33;
    if (formState.email) progress += 33;
    if (formState.message) progress += 34;
    setFormProgress(progress);
  }, [formState]);

  // Create confetti animation when form submits successfully
  useEffect(() => {
    if (submitStatus === 'success') {
      setShowConfetti(true);
      
      // Generate confetti pieces
      const pieces = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -20,
        size: Math.random() * 8 + 5,
        color: [
          '#3B82F6', // blue
          '#8B5CF6', // purple
          '#EC4899', // pink
          '#10B981', // green
          '#F59E0B', // amber
        ][Math.floor(Math.random() * 5)],
        rotation: Math.random() * 360,
        vx: (Math.random() - 0.5) * 15,
        vy: Math.random() * 5 + 5
      }));
      
      setConfettiPieces(pieces);
      
      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [submitStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(formState),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fancy Card component for info items
  const FancyCard = ({ icon: Icon, title, children, gradient, motionProps }) => (
    <motion.div
      whileHover={motionProps?.hover}
      className={`${themeConfig[theme].accent} p-6 md:p-7 rounded-xl backdrop-blur-lg relative overflow-hidden group cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r ${gradient}`} />
      
      {/* Animated border on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-border-flow"></div>
          <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-border-flow delay-150"></div>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-border-flow delay-300"></div>
          <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-border-flow delay-450"></div>
        </div>
      </div>
      
      <div className="relative flex items-center space-x-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${gradient}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${themeConfig[theme].text} group-hover:text-blue-500 transition-colors duration-300`}>
            {title}
          </h3>
          {children}
        </div>
        <ArrowRight className={`w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-5 group-hover:translate-x-0 transition-all duration-300 ${themeConfig[theme].text}`} />
      </div>
    </motion.div>
  );

  // Social Media Button
  const SocialButton = ({ social }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <motion.div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.a
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 rounded-lg bg-gradient-to-r ${social.gradient} shadow-lg flex items-center justify-center relative overflow-hidden`}
        >
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 bg-white"
            animate={isHovered ? { opacity: [0, 0.2, 0] } : {}}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          />
          <social.icon className="w-6 h-6 text-white" />
        </motion.a>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-md bg-gray-900/90 text-white text-xs"
            >
              {social.hoverText}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Confetti Animation
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {showConfetti && confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ 
            x: `${piece.x}%`,
            y: `-10%`,
            rotate: 0
          }}
          animate={{ 
            x: `calc(${piece.x}% + ${piece.vx}vw)`,
            y: '110%',
            rotate: piece.rotation
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
        />
      ))}
    </div>
  );

  return (
    <div id="contact" className={`py-24 ${themeConfig[theme].primary} transition-colors duration-500 relative overflow-hidden`}>
      <Confetti />
      <RainBackground />
      
      {/* Decorative Elements - Enhanced with more interesting shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Blobs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
        
        {/* Additional decorative elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section - Enhanced with animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-20"
        >
          <div className="relative inline-block">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-departure"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 10px rgba(59, 130, 246, 0.5)",
                  "0 0 0px rgba(59, 130, 246, 0)"
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Get in <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Touch</span>
            </motion.h2>
            
            {/* Floating elements around the title */}
            <motion.div 
              className="absolute -top-6 -right-6 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center"
              animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-3 h-3 text-blue-500" />
            </motion.div>
            <motion.div 
              className="absolute -bottom-4 -left-4 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center"
              animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Sparkles className="w-3 h-3 text-purple-500" />
            </motion.div>
          </div>
          
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          
          {/* Project Call-to-Action Section - Enhanced with better visuals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className={`${themeConfig[theme].accent} p-8 md:p-10 rounded-2xl backdrop-blur-xl relative group overflow-hidden shadow-lg`}>
              {/* Animated gradient background with improved animation */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(59,130,246,0.3), transparent)',
                    'linear-gradient(135deg, rgba(139,92,246,0.3), transparent)',
                    'linear-gradient(225deg, rgba(236,72,153,0.3), transparent)',
                    'linear-gradient(315deg, rgba(59,130,246,0.3), transparent)'
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Improved content layout */}
              <div className="relative space-y-6">
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-8 h-8 text-blue-500" />
                  </motion.div>
                  <h3 className={`text-2xl md:text-3xl font-bold ${themeConfig[theme].text}`}>
                    Have a Project in Mind?
                  </h3>
                </div>
                
                <p className={`text-lg md:text-xl text-center ${themeConfig[theme].text} opacity-90 max-w-3xl mx-auto`}>
                  Let's collaborate to bring your vision to life. From concept to completion, 
                  I'm here to help transform your ideas into reality.
                </p>

                {/* Feature Icons - Redesigned with more information */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {projectFeatures.map((feature) => (
                    <motion.div
                      key={feature.title}
                      whileHover={{ y: -5, scale: 1.03 }}
                      className={`p-5 rounded-xl bg-gradient-to-r ${feature.gradient} bg-opacity-5 flex flex-col items-center space-y-3 backdrop-blur-sm`}
                    >
                      <feature.icon className="w-6 h-6 text-white/70" />
                      <div className="text-center">
                        <h4 className="text-sm font-semibold text-white/90 mb-1">{feature.title}</h4>
                        <p className="text-xs text-white/70 leading-tight">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info & Social - Enhanced with better card designs */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {contactInfo.map((info) => (
                <FancyCard 
                  key={info.title} 
                  icon={info.icon} 
                  title={info.title} 
                  gradient={info.gradient}
                  motionProps={info.motion}
                >
                  <p className={`${themeConfig[theme].text} opacity-80`}>{info.value}</p>
                </FancyCard>
              ))}
            </motion.div>

            {/* Social Links - Improved with 3D-like effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${themeConfig[theme].accent} p-6 md:p-8 rounded-xl backdrop-blur-lg shadow-lg`}
            >
              <h3 className={`text-lg md:text-xl font-semibold ${themeConfig[theme].text} mb-6`}>
                Connect with me
              </h3>
              <div className="flex justify-around">
                {socialLinks.map((social) => (
                  <SocialButton key={social.name} social={social} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form - Enhanced with progress indicator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`${themeConfig[theme].accent} p-8 rounded-xl backdrop-blur-lg relative shadow-lg`}
          >
            {/* Form progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-200/20 rounded-t-xl overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-xl" />
            
            <form onSubmit={handleSubmit} className="relative space-y-6 pt-4">
              {/* Form header with status icons */}
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${themeConfig[theme].text}`}>Send a Message</h3>
                
                {submitStatus === 'success' ? (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    className="flex items-center text-green-500"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-1" />
                    <span className="text-sm">Sent</span>
                  </motion.div>
                ) : submitStatus === 'error' ? (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center text-red-500"
                  >
                    <XCircle className="w-5 h-5 mr-1" />
                    <span className="text-sm">Error</span>
                  </motion.div>
                ) : (
                  <div className="text-sm opacity-70 flex items-center">
                    <span>{formProgress}% Complete</span>
                  </div>
                )}
              </div>
              
              {/* Name Input */}
              <div>
                <label className={`block text-sm font-medium ${themeConfig[theme].text} mb-2`}>Name</label>
                <div className="relative group">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 
                    ${focusedField === 'name' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-200/20 rounded-lg transition-all duration-300
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Your name"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className={`block text-sm font-medium ${themeConfig[theme].text} mb-2`}>Email</label>
                <div className="relative group">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300
                    ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-200/20 rounded-lg transition-all duration-300
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="your@email.com"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className={`block text-sm font-medium ${themeConfig[theme].text} mb-2`}>Message</label>
                <div className="relative group">
                  <MessageSquare className={`absolute left-3 top-3 w-5 h-5 transition-colors duration-300
                    ${focusedField === 'message' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-200/20 rounded-lg transition-all duration-300
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Tell me about your project..."
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                </div>
              </div>

              {/* Submit Button - Enhanced with better animations */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg relative overflow-hidden group ${
                  isSubmitting ? 'cursor-not-allowed opacity-80' : ''
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                
                {/* Animated gradient hover effect */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: [
                      'linear-gradient(to right, #EC4899, #8B5CF6, #3B82F6)',
                      'linear-gradient(to right, #3B82F6, #EC4899, #8B5CF6)',
                      'linear-gradient(to right, #8B5CF6, #3B82F6, #EC4899)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Button content */}
                <div className="relative flex items-center justify-center space-x-2">
                  <span className="text-white font-medium">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </div>
              </motion.button>

              {/* Success/Error Message - Enhanced with better animations */}
              <AnimatePresence mode="wait">
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-lg ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <div className="flex flex-col">
                          <span className="font-medium">Message sent successfully!</span>
                          <span className="text-sm opacity-80">I'll get back to you soon.</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5" />
                        <div className="flex flex-col">
                          <span className="font-medium">Failed to send message.</span>
                          <span className="text-sm opacity-80">Please try again or email me directly.</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedContact;