export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
}

export interface GeneratedContent {
  id: string;
  type: 'image' | 'video';
  prompt: string;
  url: string;
  createdAt: string;
  status: 'generating' | 'completed' | 'failed';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}