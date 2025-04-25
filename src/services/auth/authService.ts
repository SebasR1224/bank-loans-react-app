import { fetchService } from '../api/fetchService';
import { LoginCredentials, LoginResponse } from './types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetchService.post<LoginResponse, LoginCredentials>('/Auth/login', credentials);
    const { token } = response.data;

    localStorage.setItem('token', token);

    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await fetchService.post('/Auth/logout', {});
    } finally {
      localStorage.removeItem('token');
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export const authService = new AuthService();