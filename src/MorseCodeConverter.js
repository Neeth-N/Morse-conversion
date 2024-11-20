import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Copy, Repeat2, Sun, Moon } from 'lucide-react';
import { ThemeContext } from './context/ThemeContext';


// Morse code conversion dictionaries
const MORSE_CODE_MAP = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

const REVERSE_MORSE_CODE_MAP = Object.fromEntries(
  Object.entries(MORSE_CODE_MAP).map(([k, v]) => [v, k])
);



const MorseCodeConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTextToMorse, setIsTextToMorse] = useState(true);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const toggleConversionMode = () => {
    setIsTextToMorse(!isTextToMorse);
    setInputText('');
    setOutputText('');
  };

  const convertText = () => {
    try {
      if (isTextToMorse) {
        const morseCode = inputText.toUpperCase().split('').map(char => 
          MORSE_CODE_MAP[char] || char
        ).join(' ');
        setOutputText(morseCode);
      } else {
        const text = inputText.split(' ').map(code => 
          REVERSE_MORSE_CODE_MAP[code] || code
        ).join('');
        setOutputText(text);
      }
    } catch (error) {
      setOutputText('Error converting');
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="dark:text-white">
              {isTextToMorse ? 'Text to Morse Code' : 'Morse Code to Text'}
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                title="Toggle theme"
                className="dark:text-white"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleConversionMode}
                title="Switch conversion mode"
                className="dark:text-white"
              >
                <Repeat2 className="h-5 w-5" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder={isTextToMorse 
              ? "Enter text to convert" 
              : "Enter Morse code (space-separated)"
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <div className="flex items-center mb-4">
            <Button 
              onClick={convertText} 
              className="mr-2 dark:bg-gray-600 dark:text-white"
            >
              Convert
            </Button>
          </div>
          <div className="relative">
            <Input
              placeholder="Converted result"
              value={outputText}
              readOnly
              className="pr-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 dark:text-white"
              onClick={copyOutput}
              title="Copy output"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MorseCodeConverter;