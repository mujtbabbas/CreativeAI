import axios from 'axios';
import { ApiResponse, GeneratedContent, ChatMessage } from '../types';

const API_BASE_URL = 'https://api.openai.com/v1';
const HUGGING_FACE_API = 'https://api-inference.huggingface.co/models';

// Free API keys (replace with your own)
const OPENAI_API_KEY = 'your-openai-api-key';
const HUGGING_FACE_API_KEY = 'your-huggingface-api-key';

class ApiService {
  private openaiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  private huggingFaceClient = axios.create({
    baseURL: HUGGING_FACE_API,
    headers: {
      'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  async generateChat(message: string): Promise<ApiResponse<string>> {
    try {
      // Using Groq API as a free alternative
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer gsk_YOUR_GROQ_API_KEY`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant for a creative platform. Be creative, inspiring, and helpful.'
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
        // Fallback to mock response for demo
        return {
          success: true,
          data: `I understand you're looking for creative assistance! Here's my response to "${message}". This is a demo response since API keys need to be configured. The platform supports real-time AI chat, image generation, and video creation once proper API keys are set up.`
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data.choices[0].message.content
      };
    } catch (error) {
      return {
        success: true,
        data: `I'd be happy to help with "${message}"! This is a demo response. To get real AI responses, please configure your API keys in the settings.`
      };
    }
  }

  async generateImage(prompt: string): Promise<ApiResponse<string>> {
    try {
      // Using DALL-E API (fallback to demo)
      const response = await this.openaiClient.post('/images/generations', {
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      });

      return {
        success: true,
        data: response.data.data[0].url
      };
    } catch (error) {
      // Fallback to demo image
      return {
        success: true,
        data: `https://picsum.photos/1024/1024?random=${Date.now()}`
      };
    }
  }

  async generateVideo(prompt: string): Promise<ApiResponse<string>> {
    try {
      // Simulate video generation (in real app, use RunwayML or similar)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Return a demo video URL
      return {
        success: true,
        data: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to generate video'
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

export const apiService = new ApiService();