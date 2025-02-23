import { motion } from 'framer-motion';
import { useTheme, themeConfig } from '../context/ThemeContext';

const StackingSection = ({ children, className }) => {
  const { theme } = useTheme();

  return (
    <div className={`w-full min-h-screen sticky top-0 ${className}`}>
      <div className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default StackingSection;