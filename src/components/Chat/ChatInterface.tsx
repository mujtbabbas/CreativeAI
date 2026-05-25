import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../../types';
import { apiService } from '../../utils/api';
import { storageService } from '../../utils/storage';
import { formatDistanceToNow } from 'date-fns';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = storageService.getChatMessages();
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    storageService.saveChatMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await apiService.generateChat(input);
      
      if (response.success && response.data) {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: response.data,
          sender: 'ai',
          timestamp: new Date().toISOString(),
          type: 'text',
        };

        setMessages(prev => [...prev, aiMessage]);
        storageService.saveChatMessage(aiMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    storageService.clearChatMessages();
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">AI Chat Assistant</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Get creative assistance from AI</p>
          </div>
          {messages.length > 0 && (
            <motion.button
              onClick={clearChat}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Clear chat"
            >
              <Trash2 className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent"
      >
        {messages.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center py-12"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Start a Conversation</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Ask me anything about creativity, design, writing, or any project ideas you have!
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 sm:gap-3 max-w-xs sm:max-w-lg lg:max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-col ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </motion.div>
                <div className={`space-y-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl break-words ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-none'
                        : 'bg-white text-gray-900 border border-gray-200 shadow-sm rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  <p
                    className={`text-xs px-1 ${
                      message.sender === 'user' ? 'text-gray-500' : 'text-gray-500'
                    }`}
                  >
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border border-gray-200 px-5 py-4 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex space-x-2">
                  <motion.div
                    className="w-2 h-2 bg-purple-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-purple-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-purple-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write your message... (Shift+Enter for new line)"
            className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            rows={1}
            maxLength={500}
          />
          <motion.button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 whitespace-nowrap"
            whileHover={{ scale: !(!input.trim() || isLoading) ? 1.05 : 1 }}
            whileTap={{ scale: !(!input.trim() || isLoading) ? 0.95 : 1 }}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Send</span>
          </motion.button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {input.length}/500 characters
        </p>
      </div>
    </div>
  );
};