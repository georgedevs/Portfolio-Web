import React, { useState } from 'react';
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
  Code
} from 'lucide-react';
import { RainBackground } from './RainBackground';

const ModernContact = () => {
  const { theme } = useTheme();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgvezbyl';

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+234 912 088 8381',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'gukohgodwin@gmail.com',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Lagos, Nigeria',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/georgedevs', name: 'GitHub' },
    { icon: Linkedin, href: 'https://ng.linkedin.com/in/ukoh-godwin-george-b72b5b32a', name: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/george_devss', name: 'Instagram' }
  ];

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

  return (
    <div id="contact" className={`py-24 ${themeConfig[theme].primary} transition-colors duration-500 relative overflow-hidden`}>
          <RainBackground/>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-departure">
            Get in <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Touch</span>
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          
          {/* New Project Call-to-Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mt-8"
          >
            <div className={`${themeConfig[theme].accent} p-8 rounded-2xl backdrop-blur-xl relative group overflow-hidden`}>
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
              
              {/* Content */}
              <div className="relative space-y-4">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  <h3 className={`text-2xl font-bold ${themeConfig[theme].text}`}>
                    Have a Project in Mind?
                  </h3>
                </div>
                
                <p className={`text-lg text-center ${themeConfig[theme].text} opacity-80`}>
                  Let's collaborate to bring your vision to life. From concept to completion, 
                  I'm here to help transform your ideas into reality.
                </p>

                {/* Feature Icons */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <Code className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className={`text-sm ${themeConfig[theme].text} opacity-80 text-center`}>
                      Clean Code
                    </span>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className="p-3 rounded-full bg-purple-500/10">
                      <Rocket className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className={`text-sm ${themeConfig[theme].text} opacity-80 text-center`}>
                      Fast Delivery
                    </span>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className="p-3 rounded-full bg-pink-500/10">
                      <Sparkles className="w-5 h-5 text-pink-500" />
                    </div>
                    <span className={`text-sm ${themeConfig[theme].text} opacity-80 text-center`}>
                      Quality Results
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, translateX: 10 }}
                  className={`${themeConfig[theme].accent} p-6 rounded-xl backdrop-blur-lg relative overflow-hidden group cursor-pointer`}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r ${info.gradient}`} />
                  <div className="relative flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${info.gradient} bg-opacity-10`}>
                      <info.icon className={`w-6 h-6 text-white`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${themeConfig[theme].text} group-hover:text-blue-500 transition-colors duration-300`}>
                        {info.title}
                      </h3>
                      <p className={`${themeConfig[theme].text} opacity-80`}>{info.value}</p>
                    </div>
                    <ArrowRight className={`w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-5 group-hover:translate-x-0 transition-all duration-300 ${themeConfig[theme].text}`} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${themeConfig[theme].accent} p-6 rounded-xl backdrop-blur-lg`}
            >
              <h3 className={`text-lg font-semibold ${themeConfig[theme].text} mb-4`}>
                Connect with me
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300`}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`${themeConfig[theme].accent} p-8 rounded-xl backdrop-blur-lg relative`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl" />
            <form onSubmit={handleSubmit} className="relative space-y-6">
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
                    placeholder="Your message"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                </div>
              </div>

              {/* Submit Button */}
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
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

              {/* Success/Error Message */}
              <AnimatePresence mode="wait">
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Message sent successfully!</span>
                      </>
                    ) : (
                      <>
                        <span>Failed to send message. Please try again.</span>
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

export default ModernContact;