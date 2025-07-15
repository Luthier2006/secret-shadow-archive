import { useState, useEffect, createContext, useContext } from 'react';
import { apiClient } from '@/config/api';
import { SecurityUtils } from '@/lib/crypto';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const updateAuthState = (updates: Partial<AuthState>) => {
    setAuthState(prev => ({ ...prev, ...updates }));
  };

  const login = async (email: string, password: string) => {
    try {
      updateAuthState({ isLoading: true });
      
      // Client-side rate limiting
      if (!SecurityUtils.checkRateLimit('login', 5, 60000)) {
        throw new Error('Too many login attempts. Please try again later.');
      }
      
      const response = await apiClient.login(email, password) as AuthResponse;
      
      if (response.success && response.token && response.user) {
        apiClient.setToken(response.token);
        updateAuthState({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      updateAuthState({ isLoading: false });
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      updateAuthState({ isLoading: true });
      
      // Client-side rate limiting
      if (!SecurityUtils.checkRateLimit('register', 3, 300000)) {
        throw new Error('Too many registration attempts. Please try again later.');
      }
      
      const response = await apiClient.register(email, password, name) as AuthResponse;
      
      if (response.success && response.token && response.user) {
        apiClient.setToken(response.token);
        updateAuthState({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      updateAuthState({ isLoading: false });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      apiClient.removeToken();
      updateAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        updateAuthState({ isLoading: false });
        return;
      }

      // Here you would typically verify the token with the backend
      // For now, we'll assume the token is valid if it exists
      updateAuthState({ isLoading: false });
    } catch (error) {
      console.error('Auth check failed:', error);
      apiClient.removeToken();
      updateAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    checkAuth,
  };
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };