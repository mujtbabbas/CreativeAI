import axios from 'axios';
import { ApiResponse, GeneratedContent, ChatMessage, ProviderConfig } from '../types';
import { storageService } from './storage';

class ApiService {
  private static instance: ApiService;
  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
  private getProviderConfig(): ProviderConfig {
    return storageService.getProviderConfig();
  }

  private async callOpenRouter(message: string, apiKey: string): Promise<string> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful, creative, and inspiring AI assistant for a creative platform. Be enthusiastic about helping users with their creative projects.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async callMistral(message: string, apiKey: string): Promise<string> {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-small',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful, creative, and inspiring AI assistant for a creative platform. Be enthusiastic about helping users with their creative projects.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Mistral API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async callGemini(message: string, apiKey: string): Promise<string> {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  private async callCustomProvider(message: string, config: ProviderConfig): Promise<string> {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model || 'default',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful, creative, and inspiring AI assistant for a creative platform.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Custom provider error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async generateChat(message: string): Promise<ApiResponse<string>> {
    try {
      const config = this.getProviderConfig();

      if (!config.apiKey) {
        return {
          success: true,
          data: `I'm ready to help with "${message}"! Please configure your AI provider in settings to get real responses. Set up OpenRouter, Mistral, Gemini, OpenAI, or a custom provider to get started.`
        };
      }

      let response;
      switch (config.type) {
        case 'openrouter':
          response = await this.callOpenRouter(message, config.apiKey);
          break;
        case 'mistral':
          response = await this.callMistral(message, config.apiKey);
          break;
        case 'gemini':
          response = await this.callGemini(message, config.apiKey);
          break;
        case 'custom':
          response = await this.callCustomProvider(message, config);
          break;
        case 'openai':
        default:
          response = await this.callOpenRouter(message, config.apiKey);
      }

      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: true,
        data: `I encountered an issue: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key and try again.`
      };
    }
  }

  async generateImage(prompt: string): Promise<ApiResponse<string>> {
    try {
      const config = this.getProviderConfig();

      if (!config.apiKey) {
        return {
          success: true,
          data: `https://picsum.photos/1024/1024?random=${Date.now()}`
        };
      }

      // Using Unsplash as a fallback for demo, in production use OpenRouter image API
      return {
        success: true,
        data: `https://picsum.photos/1024/1024?random=${Date.now()}`
      };
    } catch (error) {
      return {
        success: true,
        data: `https://picsum.photos/1024/1024?random=${Date.now()}`
      };
    }
  }

  async generateVideo(prompt: string): Promise<ApiResponse<string>> {
    try {
      const config = this.getProviderConfig();

      if (!config.apiKey) {
        return {
          success: true,
          data: 'https://www.w3schools.com/html/mov_bbb.mp4'
        };
      }

      // Return demo video for now
      return {
        success: true,
        data: 'https://www.w3schools.com/html/mov_bbb.mp4'
      };
    } catch (error) {
      return {
        success: true,
        data: 'https://www.w3schools.com/html/mov_bbb.mp4'
      };
    }
  }

  async enhancePrompt(originalPrompt: string): Promise<ApiResponse<string>> {
    try {
      const response = await this.generateChat(
        `Enhance this creative prompt to make it more detailed and artistic: "${originalPrompt}". Return only the enhanced prompt.`
      );
      
      return response;
    } catch (error) {
      return {
        success: true,
        data: `Enhanced: ${originalPrompt} with cinematic lighting, ultra-detailed, 8K resolution, professional photography style, vibrant colors, and artistic composition.`
      };
    }
  }
}

export const apiService = ApiService.getInstance();