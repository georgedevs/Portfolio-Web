/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { 
  BookOpen, 
  Code, 
  Globe, 
  Calendar,
  MapPin
} from 'lucide-react';

const Experience = () => {
  const { theme } = useTheme();

  // You can easily edit this data
  const experiences = [
    {
      title: "Junior Backend Developer",
      company: "ACO Multimedia",
      location: "Lagos,Nigeria",
      duration: "Sep 2023 - Present",
      description: [
        "Developed and maintained features for the company's web application using React and Node.js",
        "Collaborated with senior developers to implement responsive UI components",
        "Participated in daily stand-ups and agile development processes"
      ],
      icon: Globe,
      type: "Internship"
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
        "Developed Empire Books Concept website using Next.js, Tailwind CSS, and Framer Motion"
      ],
      icon: Code,
      type: "freelance"
    },
    {
      title: "Computer Science Student",
      company: "Caleb University",
      location: "Lagos,Nigeria",
      duration: "Sep 2023 - Present",
      description: [
        "Relevant coursework: Data Structures, Algorithms, Web Development",
        "Active member of Computer Science Society"
      ],
      icon: BookOpen,
      type: "education"
    }
  ];

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

  const getTypeColor = (type) => {
    const colors = {
      internship: "from-blue-500 to-cyan-500",
      leadership: "from-purple-500 to-pink-500",
      freelance: "from-orange-500 to-red-500",
      education: "from-green-500 to-emerald-500"
    };
    return colors[type] || "from-gray-500 to-gray-700";
  };

  return (
    <div className={`py-20 ${themeConfig[theme].primary} transition-colors duration-500`}>
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Experience</span>
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </motion.div>

        {/* Experience Timeline */}
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative ${themeConfig[theme].accent} rounded-xl p-6 backdrop-blur-lg`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-30"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(59,130,246,0.3), transparent)',
                    'linear-gradient(225deg, rgba(236,72,153,0.3), transparent)',
                    'linear-gradient(45deg, rgba(59,130,246,0.3), transparent)'
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              <div className="relative z-10">
                {/* Type Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTypeColor(exp.type)} text-white mb-4`}>
                  {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-bold ${themeConfig[theme].text}`}>{exp.title}</h3>
                    <p className={`${themeConfig[theme].text} opacity-80 text-lg`}>{exp.company}</p>
                  </div>
                  <div className="flex flex-col mt-2 md:mt-0 md:items-end">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className={`${themeConfig[theme].text} opacity-80`}>{exp.duration}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className={`${themeConfig[theme].text} opacity-80`}>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2" />
                      <span className={`${themeConfig[theme].text} opacity-80`}>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Experience;