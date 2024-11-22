import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themeConfig = {
  light: {
    primary: 'bg-white',
    secondary: 'bg-gray-50',
    text: 'text-gray-900',
    textMuted: 'text-gray-600',
    accent: 'bg-gray-100',
    border: 'border-gray-200',
    shadow: 'shadow-gray-200/20',
    button: 'bg-gray-900 text-white hover:bg-gray-800',
    buttonOutline: 'border-gray-200 text-gray-900 hover:bg-gray-50',
  },
  dark: {
    primary: 'bg-black',
    secondary: 'bg-neutral-950',
    text: 'text-white',
    textMuted: 'text-neutral-400',
    accent: 'bg-neutral-900',
    border: 'border-neutral-800',
    shadow: 'shadow-black/60',
    button: 'bg-white text-black hover:bg-neutral-200',
    buttonOutline: 'border-neutral-800 text-white hover:bg-neutral-900',
  },
  blue: {
    primary: 'bg-blue-950',
    secondary: 'bg-blue-900',
    text: 'text-blue-50',
    textMuted: 'text-blue-200',
    accent: 'bg-blue-900',
    border: 'border-blue-800',
    shadow: 'shadow-blue-950/60',
    button: 'bg-blue-50 text-blue-950 hover:bg-blue-100',
    buttonOutline: 'border-blue-800 text-blue-50 hover:bg-blue-900',
  },
  green: {
    primary: 'bg-green-950',
    secondary: 'bg-green-900',
    text: 'text-green-50',
    textMuted: 'text-green-200',
    accent: 'bg-green-900',
    border: 'border-green-800',
    shadow: 'shadow-green-950/60',
    button: 'bg-green-50 text-green-950 hover:bg-green-100',
    buttonOutline: 'border-green-800 text-green-50 hover:bg-green-900',
  },
  purple: {
    primary: 'bg-purple-950',
    secondary: 'bg-purple-900',
    text: 'text-purple-50',
    textMuted: 'text-purple-200',
    accent: 'bg-purple-900',
    border: 'border-purple-800',
    shadow: 'shadow-purple-950/60',
    button: 'bg-purple-50 text-purple-950 hover:bg-purple-100',
    buttonOutline: 'border-purple-800 text-purple-50 hover:bg-purple-900',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const availableThemes = ['light', 'dark', 'blue', 'green','purple'];

  const toggleTheme = (newTheme) => {
    if (availableThemes.includes(newTheme)) {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  };

  const getThemeStyle = (element) => {
    return themeConfig[theme][element] || '';
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, availableThemes, getThemeStyle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};