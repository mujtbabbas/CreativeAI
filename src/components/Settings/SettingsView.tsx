import React, { useState, useEffect } from 'react';
import { Save, Key, Trash2, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProviderConfig, ProviderType } from '../../types';
import { storageService } from '../../utils/storage';
import toast from 'react-hot-toast';

const PROVIDER_INFO = {
  openrouter: {
    name: 'OpenRouter',
    description: 'Free and paid models from multiple providers',
    url: 'https://openrouter.ai/keys',
    icon: '🤖',
    models: ['gpt-3.5-turbo', 'gpt-4', 'claude-2', 'mistral-medium']
  },
  mistral: {
    name: 'Mistral AI',
    description: 'Fast and efficient AI models',
    url: 'https://console.mistral.ai/keys',
    icon: '⚡',
    models: ['mistral-small', 'mistral-medium', 'mistral-large']
  },
  gemini: {
    name: 'Google Gemini',
    description: 'Google\'s advanced AI model',
    url: 'https://makersuite.google.com/app/apikey',
    icon: '✨',
    models: ['gemini-pro']
  },
  openai: {
    name: 'OpenAI',
    description: 'Official OpenAI API',
    url: 'https://platform.openai.com/api-keys',
    icon: '🔮',
    models: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo']
  },
  custom: {
    name: 'Custom Provider',
    description: 'Connect your own API endpoint',
    url: '',
    icon: '🔧',
    models: []
  }
};

export const SettingsView: React.FC = () => {
  const [provider, setProvider] = useState<ProviderType>('openrouter');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [customBaseUrl, setCustomBaseUrl] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const config = storageService.getProviderConfig();
    setProvider(config.type);
    setApiKey(config.apiKey);
    setModel(config.model || 'gpt-3.5-turbo');
    setCustomBaseUrl(config.baseUrl || '');
  }, []);

  const handleSaveSettings = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    if (provider === 'custom' && !customBaseUrl.trim()) {
      toast.error('Please enter a base URL for custom provider');
      return;
    }

    const config: ProviderConfig = {
      type: provider,
      apiKey: apiKey.trim(),
      model,
      baseUrl: provider === 'custom' ? customBaseUrl.trim() : undefined,
      name: PROVIDER_INFO[provider as keyof typeof PROVIDER_INFO].name
    };

    storageService.saveProviderConfig(config);
    setSaved(true);
    toast.success('Settings saved successfully!');
    
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all chat messages and generated content? This action cannot be undone.')) {
      storageService.clearChatMessages();
      storageService.clearGeneratedContents();
      toast.success('History cleared successfully!');
    }
  };

  const getProviderModels = () => {
    const info = PROVIDER_INFO[provider as keyof typeof PROVIDER_INFO];
    return info.models || [];
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5 shadow-sm sticky top-0 z-10">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Configure AI provider and preferences</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6">
        {/* AI Provider Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
        >
          <div className="flex items-center mb-6">
            <Key className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-gray-900">AI Provider</h3>
          </div>

          {/* Provider Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {Object.entries(PROVIDER_INFO).map(([key, info]) => (
              <motion.button
                key={key}
                onClick={() => setProvider(key as ProviderType)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  provider === key
                    ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300'
                    : 'border-gray-200 bg-white hover:border-purple-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-2xl mb-2">{info.icon}</p>
                    <p className="font-semibold text-gray-900 text-sm">{info.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{info.description}</p>
                  </div>
                  {provider === key && (
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* API Key Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {PROVIDER_INFO[provider as keyof typeof PROVIDER_INFO].name} API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                />
                {apiKey && (
                  <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                )}
              </div>
              <a
                href={PROVIDER_INFO[provider as keyof typeof PROVIDER_INFO].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-purple-600 hover:text-purple-700 mt-2"
              >
                Get API key <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>

            {/* Model Selection */}
            {getProviderModels().length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                >
                  {getProviderModels().map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Custom Base URL */}
            {provider === 'custom' && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Base URL
                </label>
                <input
                  type="url"
                  value={customBaseUrl}
                  onChange={(e) => setCustomBaseUrl(e.target.value)}
                  placeholder="https://api.example.com/v1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                />
                <p className="text-xs text-gray-600 mt-2">
                  Must be compatible with OpenAI API format
                </p>
              </div>
            )}

            {/* Temperature & Max Tokens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Temperature: {temperature.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Controls creativity (0 = deterministic, 2 = very creative)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Max Tokens: {maxTokens}
                </label>
                <input
                  type="range"
                  min="100"
                  max="4000"
                  step="100"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Maximum response length
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3"
        >
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              Free Alternatives Available
            </p>
            <p className="text-xs text-blue-700 mt-1">
              OpenRouter, Mistral AI, and Google Gemini offer free tiers for testing. No credit card required!
            </p>
          </div>
        </motion.div>

        {/* Clear History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
        >
          <div className="flex items-center mb-4">
            <Trash2 className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-gray-900">Danger Zone</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Clear All History</p>
              <p className="text-xs text-gray-600 mt-1">
                Delete all chat messages and generated content permanently
              </p>
            </div>
            <motion.button
              onClick={handleClearHistory}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium text-sm transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Clear
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4 shadow-lg sticky bottom-0">
        <div className="flex items-center justify-between">
          {saved && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center text-green-600 text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Settings saved
            </motion.div>
          )}
          <motion.button
            onClick={handleSaveSettings}
            className="ml-auto flex items-center px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 font-medium text-sm transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </motion.button>
        </div>
      </div>
    </div>
  );
};