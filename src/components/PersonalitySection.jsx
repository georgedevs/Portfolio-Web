import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { 
  Coffee, Music, Book, Gamepad, 
  Film, Camera, Code, Lightbulb, 
  Heart, MessageCircle, ChevronRight, ChevronLeft,
  Dumbbell, Umbrella, Laugh
} from 'lucide-react';
import { FaFutbol, FaBasketballBall } from 'react-icons/fa';

const PersonalitySection = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('hobbies');
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const tabsContainerRef = useRef(null);
  
  
  // Categories and items to reveal  personality
  const tabs = [
    { id: 'hobbies', label: 'Hobbies & Interests', icon: Heart },
    { id: 'story', label: 'My Journey', icon: Book },
    { id: 'inspiration', label: 'Inspiration', icon: Lightbulb },
    { id: 'fun-facts', label: 'Fun Facts', icon: Coffee }
  ];

  // Text style for colorful sections
  const ColorText = ({ children, color }) => (
    <span className={`font-medium ${color}`}>{children}</span>
  );
  
  // Function to check if scrolling buttons should be shown
  const checkScrollable = () => {
    if (tabsContainerRef.current) {
      const { scrollWidth, clientWidth } = tabsContainerRef.current;
      setShowScrollButtons(scrollWidth > clientWidth);
    }
  };

  // Check on mount and window resize
  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  // Scroll tabs left/right
  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const scrollAmount = 150;
      const currentScroll = tabsContainerRef.current.scrollLeft;
      tabsContainerRef.current.scrollTo({
        left: direction === 'right' ? currentScroll + scrollAmount : currentScroll - scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  // Content for each tab
  const content = {
    hobbies: {
      title: "Beyond Coding",
      items: [
        { 
          icon: FaFutbol, 
          title: "Football (Soccer) Fan", 
          description: "Absolutely obsessed with football! You'll find me cheering (or shouting at the TV) during big matches. It's not just a sport, it's a lifestyle. ⚽",
          color: "from-blue-500 to-cyan-400"
        },
        { 
          icon: Gamepad, 
          title: "Casual Gaming", 
          description: "I'm that friend who's good at games and still has a blast playing them! More about competition than fun most of the time. Currently hooked on FIFA and Call of Duty.",
          color: "from-purple-500 to-pink-400"
        },
        { 
          icon: FaBasketballBall, 
          title: "Basketball Enthusiast", 
          description: "Huge NBA fan! I follow the season religiously and stay up late to catch games. Nothing beats the excitement of playoff basketball.",
          color: "from-amber-500 to-orange-400"
        },
        { 
          icon: Film, 
          title: "Movies & TV Shows", 
          description: "I love well-crafted stories that blend technology themes with compelling characters.",
          color: "from-green-500 to-emerald-400"
        }
      ]
    },
    
    story: {
      title: "My Journey",
      content: (
        <div className="space-y-4">
          <p>
            I stumbled into coding during the <ColorText color="text-purple-500">COVID lockdown</ColorText> out of sheer boredom. My first app was a calculator that was so buggy it would sometimes give you <ColorText color="text-red-500">7 + 7 = 77</ColorText>. But hey, that's technically string concatenation, right? 😅
          </p>
          <p>
            What started as a <ColorText color="text-blue-500">way to kill time</ColorText> quickly became an obsession. I went from "maybe I'll learn HTML" to "let me rebuild Netflix from scratch" in about two weeks (spoiler alert: it didn't go well).
          </p>
          <p>
            The real <ColorText color="text-green-500">game-changer</ColorText> was when I built my school's e-voting system in 2022. Nothing validates your skills quite like seeing real humans using something you created without immediately breaking it!
          </p>
          <p>
            Through countless <ColorText color="text-amber-500">late nights</ColorText>, <ColorText color="text-pink-500">frustrating bugs</ColorText>, and the occasional keyboard-slamming moment, I've found my passion. Every "{`console.log('why isn't this working??')`}" has been worth it!
          </p>
        </div>
      ),
      timeline: [
        { year: "2019", event: "Wrote my first line of code (print('Hello World') never felt so good!)" },
        { year: "2020", event: "Built my first web application (a glorified todo list that ironically, I never finished)" },
        { year: "2022", event: "Created my school's E-voting system (democracy in action!)" },
        { year: "2023", event: "Completed 3+ client projects and dove into full-stack development" },
        { year: "2025", event: "Building my portfolio to land that dream job (hello, hiring manager! 👋)" }
      ]
    },
    
    inspiration: {
      title: "What Inspires Me",
      quotes: [
        { 
          text: "People don't care about what you say, they care about what you build.", 
          author: "Mark Zuckerberg",
          color: "from-blue-500 to-indigo-500"
        },
        { 
          text: "Without commitment, you'll never start. Without consistency, you'll never finish.", 
          author: "Denzel Washington",
          color: "from-amber-500 to-red-500"
        },
        { 
          text: "There's no talent here, this is hard work. This is an obsession.", 
          author: "Conor McGregor",
          color: "from-green-500 to-teal-500"
        },
        { 
          text: "Code is like humor. When you have to explain it, it's bad.", 
          author: "Cory House",
          color: "from-purple-500 to-pink-500"
        }
      ],
      people: [
        "Creators who solve real problems",
        "Engineers who prioritize user experience",
        "Designers who blend form and function",
        "Mentors who share knowledge freely"
      ]
    },
    
    "fun-facts": {
      title: "Fun Facts About Me",
      facts: [
        { 
          icon: Laugh, 
          fact: "I have a good sense of humor (at least that's what my friends tell me)", 
          color: "from-amber-600 to-amber-800"
        },
        { 
          icon: Music, 
          fact: "I listen to slow sad songs while debugging and hard tempo rap songs while designing", 
          color: "from-blue-600 to-sky-400"
        },
        { 
          icon: Umbrella, 
          fact: "I actually enjoy spending time in the rain (yes, I'm that dramatic character from movies)", 
          color: "from-green-600 to-emerald-400"
        },
        { 
          icon: Coffee, 
          fact: "I've written my best code after my third cup of coffee", 
          color: "from-purple-600 to-indigo-400"
        },
        { 
          icon: Dumbbell, 
          fact: "I love to gym - nothing clears my mind better than a good workout session", 
          color: "from-orange-600 to-red-400"
        },
        { 
          icon: Code, 
          fact: "My first app was a calculator with a secret game hidden inside", 
          color: "from-rose-600 to-pink-400"
        }
      ]
    }
  };
  
  // Next quote function
  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % content.inspiration.quotes.length);
  };
  
  // Previous quote function
  const prevQuote = () => {
    setCurrentQuote((prev) => (prev === 0 ? content.inspiration.quotes.length - 1 : prev - 1));
  };

  // Renders the content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'hobbies':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.hobbies.items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg relative overflow-hidden group`}
                whileHover={{ scale: 1.03 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                    {typeof item.icon === 'function' ? (
                      <item.icon className="w-6 h-6 text-white" />
                    ) : (
                      <item.icon size={22} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${themeConfig[theme].text} mb-1`}>
                      {item.title}
                    </h3>
                    <p className={`${themeConfig[theme].text} opacity-80 text-sm`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );
        
      case 'story':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-5 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg`}
            >
              <div className={`${themeConfig[theme].text} opacity-80`}>
                {content.story.content}
              </div>
            </motion.div>
            
            <div className="relative mt-10 ml-4">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
              <div className="space-y-6">
                {content.story.timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 -ml-2"></div>
                      <span className={`text-sm font-bold ${themeConfig[theme].text}`}>{item.year}</span>
                    </div>
                    <div className={`p-3 rounded-lg ${themeConfig[theme].accent} ${themeConfig[theme].text}`}>
                      {item.event}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'inspiration':
        return (
          <div className="space-y-8">
            <div className="relative">
              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuote}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.4 }}
                    className={`p-6 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg relative overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${content.inspiration.quotes[currentQuote].color} opacity-10`} />
                    <div className="relative text-center space-y-4 py-4">
                      <div className="text-6xl opacity-20">"</div>
                      <p className={`text-xl font-medium ${themeConfig[theme].text}`}>
                        {content.inspiration.quotes[currentQuote].text}
                      </p>
                      <p className={`${themeConfig[theme].text} opacity-70`}>
                        — {content.inspiration.quotes[currentQuote].author}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="flex justify-between mt-4">
                <motion.button
                  onClick={prevQuote}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full ${themeConfig[theme].accent}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                
                <div className="flex space-x-2">
                  {content.inspiration.quotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuote(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        currentQuote === index ? 'bg-blue-500' : 'bg-gray-400/30'
                      }`}
                    />
                  ))}
                </div>
                
                <motion.button
                  onClick={nextQuote}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full ${themeConfig[theme].accent}`}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg`}
            >
              <h3 className={`text-lg font-semibold ${themeConfig[theme].text} mb-3`}>
                I'm Inspired By
              </h3>
              <ul className="space-y-2">
                {content.inspiration.people.map((person, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center ${themeConfig[theme].text} opacity-80`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                    {person}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        );
        
      case 'fun-facts':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content["fun-facts"].facts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl ${themeConfig[theme].accent} backdrop-blur-lg relative overflow-hidden group`}
                whileHover={{ scale: 1.05, rotate: 1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color}`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className={`${themeConfig[theme].text} opacity-85 text-sm`}>
                    {item.fact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className={`py-24 ${themeConfig[theme].primary} transition-colors duration-500 relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-departure">
            Personal <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Side</span>
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <p className={`max-w-2xl mx-auto mt-4 ${themeConfig[theme].text} opacity-80`}>
            Get to know the person behind the code. Here's a glimpse into who I am beyond my technical skills.
          </p>
        </motion.div>
        
        {/* Tab Navigation - Mobile Responsive */}
        <div className="mb-10 relative">
          <div className="flex items-center">
            {/* Left scroll button - only visible on mobile when needed */}
            {showScrollButtons && (
              <motion.button
                onClick={() => scrollTabs('left')}
                className="md:hidden absolute left-0 z-10 p-1 rounded-full bg-blue-500/20 backdrop-blur-sm"
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            )}
            
            {/* Tabs container with horizontal scroll on mobile */}
            <div 
              ref={tabsContainerRef}
              className="flex-1 overflow-x-auto scrollbar-hide px-6 md:px-0 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex space-x-4 justify-start md:justify-center min-w-max">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 rounded-xl flex items-center space-x-2 whitespace-nowrap transition-all ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium' 
                        : `${themeConfig[theme].accent} hover:bg-blue-500/10`
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Right scroll button - only visible on mobile when needed */}
            {showScrollButtons && (
              <motion.button
                onClick={() => scrollTabs('right')}
                className="md:hidden absolute right-0 z-10 p-1 rounded-full bg-blue-500/20 backdrop-blur-sm"
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          <h3 className={`text-2xl font-bold ${themeConfig[theme].text} mb-6`}>
            {content[activeTab].title}
          </h3>
          
          {renderContent()}
        </motion.div>

      </div>
    </div>
  );
};

export default PersonalitySection;