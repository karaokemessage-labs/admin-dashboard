import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
  SystemSettingsResponseDto,
  UpdateSystemSettingsRequestDto,
} from '../types/api';

export interface SystemSettingsService {
  getSystemSettings: () => Promise<SystemSettingsResponseDto>;
  updateSystemSettings: (data: UpdateSystemSettingsRequestDto) => Promise<SystemSettingsResponseDto>;
}

class SystemSettingsServiceImpl implements SystemSettingsService {
  async getSystemSettings(): Promise<SystemSettingsResponseDto> {
    try {
      const response = await apiClient.get<SystemSettingsResponseDto>(
        API_ENDPOINTS.SYSTEM_SETTINGS.BASE
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy cài đặt hệ thống. Vui lòng thử lại.'
      );
    }
  }

  async updateSystemSettings(
    data: UpdateSystemSettingsRequestDto
  ): Promise<SystemSettingsResponseDto> {
    try {
      const response = await apiClient.put<SystemSettingsResponseDto>(
        API_ENDPOINTS.SYSTEM_SETTINGS.BASE,
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể cập nhật cài đặt hệ thống. Vui lòng thử lại.'
      );
    }
  }
}

export const systemSettingsService: SystemSettingsService = new SystemSettingsServiceImpl();

