'use client';
import {useEffect, useState } from 'react';

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from '@/components/Dashboard';


// import Header from './components/Header';
// import Dashboard from './components/Dashboard';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen antialiased ${darkMode ? 'dark' : ''}`}>
      {/* Background gradient patterns */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950 dark:to-teal-950/80">
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-emerald-100/50 dark:from-emerald-900/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-teal-100/30 dark:from-teal-900/30 to-transparent"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-400/10 dark:bg-emerald-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-10 left-20 w-72 h-72 bg-teal-300/10 dark:bg-teal-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-emerald-300/10 dark:bg-emerald-700/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {/* Main content */}
        <div className="flex-1 ml-64">
          <Header />
          <main>
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;