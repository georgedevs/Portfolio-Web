import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';
import { 
  X, Send, Bot, User, ChevronDown, 
  Download, Copy, Trash2, MoreHorizontal,
  Zap, Brain, Cpu, Menu, Sparkles, Sun, Moon
} from 'lucide-react';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';
import { useToast, ToastContainer } from './ToastNotification';
import SimpleMarkdownRenderer from './SimpleMarkdownRenderer'; // Add this import

const OpenAIChatInterface = ({ isOpen, closeChat }) => {
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [error, setError] = useState(null);
  const { toasts, addToast, removeToast } = useToast();
  
  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            sender: 'bot',
            text: "Hey there! 👋 I'm George's AI assistant. Ask me anything about his work, projects, or interests!",
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  // Fix chat scrolling issues
  useEffect(() => {
    // Only attempt to scroll when messages container exists and there are messages or typing
    if (messagesContainerRef.current && (messages.length > 0 || isTyping || isThinking)) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isTyping, isThinking]);

  // Prevent page scrolling when mouse is over chat container
  useEffect(() => {
    const preventDefaultScroll = (e) => {
      // Stop the event from propagating to parent elements
      e.stopPropagation();
    };

    const handleWheelEvent = (e) => {
      // Check if the scroll has reached the top or bottom
      const container = messagesContainerRef.current;
      const isAtTop = container.scrollTop === 0;
      const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
      
      // Only prevent default if scrolling wouldn't overflow the container
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
      
      // Stop propagation in all cases to ensure the container handles the scroll
      e.stopPropagation();
    };

    const container = messagesContainerRef.current;
    if (container && isOpen) {
      // Use the wheel event to handle scrolling
      container.addEventListener('wheel', handleWheelEvent, { passive: false });
      // Prevent touch events from propagating as well for mobile
      container.addEventListener('touchmove', preventDefaultScroll, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheelEvent);
        container.removeEventListener('touchmove', preventDefaultScroll);
      };
    }
  }, [isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, [isOpen]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);
    setError(null);
    
    try {
      // Call OpenRouter API with DeepSeek model
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": "https://ukohgodwingeorge-portfolio.vercel.app/",
          "X-Title": "George's Portfolio AI",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-chat-v3-0324:free",
          "messages": [
            {
              role: "system",
              content: `You're an AI assistant on Ukoh-Godwin George's portfolio website. Be conversational, friendly, and to-the-point.

KEY FACTS ABOUT GEORGE:
- He's a passionate full stack developer with strong backend skills
- Currently studying Computer Science at Caleb University
- Works as a Junior Backend Developer at ACO Multimedia and freelances
- Available for frontend, backend, and full stack roles (prefers backend)
- Has built several projects including Projectrix, SkillNest, and MiCounselor
- Loves football, basketball, gaming, and watching movies/TV shows

RESPONSE GUIDELINES:
- Keep responses brief and natural - don't overexplain
- Adapt response length to question complexity (simple question = short answer)
- Sound like a friendly assistant, not a formal document
- Avoid listing too many details unless specifically asked
- Use conversational language and occasional emojis
- For formatting, you can use simple markdown: **bold**, *italic*, and [links](url)
- When asked "who is George?", give a brief, friendly intro

CONTACT DETAILS:
- Email: gukohgodwin@gmail.com
- Phone: +234 912 088 8381

Your primary goal is to help visitors learn about George in a natural, conversational way.`
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            {
              role: "user",
              content: input
            }
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract and display the response
      const botResponse = data.choices[0].message.content;
      setIsThinking(false);
      setIsTyping(true);
      
      // Simulate gradual typing
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: botResponse,
          timestamp: new Date()
        }]);
        setIsTyping(false);
      }, 500 + Math.min(botResponse.length * 5, 2000)); // Cap typing time at 2 seconds for long responses
      
    } catch (err) {
      console.error('Error calling OpenRouter API:', err);
      setIsThinking(false);
      setError('Failed to get AI response. Using fallback mode.');
      
      // Fallback to pre-programmed responses
      setIsTyping(true);
      setTimeout(() => {
        generateFallbackResponse(input);
        setIsTyping(false);
      }, 1000);
    }
  };

  // Handle pressing Enter to send
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Fallback response generator for when API fails
  const generateFallbackResponse = (userInput) => {
    const normalizedInput = userInput.toLowerCase();
    
    // Predefined responses for common questions - more conversational now
    if (normalizedInput.includes('who') && (normalizedInput.includes('you') || normalizedInput.includes('george'))) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "Hi! I'm George's AI assistant. George is a full stack developer currently studying Computer Science at Caleb University. He loves building web applications and has a strong backend focus.",
        timestamp: new Date()
      }]);
    } 
    else if (normalizedInput.includes('skill') || normalizedInput.includes('technology') || normalizedInput.includes('tech stack')) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "George works with React, Node.js, MongoDB, Express, and TypeScript. He's particularly strong with backend technologies and enjoys building full stack applications.",
        skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Tailwind CSS'],
        timestamp: new Date()
      }]);
    } 
    else if (normalizedInput.includes('experience') || normalizedInput.includes('work') || normalizedInput.includes('job')) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "George works as a Junior Backend Developer at ACO Multimedia and also does freelance web development. He's open to new opportunities in frontend, backend, or full stack roles (with a preference for backend work).",
        timestamp: new Date()
      }]);
    }
    else if (normalizedInput.includes('project') || normalizedInput.includes('portfolio')) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "George has built some cool projects like Projectrix (collaborative development platform), SkillNest (e-learning platform), and MiCounselor (anonymous counseling platform). You can check them out in the Projects section!",
        timestamp: new Date()
      }]);
    }
    else if (normalizedInput.includes('education') || normalizedInput.includes('study') || normalizedInput.includes('degree')) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "George is currently a Computer Science student at Caleb University in Lagos. He's a great student who balances academics with practical coding projects.",
        timestamp: new Date()
      }]);
    }
    else if (normalizedInput.includes('contact') || normalizedInput.includes('hire') || normalizedInput.includes('email')) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "Want to reach George? Email him at gukohgodwin@gmail.com or call +234 912 088 8381. He's currently available for new opportunities!",
        timestamp: new Date()
      }]);
    }
    else if (normalizedInput.includes('hobby') || normalizedInput.includes('personal') || normalizedInput.includes('free time')) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "Outside of coding, George loves football, basketball, gaming, and watching TV shows. He's a passionate person both in work and play!",
        timestamp: new Date()
      }]);
    }
    else if (normalizedInput.includes('hello') || normalizedInput.includes('hi') || normalizedInput === 'hey') {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "Hey there! 👋 How can I help you learn about George today?",
        timestamp: new Date()
      }]);
    }
    else {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "George is a passionate full stack developer with a strong backend focus. He's currently studying Computer Science and building cool web applications. What would you like to know about him?",
        timestamp: new Date()
      }]);
    }
  };

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([]);
    // Restart with welcome message
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            sender: 'bot',
            text: "👋 Hi there! I'm George's AI assistant. Ask me anything about his skills, experience, or projects!",
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
      }, 1000);
    }, 500);
  };

  // Copy chat history to clipboard
  const copyChat = () => {
    const chatText = messages.map(msg => 
      `${msg.sender === 'bot' ? 'AI Assistant' : 'You'}: ${msg.text}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(chatText).then(() => {
      // Show toast notification instead of alert
      addToast({
        message: 'Chat copied to clipboard!',
        type: 'success',
        duration: 3000
      });
    }).catch(() => {
      addToast({
        message: 'Failed to copy to clipboard',
        type: 'error',
        duration: 3000
      });
    });
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <AnimatePresence>
        {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeChat} // Close when clicking outside
        >
          {/* Chat container - improved mobile responsiveness */}
          <motion.div 
            className={`${themeConfig[theme].accent} max-w-lg w-full h-auto min-h-[400px] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl relative flex flex-col sm:min-h-[600px]`}
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Gradient overlay for visual interest */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
            
            {/* Chat header */}
            <div className={`p-4 border-b ${themeConfig[theme].border} flex justify-between items-center bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm`}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className={`font-medium ${themeConfig[theme].text}`}>
                    George's AI Assistant
                  </h3>
                  <p className={`text-xs ${themeConfig[theme].textMuted}`}>
                    Ask me anything about George
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Settings button */}
                <motion.button
                  onClick={() => setShowSettings(!showSettings)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full ${themeConfig[theme].accent} hover:bg-gray-500/10`}
                >
                  <Menu className="w-5 h-5" />
                </motion.button>
                
                {/* Close button */}
                <motion.button
                  onClick={closeChat}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full ${themeConfig[theme].accent} hover:bg-gray-500/10`}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            
            {/* Settings dropdown - with click outside functionality */}
            <AnimatePresence>
              {showSettings && (
                <>
                  {/* Invisible overlay to detect clicks outside */}
                  <motion.div 
                    className="fixed inset-0 z-0"
                    onClick={() => setShowSettings(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-4 top-16 z-20 p-2 rounded-lg shadow-lg ${themeConfig[theme].secondary} border ${themeConfig[theme].border} backdrop-blur-md`}
                  >
                    <ul className="space-y-1">
                      <li>
                        <button
                          onClick={() => {
                            clearChat();
                            setShowSettings(false);
                          }}
                          className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-gray-500/10`}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm">Clear chat</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            copyChat();
                            setShowSettings(false);
                          }}
                          className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-gray-500/10`}
                        >
                          <Copy className="w-4 h-4" />
                          <span className="text-sm">Copy transcript</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            toggleTheme(theme === 'dark' ? 'light' : 'dark');
                            setShowSettings(false);
                          }}
                          className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-gray-500/10`}
                        >
                          {theme === 'dark' ? (
                            <>
                              <Sun className="w-4 h-4" />
                              <span className="text-sm">Light mode</span>
                            </>
                          ) : (
                            <>
                              <Moon className="w-4 h-4" />
                              <span className="text-sm">Dark mode</span>
                            </>
                          )}
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            
            {/* Messages container - improved scrolling */}
            <div 
              ref={messagesContainerRef}
              className={`w-full flex-grow overflow-y-auto p-4 space-y-4 ${themeConfig[theme].primary}`} 
              style={{ 
                scrollBehavior: 'smooth', 
                overscrollBehavior: 'contain',
                maxHeight: '60vh',
                WebkitOverflowScrolling: 'touch', // Improved mobile scrolling
                msOverflowStyle: 'none',
                overflowX: 'hidden'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Messages */}
              {messages.map((message, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl overflow-hidden ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : `${themeConfig[theme].accent} border ${themeConfig[theme].border}`
                  }`}>
                    <div className="flex items-start p-3 gap-2">
                      {message.sender === 'bot' && (
                        <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="space-y-2 flex-1 break-words">
                        <div className={`${message.sender === 'user' ? 'text-white' : themeConfig[theme].text} text-sm sm:text-base`}>
                          {message.sender === 'bot' ? (
                            <SimpleMarkdownRenderer text={message.text} />
                          ) : (
                            message.text
                          )}
                        </div>
                        
                        {/* Skills chips */}
                        {message.skills && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.skills.map((skill, i) => (
                              <div 
                                key={i} 
                                className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200/10 backdrop-blur-sm text-xs"
                              >
                                {skill === 'React' && <FaReact className="w-3 h-3 text-blue-400" />}
                                {skill === 'Node.js' && <FaNodeJs className="w-3 h-3 text-green-400" />}
                                {skill === 'MongoDB' && <SiMongodb className="w-3 h-3 text-green-500" />}
                                {skill === 'Express' && <SiExpress className="w-3 h-3 text-gray-400" />}
                                {skill === 'Tailwind CSS' && <SiTailwindcss className="w-3 h-3 text-blue-400" />}
                                {skill}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className={`text-xs ${message.sender === 'user' ? 'text-white/70' : themeConfig[theme].textMuted}`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                      {message.sender === 'user' && (
                        <div className="p-2 rounded-full bg-white/20 flex-shrink-0 mt-1">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Error message if API fails */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 text-red-500 p-3 rounded-lg text-sm text-center"
                >
                  {error}
                </motion.div>
              )}
              
              {/* Thinking indicator */}
              {isThinking && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className={`max-w-[85%] rounded-2xl overflow-hidden ${themeConfig[theme].accent} border ${themeConfig[theme].border}`}>
                    <div className="flex items-start p-3 gap-3">
                      <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <motion.div 
                          className="flex gap-1"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <span className={`${themeConfig[theme].text}`}>Thinking</span>
                          <span>...</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className={`max-w-[85%] rounded-2xl overflow-hidden ${themeConfig[theme].accent} border ${themeConfig[theme].border}`}>
                    <div className="flex items-center p-3 gap-3">
                      <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex space-x-1">
                        <motion.div 
                          className={`w-2 h-2 rounded-full ${themeConfig[theme].textMuted}`}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div 
                          className={`w-2 h-2 rounded-full ${themeConfig[theme].textMuted}`}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className={`w-2 h-2 rounded-full ${themeConfig[theme].textMuted}`}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Empty div for scrolling to bottom */}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area - Fixed positioning to ensure it's always visible */}
            <div className={`p-4 border-t ${themeConfig[theme].border} backdrop-blur-sm mt-auto`}>
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about George's skills, projects, experience..."
                  className={`w-full px-4 py-3 pr-12 ${themeConfig[theme].accent} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                  rows={1}
                  disabled={isTyping || isThinking}
                />
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping || isThinking}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl
                    ${!input.trim() || isTyping || isThinking 
                      ? 'bg-gray-400/20 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90'}`}
                >
                  <Send className={`w-5 h-5 ${!input.trim() || isTyping || isThinking ? themeConfig[theme].textMuted : 'text-white'}`} />
                </motion.button>
              </div>
              
              {/* Powered by text */}
              <div className="mt-2 text-center">
                <p className={`text-xs ${themeConfig[theme].textMuted} flex items-center justify-center gap-1`}>
                  <Sparkles className="w-3 h-3" />
                  <span>AI assistant powered by Ukoh-Godwin George</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
};

export default OpenAIChatInterface;