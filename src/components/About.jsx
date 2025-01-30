import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { Code, Brain, Rocket, GraduationCap, ChevronRight, GitBranch, Box, Cpu, ArrowRight, ArrowLeft } from 'lucide-react';

const FlippingCard = () => {
  const { theme } = useTheme();
  const [cardIndex, setCardIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const HighlightedText = ({ children, color }) => (
    <span className={`font-medium ${color}`}>{children}</span>
  );

  const cardContent = [
    {
      title: "Passionate Full Stack Developer",
      content: (
        <div className="space-y-4">
          <p className={`text-lg leading-relaxed ${themeConfig[theme].text}`}>
            Bridging the gap between <HighlightedText color="text-blue-500">innovation</HighlightedText> and 
            <HighlightedText color="text-purple-500"> practical solutions</HighlightedText>. I transform complex 
            challenges into elegant, user-centric applications that make a real impact. My approach combines 
            <HighlightedText color="text-green-500"> technical excellence</HighlightedText> with 
            <HighlightedText color="text-orange-500"> creative problem-solving</HighlightedText>.
          </p>
        </div>
      )
    },
    {
      title: "The Beginning of My Journey",
      content: (
        <div className="space-y-4">
          <p className={`text-lg leading-relaxed ${themeConfig[theme].text}`}>
            It all began in <HighlightedText color="text-blue-500">9th Grade</HighlightedText> when the world of programming first captured my imagination. While most stories start with "I always knew I wanted to code," mine has a unique twist. My path started with a dream of 
            <HighlightedText color="text-purple-500"> engineering</HighlightedText>, but the specific direction remained a mystery until I discovered my true passion:
            <HighlightedText color="text-green-500"> game development</HighlightedText>.
          </p>
          <p className={`text-lg leading-relaxed ${themeConfig[theme].text}`}>
            The idea of creating virtual worlds and interactive experiences lit a 
            <HighlightedText color="text-orange-500"> spark</HighlightedText> that would grow into a burning passion for all aspects of software development.
          </p>
        </div>
      )
    },
    {
      title: "The Drive to Excel",
      content: (
        <div className="space-y-4">
          <p className={`text-lg leading-relaxed ${themeConfig[theme].text}`}>
            During <HighlightedText color="text-blue-500">COVID-19</HighlightedText>, when the world slowed down, my journey accelerated. From crafting my first
            <HighlightedText color="text-purple-500"> calculator app</HighlightedText> to dreaming of building the next
            <HighlightedText color="text-green-500"> tech empire</HighlightedText>, each project fueled my growing passion.
          </p>
          <p className={`text-lg leading-relaxed ${themeConfig[theme].text}`}>
            What sets me apart isn't just my technical skills—it's my
            <HighlightedText color="text-orange-500"> insatiable curiosity</HighlightedText> and
            <HighlightedText color="text-pink-500"> relentless drive</HighlightedText> to improve. I may not be the most experienced developer yet, but my
            <HighlightedText color="text-cyan-500"> hunger for knowledge</HighlightedText> and
            <HighlightedText color="text-yellow-500"> dedication to growth</HighlightedText> set me apart.
          </p>
          <p className={`text-lg leading-relaxed ${themeConfig[theme].text} font-medium italic`}>
            "I am Ukoh-Godwin George, driven by passion, fueled by curiosity, and committed to excellence in every line of code I write."
          </p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (cardIndex < cardContent.length - 1) {
      setFlipping(true);
      setTimeout(() => {
        setCardIndex(prev => prev + 1);
        setFlipping(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (cardIndex > 0) {
      setFlipping(true);
      setTimeout(() => {
        setCardIndex(prev => prev - 1);
        setFlipping(false);
      }, 300);
    }
  };

  return (
    <div className={`p-8 rounded-2xl ${themeConfig[theme].accent} backdrop-blur-xl relative group overflow-hidden`}>
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-30"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(59,130,246,0.3), transparent)',
            'linear-gradient(225deg, rgba(236,72,153,0.3), transparent)',
            'linear-gradient(45deg, rgba(59,130,246,0.3), transparent)'
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={cardIndex}
          initial={{ rotateY: flipping ? 90 : 0, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative space-y-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-2xl font-bold ${themeConfig[theme].text}`}>
              {cardContent[cardIndex].title}
            </h3>
            {cardIndex === 0 && (
              <motion.div 
                className="flex items-center space-x-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className={`text-sm ${themeConfig[theme].text} opacity-80`}>
                  Available for work
                </span>
              </motion.div>
            )}
          </div>

          <div className={`space-y-4 ${themeConfig[theme].text}`}>
            {cardContent[cardIndex].content}
          </div>

          <div className="flex justify-between items-center pt-4">
            <motion.button
              onClick={handlePrevious}
              disabled={cardIndex === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 ${cardIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </motion.button>

            <div className="flex space-x-2">
              {cardContent.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    idx === cardIndex ? 'bg-blue-500' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              disabled={cardIndex === cardContent.length - 1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 ${
                cardIndex === cardContent.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'
              }`}
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ModernAbout = () => {
  const { theme } = useTheme();

  const skills = [
    {
      icon: Code,
      label: 'Full Stack Development',
      description: 'Proficient in both frontend and backend technologies',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Brain,
      label: 'Problem Solving',
      description: 'Analytical approach to complex challenges',
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: Rocket,
      label: 'Innovation',
      description: 'Pushing boundaries with creative solutions',
      color: 'from-orange-500 to-red-400'
    },
    {
      icon: GraduationCap,
      label: 'Continuous Learning',
      description: 'Always expanding knowledge and skills',
      color: 'from-green-500 to-emerald-400'
    }
  ];

  

  const stats = [
    { label: 'Projects Completed', value: '20+', icon: Box },
    { label: 'Git Contributions', value: '500+', icon: GitBranch },
    { label: 'Technologies', value: '15+', icon: Cpu }
  ];

  return (
    <div className={`py-24 ${themeConfig[theme].primary} transition-colors duration-500 overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-departure">
            About <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Me</span>
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Main Bio Card */}
            <FlippingCard />

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg text-center group hover:scale-105 transition-transform duration-300`}
                >
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${themeConfig[theme].text} group-hover:text-blue-500 transition-colors duration-300`} />
                  <div className={`text-2xl font-bold ${themeConfig[theme].text} mb-1`}>{stat.value}</div>
                  <div className={`text-sm ${themeConfig[theme].text} opacity-80`}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg relative group`}
              >
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r ${skill.color}`} />
                <div className="relative flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} bg-opacity-10`}>
                    <skill.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold ${themeConfig[theme].text} mb-2 flex items-center group-hover:text-blue-500 transition-colors duration-300`}>
                      {skill.label}
                      <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </h3>
                    <p className={`${themeConfig[theme].text} opacity-80`}>
                      {skill.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernAbout;