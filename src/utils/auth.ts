import { User } from '../types';

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {
    this.loadUserFromStorage();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private loadUserFromStorage(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.currentUser = JSON.parse(userData);
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo validation
    if (email && password.length >= 6) {
      const user: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        createdAt: new Date().toISOString(),
      };

      this.currentUser = user;
      this.saveUserToStorage(user);

      return { success: true, user };
    }

    return { success: false, error: 'Invalid credentials' };
  }

  async register(name: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo validation
    if (name && email && password.length >= 6) {
      const user: User = {
        id: Date.now().toString(),
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        createdAt: new Date().toISOString(),
      };

      this.currentUser = user;
      this.saveUserToStorage(user);

      return { success: true, user };
    }

    return { success: false, error: 'Invalid registration data' };
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const authService = AuthService.getInstance();