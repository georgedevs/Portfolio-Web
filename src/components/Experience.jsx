import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { 
  BookOpen, 
  Code, 
  Globe, 
  Calendar,
  MapPin,
  ChevronRight,
  Briefcase,
  GraduationCap,
  ChevronDown
} from 'lucide-react';

const Experience = () => {
  const { theme } = useTheme();
  const [selectedExp, setSelectedExp] = useState(null);

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
      achievements: ['Improved API response times by 40%', 'Implemented new features used by 1000+ users'],
      color: "from-blue-500 via-cyan-400 to-blue-600"
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
      type: "freelance",
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
      achievements: ['Completed 10+ successful projects', 'Maintained 100% client satisfaction rate'],
      color: "from-purple-500 via-pink-400 to-purple-600"
    },
    {
      title: "Computer Science Student",
      company: "Caleb University",
      location: "Lagos, Nigeria",
      duration: "Sep 2023 - Present",
      description: [
        "Relevant coursework: Data Structures, Algorithms, Web Development",
        "Active member of Computer Science Society"
      ],
      icon: BookOpen,
      type: "education",
      technologies: ['Python', 'Java', 'C++', 'Data Structures', 'Algorithms'],
      achievements: ['Dean\'s List', 'Computer Science Society Member'],
      color: "from-green-500 via-emerald-400 to-green-600"
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'internship': return Briefcase;
      case 'freelance': return Code;
      case 'education': return GraduationCap;
      default: return Globe;
    }
  };

  return (
    <div className={`py-24 ${themeConfig[theme].primary} transition-colors duration-500 relative overflow-hidden`}>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-departure">
            Professional <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Journey</span>
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-1 relative">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedExp(selectedExp === index ? null : index)}
              className={`${themeConfig[theme].accent} rounded-2xl backdrop-blur-xl relative overflow-hidden cursor-pointer group`}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-20`} />
              </div>

              <div className="relative p-8">
                {/* Header Section */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Type Badge */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${exp.color} text-white mb-4`}>
                      {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                    </div>

                    <h3 className={`text-2xl font-bold ${themeConfig[theme].text} mb-2 flex items-center`}>
                      {exp.title}
                      <motion.div
                        animate={{ rotate: selectedExp === index ? 180 : 0 }}
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 opacity-60" />
                        <span className={`${themeConfig[theme].text} opacity-80`}>{exp.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 opacity-60" />
                        <span className={`${themeConfig[theme].text} opacity-80`}>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl bg-gradient-to-r ${exp.color} bg-opacity-10`}>
                    <exp.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {selectedExp === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-6"
                    >
                      {/* Description */}
                      <div className="space-y-3 mb-6">
                        {exp.description.map((desc, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start"
                          >
                            <ChevronRight className="w-4 h-4 mt-1 mr-2 text-blue-500" />
                            <span className={`${themeConfig[theme].text} opacity-80`}>{desc}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className={`text-lg font-semibold ${themeConfig[theme].text} mb-3`}>Technologies & Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${exp.color} text-white`}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className={`text-lg font-semibold ${themeConfig[theme].text} mb-3`}>Key Achievements</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center"
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.color} mr-3`} />
                              <span className={`${themeConfig[theme].text} opacity-80`}>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;