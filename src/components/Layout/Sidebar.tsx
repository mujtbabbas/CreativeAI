import React, { useState } from 'react';
import { MessageSquare, Image, Video, History, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'chat', label: 'AI Chat', icon: MessageSquare },
  { id: 'images', label: 'Image Generation', icon: Image },
  { id: 'videos', label: 'Video Generation', icon: Video },
  { id: 'history', label: 'History', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="lg:translate-x-0 fixed lg:static left-0 top-0 w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white h-screen lg:h-auto flex flex-col z-40 lg:z-0"
      >
        <div className="p-4 lg:p-6 flex-1 flex flex-col">
          <div className="mb-8 hidden lg:block">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              CreativeAI
            </h2>
          </div>

          <nav className="space-y-2 flex-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </nav>

          <div className="pt-4 mt-4 border-t border-gray-700 hidden lg:block">
            <p className="text-xs text-gray-400 px-4 py-2">
              Version 1.0.0
            </p>
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-4 text-gray-400 hover:text-white transition-colors text-center text-sm"
        >
          Close Menu
        </button>
      </motion.div>
    </>
  );
};