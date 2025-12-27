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
  getUsers: (page?: number, limit?: number) => Promise<GetUsersResponseDto>;
  getUser: (id: string) => Promise<UserResponseDto>;
  updateUser: (id: string, data: UpdateUserRequestDto) => Promise<UserResponseDto>;
  deleteUser: (id: string) => Promise<void>;
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

  async getUsers(page: number = 1, limit: number = 10): Promise<GetUsersResponseDto> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await apiClient.get<GetUsersResponseDto>(
        `${API_ENDPOINTS.USERS.BASE}?${params.toString()}`
      );
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
      const response = await apiClient.put<UserResponseDto>(
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
}

export const userService: UserService = new UserServiceImpl();

