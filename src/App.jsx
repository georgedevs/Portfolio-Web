import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import { useTheme } from './context/ThemeContext';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Technologies from './components/Technologies';
import ScrollToTop from './components/ScrollToTop';
import CustomScrollbar from './components/CustomScrollbar'; 
import EnhancedLoader from './components/EnhancedLoader';
import PersonalitySection from './components/PersonalitySection';
import ThemeIndicator from './components/ThemeIndicator';
import AIChatIntegration from './components/AIChatIntegration';

const AppContent = () => {
  const { getThemeStyle } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeStyle('primary')} ${getThemeStyle('text')}`}>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Technologies />
      <Projects />
      <PersonalitySection />
      <Contact />
      <Footer />
      <ScrollToTop/>
      <CustomScrollbar/>
      <ThemeIndicator />
      <AIChatIntegration />
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      {isLoading ? (
        <EnhancedLoader onComplete={handleLoaderComplete} />
      ) : (
        <AppContent />
      )}
    </ThemeProvider>
  );
};

export default App;