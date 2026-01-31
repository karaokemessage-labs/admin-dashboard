import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
  GetUsersResponseDto,
} from '../types/api';

export interface UserService {
  createUser: (data: CreateUserRequestDto) => Promise<UserResponseDto>;
  getUsers: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    role?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => Promise<GetUsersResponseDto>;
  getUser: (id: string) => Promise<UserResponseDto>;
  updateUser: (id: string, data: UpdateUserRequestDto) => Promise<UserResponseDto>;
  deleteUser: (id: string) => Promise<void>;
  activateUser: (id: string) => Promise<UserResponseDto>;
  deactivateUser: (id: string) => Promise<UserResponseDto>;
}

class UserServiceImpl implements UserService {
  async createUser(data: CreateUserRequestDto): Promise<UserResponseDto> {
    try {
      const response = await apiClient.post<UserResponseDto>(
        API_ENDPOINTS.USERS.BASE,
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Tạo người dùng thất bại. Vui lòng thử lại.'
      );
    }
  }

  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    role?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<GetUsersResponseDto> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.search) searchParams.append('search', params.search);
      if (params?.status) searchParams.append('status', params.status);
      if (params?.role) searchParams.append('role', params.role);
      if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.append('sortOrder', params.sortOrder);

      const queryString = searchParams.toString();
      const endpoint = queryString
        ? `${API_ENDPOINTS.USERS.BASE}?${queryString}`
        : API_ENDPOINTS.USERS.BASE;

      const response = await apiClient.get<GetUsersResponseDto>(endpoint);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy danh sách người dùng. Vui lòng thử lại.'
      );
    }
  }

  async getUser(id: string): Promise<UserResponseDto> {
    try {
      const response = await apiClient.get<UserResponseDto>(
        API_ENDPOINTS.USERS.BY_ID(id)
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thông tin người dùng. Vui lòng thử lại.'
      );
    }
  }

  async updateUser(id: string, data: UpdateUserRequestDto): Promise<UserResponseDto> {
    try {
      const response = await apiClient.patch<UserResponseDto>(
        API_ENDPOINTS.USERS.BY_ID(id),
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Cập nhật người dùng thất bại. Vui lòng thử lại.'
      );
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.USERS.BY_ID(id));
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Xóa người dùng thất bại. Vui lòng thử lại.'
      );
    }
  }

  async activateUser(id: string): Promise<UserResponseDto> {
    try {
      const response = await apiClient.patch<UserResponseDto>(
        API_ENDPOINTS.USERS.BY_ID(id),
        { status: 'ACTIVE' }
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Kích hoạt người dùng thất bại. Vui lòng thử lại.'
      );
    }
  }

  async deactivateUser(id: string): Promise<UserResponseDto> {
    try {
      const response = await apiClient.patch<UserResponseDto>(
        API_ENDPOINTS.USERS.BY_ID(id),
        { status: 'INACTIVE' }
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Vô hiệu hóa người dùng thất bại. Vui lòng thử lại.'
      );
    }
  }
}

export const userService: UserService = new UserServiceImpl();
