import { createContext } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'User';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);