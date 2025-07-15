// API Configuration for LOVABLE Archive

// API Response types
interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
  message?: string;
}

export const API_CONFIG = {
  // Production backend URL
  BASE_URL: 'https://lovable-backend-l69c.onrender.com',
  
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      VERIFY: '/api/auth/verify'
    },
    SECRETS: {
      CREATE: '/api/secrets',
      GET_ALL: '/api/secrets',
      GET_BY_ID: '/api/secrets/:id',
      DELETE: '/api/secrets/:id',
      ANALYZE: '/api/secrets/:id/analyze'
    },
    AI: {
      GROQ_ANALYZE: '/api/ai/analyze'
    }
  }
};

// API client class
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    return this.request<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async logout() {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
    });
  }

  // Secrets methods
  async createSecret(data: {
    encryptedContent: string;
    openAt: string;
    useAI?: boolean;
  }) {
    return this.request(API_CONFIG.ENDPOINTS.SECRETS.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSecrets() {
    return this.request(API_CONFIG.ENDPOINTS.SECRETS.GET_ALL);
  }

  async getSecret(id: string) {
    return this.request(
      API_CONFIG.ENDPOINTS.SECRETS.GET_BY_ID.replace(':id', id)
    );
  }

  async deleteSecret(id: string) {
    return this.request(
      API_CONFIG.ENDPOINTS.SECRETS.DELETE.replace(':id', id),
      { method: 'DELETE' }
    );
  }

  // AI analysis
  async analyzeSecret(content: string) {
    return this.request(API_CONFIG.ENDPOINTS.AI.GROQ_ANALYZE, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_CONFIG.BASE_URL);

// Health check function
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(API_CONFIG.BASE_URL);
    return response.ok;
  } catch {
    return false;
  }
};