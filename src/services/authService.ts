import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import { UserRole } from '../contexts/AuthContext';

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface LoginResponse {
  status?: string;
  message?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresAt?: string;
    refreshTokenExpiresAt?: string;
    userId?: string;
    username?: string;
    displayName?: string;
    role?: string;
    mustSetup2fa?: boolean;
    mustChangePassword?: boolean;
  };
  // Fallback for different API response formats
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  mustSetup2fa?: boolean;
  mustChangePassword?: boolean;
  user?: {
    id: string;
    email: string;
    username?: string;
    name?: string;
    role?: UserRole;
  };
  [key: string]: any; // For any additional fields from API
}

export interface UserMeRole {
  id: string;
  name: string;
}

export interface TwoFactorConfig {
  id: string;
  type: 'TOTP' | 'EMAIL';
  isActive: boolean;
  email: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface UserMeData {
  id?: string;
  username?: string;
  displayName?: string;
  email?: string;
  status?: string;
  providerId?: string | null;
  operatorId?: string | null;
  twoFaEnabled?: boolean;
  mustChangePassword?: boolean;
  mustSetup2fa?: boolean;
  requires2faChallenge?: boolean;
  createdAt?: number | string;
  updatedAt?: number | string;
  role?: string;
  roles?: UserMeRole[];
  twoFactorConfigs?: TwoFactorConfig[];
  [key: string]: any; // For any additional fields from API
}

export interface UserMeResponse {
  success?: boolean;
  message?: string;
  data?: UserMeData;
  // Fallback for direct data response
  id?: string;
  uid?: string;
  userId?: string;
  email?: string;
  username?: string;
  name?: string;
  displayName?: string;
  phone?: string;
  role?: string;
  roles?: UserMeRole[];
  sid?: string;
  iat?: number;
  exp?: number;
  [key: string]: any; // For any additional fields from API
}

export interface Setup2FARequest {
  userId: string;
  type: 'TOTP' | 'EMAIL';
}

export interface Setup2FATOTPResponse {
  qrCode?: string;
  secret?: string;
  backupCodes?: string[];
  data?: {
    qrCode?: string;
    secret?: string;
    backupCodes?: string[];
  };
  [key: string]: any;
}

export interface Setup2FAEmailResponse {
  message?: string;
  [key: string]: any;
}

export interface Verify2FARequest {
  userId: string;
  code: string;
  type: 'TOTP' | 'EMAIL';
}

export interface Verify2FAResponse {
  success?: boolean;
  message?: string;
  accessToken?: string;
  token?: string;
  refreshToken?: string;
  [key: string]: any;
}

export interface Disable2FARequest {
  userId: string;
  type: 'TOTP' | 'EMAIL';
}

export interface Disable2FAResponse {
  success?: boolean;
  message?: string;
  [key: string]: any;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success?: boolean;
  message?: string;
  [key: string]: any;
}

export interface RecoveryCodesResponse {
  success?: boolean;
  message?: string;
  data?: {
    codes?: string[];
    recoveryCodes?: string;
  };
  codes?: string[];
  recoveryCodes?: string;
  [key: string]: any;
}

export interface AuthService {
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  getMe: () => Promise<UserMeResponse>;
  changePassword: (request: ChangePasswordRequest) => Promise<ChangePasswordResponse>;
  setup2FATOTP: (userId: string) => Promise<Setup2FATOTPResponse>;
  regenerate2FATOTP: (userId: string) => Promise<Setup2FATOTPResponse>;
  setup2FAEmail: (userId: string) => Promise<Setup2FAEmailResponse>;
  verify2FA: (request: Verify2FARequest) => Promise<Verify2FAResponse>;
  disable2FA: (request: Disable2FARequest) => Promise<Disable2FAResponse>;
  getRecoveryCodes: () => Promise<RecoveryCodesResponse>;
}

class AuthServiceImpl implements AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.'
      );
    }
  }

  async getMe(): Promise<UserMeResponse> {
    try {
      const response = await apiClient.get<{ success: boolean; message: string; data: UserMeData }>(
        API_ENDPOINTS.AUTH.ME
      );
      // API returns { success, message, data: {...} }
      // response.data is the API response body: { success, message, data: {...} }
      const apiResponse = response.data;
      
      // Return the full response structure with data fields spread to top level for easy access
      return {
        success: apiResponse.success,
        message: apiResponse.message,
        data: apiResponse.data,
        // Spread data fields to top level for backward compatibility and easy access
        ...(apiResponse.data || {}),
      } as UserMeResponse;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thông tin người dùng. Vui lòng thử lại.'
      );
    }
  }

  async setup2FATOTP(userId: string): Promise<Setup2FATOTPResponse> {
    try {
      const response = await apiClient.post<Setup2FATOTPResponse>(
        API_ENDPOINTS.AUTH.SETUP_2FA,
        {
          userId,
          type: 'TOTP',
        }
      );
      // Handle both direct response and nested data structure
      const responseData = response.data;
      return {
        ...responseData,
        qrCode: responseData.qrCode || responseData.data?.qrCode,
        secret: responseData.secret || responseData.data?.secret,
        backupCodes: responseData.backupCodes || responseData.data?.backupCodes,
      };
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể thiết lập Authenticator App. Vui lòng thử lại.'
      );
    }
  }

  async regenerate2FATOTP(userId: string): Promise<Setup2FATOTPResponse> {
    try {
      const response = await apiClient.post<Setup2FATOTPResponse>(
        API_ENDPOINTS.AUTH.REGENERATE_2FA,
        {
          userId,
          type: 'TOTP',
        }
      );
      // Handle both direct response and nested data structure
      const responseData = response.data;
      console.log('Raw Regenerate API Response:', responseData);
      
      // Extract qrCode and secret from various possible response structures
      const result = {
        ...responseData,
        qrCode: responseData?.qrCode || responseData?.data?.qrCode || responseData?.qrCodeUrl || responseData?.qr_code,
        secret: responseData?.secret || responseData?.data?.secret || responseData?.secretKey || responseData?.secret_key,
        backupCodes: responseData?.backupCodes || responseData?.data?.backupCodes || responseData?.backup_codes,
      };
      
      console.log('Processed Regenerate Response:', result);
      return result;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể tạo lại QR code. Vui lòng thử lại.'
      );
    }
  }

  async setup2FAEmail(userId: string): Promise<Setup2FAEmailResponse> {
    try {
      const response = await apiClient.post<Setup2FAEmailResponse>(
        API_ENDPOINTS.AUTH.SETUP_2FA,
        {
          userId,
          type: 'EMAIL',
        }
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể thiết lập Email OTP. Vui lòng thử lại.'
      );
    }
  }

  async verify2FA(request: Verify2FARequest): Promise<Verify2FAResponse> {
    try {
      const response = await apiClient.post<Verify2FAResponse>(
        API_ENDPOINTS.AUTH.VERIFY_2FA,
        request
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Xác thực 2FA thất bại. Vui lòng thử lại.'
      );
    }
  }

  async disable2FA(request: Disable2FARequest): Promise<Disable2FAResponse> {
    try {
      const endpoint = `${API_ENDPOINTS.AUTH.DISABLE_2FA}?userId=${encodeURIComponent(request.userId)}&type=${request.type}`;
      const response = await apiClient.delete<Disable2FAResponse>(endpoint);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Tắt 2FA thất bại. Vui lòng thử lại.'
      );
    }
  }

  async changePassword(request: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    try {
      const response = await apiClient.post<ChangePasswordResponse>(
        API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
        request
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại.'
      );
    }
  }

  async getRecoveryCodes(): Promise<RecoveryCodesResponse> {
    try {
      const response = await apiClient.get<RecoveryCodesResponse>(
        API_ENDPOINTS.AUTH.RECOVERY_CODES
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Lấy recovery codes thất bại. Vui lòng thử lại.'
      );
    }
  }
}

export const authService: AuthService = new AuthServiceImpl();

