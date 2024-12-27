import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { Mail, MessageSquare, User, Send, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const { theme } = useTheme();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  
  const FORMSPREE_ENDPOINT = `https://formspree.io/f/xgvezbyl`;

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+234 912 088 8381',
      delay: 0.2
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'gukohgodwin@gmail.com',
      delay: 0.3
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Lagos, Nigeria',
      delay: 0.4
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('Message sent successfully!');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('Failed to send message. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className={`py-20 ${themeConfig[theme].primary} transition-colors duration-500 min-h-screen`}>
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
            Get in <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Touch</span>
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className={`${themeConfig[theme].accent} p-6 rounded-xl backdrop-blur-lg relative overflow-hidden group`}
                variants={itemVariants}
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
                <div className="relative z-10 flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <info.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${themeConfig[theme].text}`}>{info.title}</h3>
                    <p className={`${themeConfig[theme].text} opacity-80`}>{info.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className={`${themeConfig[theme].accent} p-8 rounded-xl backdrop-blur-lg relative`}
            variants={itemVariants}
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
            
            <div className="relative z-10 space-y-6">
              <div>
                <label className={`block text-sm font-medium ${themeConfig[theme].text} mb-2`}>Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-200/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${themeConfig[theme].text} mb-2`}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-200/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${themeConfig[theme].text} mb-2`}>Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-200/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your message"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
              </motion.button>

              {submitStatus && (
                <div className={`text-center mt-4 ${submitStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                  {submitStatus}
                </div>
              )}
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;