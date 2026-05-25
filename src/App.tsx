import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { ChatInterface } from './components/Chat/ChatInterface';
import { ImageGenerator } from './components/Generation/ImageGenerator';
import { VideoGenerator } from './components/Generation/VideoGenerator';
import { HistoryView } from './components/History/HistoryView';
import { SettingsView } from './components/Settings/SettingsView';

// Utils
import { authService } from './utils/auth';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState('chat');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      alert('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.register(name, email, password);
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        alert(result.error || 'Registration failed');
      }
    } catch (error) {
      alert('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setActiveTab('chat');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'images':
        return <ImageGenerator />;
      case 'videos':
        return <VideoGenerator />;
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <ChatInterface />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 sm:p-6">
        <Toaster position="top-right" />
        <div className="w-full max-w-md">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-3xl sm:text-4xl">✨</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">
              CreativeAI
            </h1>
            <p className="text-sm sm:text-base text-purple-200">
              Create stunning content with cutting-edge AI
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {authMode === 'login' ? (
              <LoginForm
                key="login"
                onLogin={handleLogin}
                onSwitchToRegister={() => setAuthMode('register')}
                loading={isLoading}
              />
            ) : (
              <RegisterForm
                key="register"
                onRegister={handleRegister}
                onSwitchToLogin={() => setAuthMode('login')}
                loading={isLoading}
              />
            )}
          </AnimatePresence>

          <motion.p
            className="text-center text-xs sm:text-sm text-purple-300 mt-6 sm:mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Powered by advanced AI providers
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-hidden flex flex-col"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </div>
  );
}

export default App;