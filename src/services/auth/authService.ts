import { fetchService } from '../api/fetchService';
import { LoginCredentials, LoginResponse } from './types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetchService.post<LoginResponse, LoginCredentials>('/Auth/login', credentials);
    const { token, user } = response.data;

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));

    return response.data;
  }

  async logout(): Promise<void> {
    try {
      // TODO: Implement logout logic if needed
    } finally {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
  }

  getCurrentUser(): LoginResponse['user'] | null {
    const userStr = sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }
}

export const authService = new AuthService();