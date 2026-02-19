import React, { createContext, useContext, useState } from 'react';
import { Colors } from './colors';

const ThemeContext = createContext();

export const THEMES = {
  LIME: 'lime',
  BLUE: 'blue',
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(THEMES.LIME);

  const colors = Colors[theme];

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES.LIME ? THEMES.BLUE : THEMES.LIME));
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
