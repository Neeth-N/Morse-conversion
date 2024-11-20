import React from 'react';
import MorseCodeConverter from './MorseCodeConverter';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <MorseCodeConverter />
      </div>
    </ThemeProvider>
  );
}

export default App;