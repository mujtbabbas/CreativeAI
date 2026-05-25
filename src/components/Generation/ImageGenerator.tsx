import React, { useState } from 'react';
import { Image, Download, Sparkles, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../../utils/api';
import { storageService } from '../../utils/storage';
import { GeneratedContent } from '../../types';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedContent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    
    const content: GeneratedContent = {
      id: Date.now().toString(),
      type: 'image',
      prompt,
      url: '',
      createdAt: new Date().toISOString(),
      status: 'generating',
    };

    setGeneratedImages(prev => [content, ...prev]);

    try {
      const response = await apiService.generateImage(prompt);
      
      if (response.success && response.data) {
        const updatedContent = {
          ...content,
          url: response.data,
          status: 'completed' as const,
        };
        
        setGeneratedImages(prev => 
          prev.map(item => item.id === content.id ? updatedContent : item)
        );
        
        storageService.saveGeneratedContent(updatedContent);
      } else {
        setGeneratedImages(prev => 
          prev.map(item => item.id === content.id ? { ...item, status: 'failed' as const } : item)
        );
      }
    } catch (error) {
      setGeneratedImages(prev => 
        prev.map(item => item.id === content.id ? { ...item, status: 'failed' as const } : item)
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnhancePrompt = async () => {
    if (!prompt.trim() || isEnhancing) return;

    setIsEnhancing(true);
    try {
      const response = await apiService.enhancePrompt(prompt);
      if (response.success && response.data) {
        setPrompt(response.data);
      }
    } catch (error) {
      console.error('Error enhancing prompt:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleDownload = (url: string, prompt: string) => {
    const filename = `ai-image-${Date.now()}.png`;
    storageService.downloadFile(url, filename);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900">AI Image Generator</h2>
        <p className="text-sm text-gray-600">Create stunning images with AI</p>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe the image you want to create
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A serene landscape with mountains, a lake reflecting the sky, and wildflowers in the foreground..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>
            
            <div className="flex space-x-3">
              <motion.button
                onClick={handleEnhancePrompt}
                disabled={!prompt.trim() || isEnhancing}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isEnhancing ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Wand2 className="w-4 h-4 mr-2" />
                )}
                Enhance Prompt
              </motion.button>
              
              <motion.button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isGenerating ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Generate Image
              </motion.button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {generatedImages.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {image.status === 'generating' ? (
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Generating...</p>
                    </div>
                  ) : image.status === 'completed' ? (
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-red-600">Failed to generate</p>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {image.prompt}
                  </p>
                  
                  {image.status === 'completed' && (
                    <motion.button
                      onClick={() => handleDownload(image.url, image.prompt)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};