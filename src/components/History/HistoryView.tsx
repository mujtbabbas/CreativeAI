import React, { useState, useEffect } from 'react';
import { Image, Video, Download, Trash2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeneratedContent } from '../../types';
import { storageService } from '../../utils/storage';
import { formatDistanceToNow } from 'date-fns';

export const HistoryView: React.FC = () => {
  const [contents, setContents] = useState<GeneratedContent[]>([]);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  useEffect(() => {
    const savedContents = storageService.getGeneratedContents();
    setContents(savedContents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, []);

  const filteredContents = contents.filter(content => 
    filter === 'all' || content.type === filter
  );

  const handleDownload = (url: string, prompt: string, type: string) => {
    const filename = `ai-${type}-${Date.now()}.${type === 'image' ? 'png' : 'mp4'}`;
    storageService.downloadFile(url, filename);
  };

  const handleDelete = (id: string) => {
    const updatedContents = contents.filter(content => content.id !== id);
    setContents(updatedContents);
    // Note: In a real app, you'd update the storage here
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900">Generation History</h2>
        <p className="text-sm text-gray-600">View and manage your AI-generated content</p>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({contents.length})
            </button>
            <button
              onClick={() => setFilter('image')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'image'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Images ({contents.filter(c => c.type === 'image').length})
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'video'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Videos ({contents.filter(c => c.type === 'video').length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredContents.map((content) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
              >
                <div className={`${content.type === 'video' ? 'aspect-video' : 'aspect-square'} bg-gray-100 flex items-center justify-center`}>
                  {content.status === 'completed' ? (
                    content.type === 'image' ? (
                      <img
                        src={content.url}
                        alt={content.prompt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={content.url}
                        controls
                        className="w-full h-full object-cover"
                        poster="https://picsum.photos/640/360?random=1"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )
                  ) : (
                    <div className="text-center">
                      {content.type === 'image' ? (
                        <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      ) : (
                        <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      )}
                      <p className="text-sm text-gray-600">
                        {content.status === 'generating' ? 'Generating...' : 'Failed'}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {content.prompt}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDistanceToNow(new Date(content.createdAt), { addSuffix: true })}
                  </div>
                  
                  {content.status === 'completed' && (
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={() => handleDownload(content.url, content.prompt, content.type)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(content.id)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredContents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'Start creating images and videos to see them here.'
                : `No ${filter}s generated yet. Start creating to see them here.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};