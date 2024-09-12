import { useState, useEffect } from 'react';

const ComingSoon = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [text, setText] = useState('');
  const fullText = "Coming Soon!";

  // Writing animation effect
  useEffect(() => {
    let index = 0;
    let interval;

    const typeText = () => {
      interval = setInterval(() => {
        if (index < fullText.length) {
          // Set text directly based on the substring
          setText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval); // Stop the typing
          // Wait for a moment and reset the text
          setTimeout(() => {
            setText(''); // Clear the text
            index = 0;   // Reset the index
            typeText(); // Restart typing animation
          }, 1000);
        }
      }, 200); // Adjust speed as desired
    }

    typeText(); // Start typing animation

    // Clean up interval on component unmount
    return () => clearInterval(typeText);
  }, []);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
            {text}
          </h1>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Welcome to my portfolio! I am currently working on it.
          </p>
          <button
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? 'Enable Light Mode' : 'Enable Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
