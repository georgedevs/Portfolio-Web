import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import { useTheme} from './context/ThemeContext';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Technologies from './components/Technologies';
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
      <Contact />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
