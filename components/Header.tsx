import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);
  
  // Format date as "Month Day, Year"
  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Format time as "HH:MM:SS AM/PM"
  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <header className="sticky top-0 backdrop-blur-md bg-white/30 dark:bg-emerald-950/20 border-b border-emerald-100/20 dark:border-emerald-800/20 py-3 px-6 z-10">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">Dashboard</h1>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Analytics Overview</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..."
              className="w-64 py-2 pl-10 pr-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/30 border border-emerald-100/30 dark:border-emerald-700/30 text-emerald-800 dark:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-emerald-400/50 placeholder-emerald-400 dark:placeholder-emerald-600"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 dark:text-emerald-400" />
          </div>
          
          <div className="relative">
            <button className="p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/30 border border-emerald-100/30 dark:border-emerald-700/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/50 transition-all">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
            </button>
          </div>
          
          <div className="flex items-center">
            <div className="mr-2">
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200 text-right">{formattedTime}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 text-right">{formattedDate}</p>
            </div>
            <button className="flex items-center justify-center p-1 rounded-lg text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40 transition-all">
              <ChevronDown size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
