import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  HelpCircle,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';

interface SidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, toggleDarkMode }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    // { icon: <MessageSquare size={20} />, label: 'Conversations' },
    // { icon: <Users size={20} />, label: 'Users' },
    // { icon: <BarChart2 size={20} />, label: 'Reports' },
    // { icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 backdrop-blur-md bg-white/40 dark:bg-emerald-950/30 border-r border-emerald-100/20 dark:border-emerald-800/20 z-10 transition-all duration-300">
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4 border-b border-emerald-100/20 dark:border-emerald-800/20">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-2 rounded-lg mr-3">
            <MessageSquare size={22} />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-emerald-900 dark:text-emerald-100">Rafikey</h1>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">AI Chatbot Analytics</p>
          </div>
        </div>
        
        <div className="py-6 px-3 flex-grow">
          <nav>
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#"
                    className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      item.active 
                        ? 'bg-emerald-500/10 dark:bg-emerald-800/20 text-emerald-800 dark:text-emerald-200' 
                        : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/5 dark:hover:bg-emerald-900/20 hover:text-emerald-800 dark:hover:text-emerald-200'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {item.active && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-8 pt-6 border-t border-emerald-100/20 dark:border-emerald-800/20">
            <h3 className="text-xs uppercase text-emerald-600 dark:text-emerald-500 font-semibold px-3 mb-3">Support</h3>
            <ul className="space-y-1">
              <li>
                <a 
                  href="#"
                  className="flex items-center px-3 py-2.5 rounded-lg text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/5 dark:hover:bg-emerald-900/20 hover:text-emerald-800 dark:hover:text-emerald-200 transition-all duration-200"
                >
                  <span className="mr-3"><HelpCircle size={20} /></span>
                  <span className="font-medium">Help & Resources</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 border-t border-emerald-100/20 dark:border-emerald-800/20">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={toggleDarkMode}
              className="flex items-center justify-center p-2 rounded-lg bg-emerald-100/30 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/50 transition-all"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button className="flex items-center text-sm text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300">
              <LogOut size={18} className="mr-1.5" />
              <span>Logout</span>
            </button>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 mr-3 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">Rafike</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;