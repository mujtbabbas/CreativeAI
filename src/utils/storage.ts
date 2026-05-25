import { ChatMessage, GeneratedContent, ProviderConfig, UserSettings } from '../types';

export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  saveChatMessage(message: ChatMessage): void {
    const messages = this.getChatMessages();
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }

  getChatMessages(): ChatMessage[] {
    const messages = localStorage.getItem('chatMessages');
    return messages ? JSON.parse(messages) : [];
  }

  saveGeneratedContent(content: GeneratedContent): void {
    const contents = this.getGeneratedContents();
    contents.push(content);
    localStorage.setItem('generatedContents', JSON.stringify(contents));
  }

  getGeneratedContents(): GeneratedContent[] {
    const contents = localStorage.getItem('generatedContents');
    return contents ? JSON.parse(contents) : [];
  }

  clearChatMessages(): void {
    localStorage.removeItem('chatMessages');
  }

  clearGeneratedContents(): void {
    localStorage.removeItem('generatedContents');
  }

  downloadFile(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  saveProviderConfig(config: ProviderConfig): void {
    localStorage.setItem('providerConfig', JSON.stringify(config));
  }

  getProviderConfig(): ProviderConfig {
    const config = localStorage.getItem('providerConfig');
    return config ? JSON.parse(config) : { type: 'openrouter', apiKey: '', model: 'gpt-3.5-turbo' };
  }

  saveUserSettings(settings: UserSettings): void {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }

  getUserSettings(): UserSettings {
    const settings = localStorage.getItem('userSettings');
    return settings ? JSON.parse(settings) : { 
      provider: { type: 'openrouter', apiKey: '', model: 'gpt-3.5-turbo' },
      temperature: 0.7,
      maxTokens: 1000,
      theme: 'light'
    };
  }
}

export const storageService = StorageService.getInstance();