// src/components/ThemeToggleButton.tsx
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/Button';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    </Button>
  );
};