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

export type ProviderType = 'openai' | 'openrouter' | 'mistral' | 'gemini' | 'custom';

export interface ProviderConfig {
  type: ProviderType;
  apiKey: string;
  model?: string;
  baseUrl?: string;
  name?: string;
}

export interface UserSettings {
  provider: ProviderConfig;
  temperature?: number;
  maxTokens?: number;
  theme?: 'light' | 'dark';
}