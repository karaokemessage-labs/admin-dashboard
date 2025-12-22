import { API_CONFIG } from '../config/api';

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: number;
  error?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Handle token expiration - clear storage and redirect to login
   */
  private handleTokenExpiration() {
    // Clear all auth-related data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isAuthenticated');
    
    // Redirect to login page
    window.location.href = '/login';
  }

  /**
   * Get access token from localStorage
   */
  private getAccessToken(): string | null {
    return localStorage.getItem('accessToken') || localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    const url = `${this.baseURL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: '*/*',
    };

    // Add Authorization header if token exists
    const token = this.getAccessToken();
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Get cookies from document if available
    const cookies = document.cookie;

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
        ...(cookies ? { Cookie: cookies } : {}),
      },
      signal: controller.signal,
    };

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      // Handle 401 Unauthorized - token expired or invalid
      if (response.status === 401) {
        this.handleTokenExpiration();
        throw {
          message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
          status: 401,
        } as ApiError;
      }

      const contentType = response.headers.get('content-type');
      const isJson = contentType?.includes('application/json');

      let data: any;
      if (isJson) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const error: ApiError = {
          message: data?.message || data?.error || `HTTP error! status: ${response.status}`,
          status: response.status,
          errors: data?.errors,
        };
        throw error;
      }

      return {
        data,
        status: response.status,
        message: data?.message,
      };
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw {
          message: 'Request timeout. Please try again.',
          status: 408,
        } as ApiError;
      }

      if (error.status) {
        throw error as ApiError;
      }

      throw {
        message: error.message || 'An unexpected error occurred',
        status: 0,
      } as ApiError;
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  async post<T>(
    endpoint: string,
    body?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    body?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(
    endpoint: string,
    body?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();

