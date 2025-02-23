import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { 
  BookOpen, Code, Globe, Calendar, MapPin, 
  ChevronRight, 
  ChevronDown, Terminal, Award, 
} from 'lucide-react';

const Experience = () => {
  const { theme } = useTheme();
  const [selectedExp, setSelectedExp] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const experiences = [
    {
      title: "Junior Backend Developer",
      company: "ACO Multimedia",
      location: "Lagos, Nigeria",
      duration: "Sep 2023 - Present",
      description: [
        "Developed and maintained features for the company's web application using React and Node.js",
        "Collaborated with senior developers to implement responsive UI components",
        "Participated in daily stand-ups and agile development processes"
      ],
      icon: Globe,
      type: "internship",
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Git'],
      achievements: ['Improved API response times by 40%', 'Implemented new features used by 500+ users'],
      color: "from-blue-500 via-cyan-400 to-blue-600",
      stats: [
        { label: 'Projects', value: '3+' },
        { label: 'Features', value: '20+' },
        { label: 'Team Size', value: '8' }
      ]
    },
    {
      title: "Freelance Web Developer",
      company: "Self-employed",
      location: "Remote",
      duration: "Jan 2023 - Present",
      description: [
        "Building custom websites for small businesses",
        "Managing client relationships and project timelines",
        "Implementing responsive designs and modern UI/UX practices",
        "Developed modern websites using Next.js, Tailwind CSS, and Framer Motion"
      ],
      icon: Code,
      type: "freelance",
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
      achievements: ['Completed 10+ successful projects', 'Maintained 100% client satisfaction rate'],
      color: "from-purple-500 via-pink-400 to-purple-600",
      stats: [
        { label: 'Clients', value: '10+' },
        { label: 'Projects', value: '12' },
        { label: 'Reviews', value: '5★' }
      ]
    },
    {
      title: "Computer Science Student",
      company: "Caleb University",
      location: "Lagos, Nigeria",
      duration: "Sep 2023 - Present",
      description: [
        "Relevant coursework: Data Structures, Algorithms, Web Development",
        "Active member of Computer Science Society",
        "Participating in coding competitions and hackathons",
        "Maintaining excellent academic performance while working on practical projects"
      ],
      icon: BookOpen,
      type: "education",
      technologies: ['Python', 'Java', 'C++', 'Data Structures', 'Algorithms'],
      achievements: [
        'Computer Science Society Member',
        'Best Student in Department (Current)',
        'Perfect attendance and active class participation'
      ],
      color: "from-green-500 via-emerald-400 to-green-600",
      stats: [
        { label: 'GPA', value: '4.97' },
        { label: 'Projects', value: '5+' },
        { label: 'Year', value: '2nd' }
      ]
    }
  ];

  const ExperienceCard = ({ exp, index, isSelected, onSelect }) => {
    const isCompact = windowWidth < 768;
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onClick={() => onSelect(index)}
        className={`relative group ${isCompact ? 'w-full' : 'w-[calc(100%-2rem)]'} 
          ${isSelected ? 'translate-x-8' : ''} transition-all duration-500`}
      >
        {/* Timeline Connector */}
        {!isCompact && (
          <>
            <div className="absolute -left-[42px] top-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <motion.div 
              className={`absolute -left-[50px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full
                ${isSelected ? 'bg-gradient-to-r from-blue-500 to-purple-500' : themeConfig[theme].accent}`}
              animate={{
                scale: isSelected ? [1, 1.2, 1] : 1,
                rotate: isSelected ? [0, 180, 360] : 0
              }}
              transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
            />
          </>
        )}

        {/* Main Card */}
        <motion.div
          layout
          className={`${themeConfig[theme].accent} rounded-2xl backdrop-blur-xl overflow-hidden
            ${isSelected ? 'ring-2 ring-blue-500/30' : ''} transition-all duration-300`}
        >
          {/* Gradient Border */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-20`} />
          </div>

          {/* Card Content */}
          <div className="relative p-6 sm:p-8">
            <div className="flex items-start gap-6">
              {/* Icon Section */}
              <motion.div
                className={`hidden sm:flex p-4 rounded-xl bg-gradient-to-r ${exp.color}`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
              >
                <exp.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content Section */}
              <div className="flex-1 space-y-4">
                {/* Header */}
                <div className="space-y-2">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${exp.color} text-white`}>
                    {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                  </div>
                  
                  <h3 className={`text-xl sm:text-2xl font-bold ${themeConfig[theme].text} flex items-center gap-2`}>
                    {exp.title}
                    <motion.div
                      animate={{ rotate: isSelected ? 180 : 0 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <p className={`font-medium ${themeConfig[theme].text}`}>{exp.company}</p>
                    <div className="flex items-center gap-4 opacity-80">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                {!isSelected && (
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {exp.stats.map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="text-center"
                      >
                        <div className={`text-xl font-bold bg-gradient-to-r ${exp.color} text-transparent bg-clip-text`}>
                          {stat.value}
                        </div>
                        <div className={`text-sm ${themeConfig[theme].text} opacity-60`}>
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Expandable Content */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-6 space-y-6"
                    >
                      {/* Description */}
                      <div className="space-y-3">
                        {exp.description.map((desc, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className={`p-1 rounded-full bg-gradient-to-r ${exp.color} mt-1`}>
                              <ChevronRight className="w-3 h-3 text-white" />
                            </div>
                            <span className={`${themeConfig[theme].text} opacity-80`}>{desc}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-5 h-5" />
                          <h4 className={`text-lg font-semibold ${themeConfig[theme].text}`}>
                            Technologies & Skills
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${exp.color} text-white
                                hover:scale-105 transition-transform cursor-default`}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5" />
                          <h4 className={`text-lg font-semibold ${themeConfig[theme].text}`}>
                            Key Achievements
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.color}`} />
                              <span className={`${themeConfig[theme].text} opacity-80`}>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className={`py-24 ${themeConfig[theme].primary} transition-colors duration-500 relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${themeConfig[theme].accent} 0%, transparent 50%),
                        radial-gradient(circle at 70% 50%, ${themeConfig[theme].accent} 0%, transparent 50%)`
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative"
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-departure"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Professional{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Journey
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </motion.h2>
          
          <motion.p
            className={`max-w-2xl mx-auto mt-4 ${themeConfig[theme].text} opacity-80`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A timeline of my professional growth and achievements in the tech industry.
          </motion.p>
        </motion.div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Timeline Line (Desktop) */}
          {windowWidth >= 768 && (
            <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-500/20 to-transparent" />
          )}

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.title}
                exp={exp}
                index={index}
                isSelected={selectedExp === index}
                onSelect={(idx) => setSelectedExp(selectedExp === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
  
          {/* Mobile Timeline Indicator */}
          {windowWidth < 768 && (
            <div className="mt-12 flex justify-center gap-2">
              {experiences.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === selectedExp 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
                      : `${themeConfig[theme].accent}`
                  }`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setSelectedExp(selectedExp === idx ? null : idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Experience;