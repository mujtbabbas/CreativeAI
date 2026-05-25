import React from 'react';
import { LogOut, Settings, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  user: any;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 border-b border-purple-500/20 shadow-lg sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="hidden sm:flex items-center space-x-2">
              <div className="flex-shrink-0 p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                CreativeAI
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-800/50 px-3 sm:px-4 py-2 rounded-full">
              <img
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-purple-500/30"
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                alt={user?.name || 'User'}
              />
              <span className="text-xs sm:text-sm font-medium text-gray-200 hidden sm:inline max-w-xs sm:max-w-sm truncate">
                {user?.name || 'User'}
              </span>
            </div>
            
            <motion.button
              onClick={onLogout}
              className="p-2 sm:p-2.5 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};