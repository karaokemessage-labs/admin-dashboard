import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
  SystemSettingsResponseDto,
  UpdateSystemSettingsRequestDto,
  CreateSystemSettingRequestDto,
  UpdateSystemSettingRequestDto,
  SystemSettingResponseDto,
} from '../types/api';

export interface SystemSettingsService {
  getSystemSettings: () => Promise<SystemSettingsResponseDto>;
  updateSystemSettings: (data: UpdateSystemSettingsRequestDto) => Promise<SystemSettingsResponseDto>;
  createSystemSetting: (data: CreateSystemSettingRequestDto) => Promise<SystemSettingResponseDto>;
  updateSystemSetting: (id: string, data: UpdateSystemSettingRequestDto) => Promise<SystemSettingResponseDto>;
}

class SystemSettingsServiceImpl implements SystemSettingsService {
  async getSystemSettings(): Promise<SystemSettingsResponseDto> {
    try {
      const response = await apiClient.get<SystemSettingsResponseDto>(
        API_ENDPOINTS.SYSTEM_SETTINGS.BASE
      );
      // apiClient already handles SuccessResponseDto format and extracts data
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching system settings:', apiError);
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

  async createSystemSetting(
    data: CreateSystemSettingRequestDto
  ): Promise<SystemSettingResponseDto> {
    try {
      const response = await apiClient.post<SystemSettingResponseDto>(
        API_ENDPOINTS.SYSTEM_SETTINGS.BASE,
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error creating system setting:', apiError);
      throw new Error(
        apiError.message || 'Không thể tạo cài đặt hệ thống. Vui lòng thử lại.'
      );
    }
  }

  async updateSystemSetting(
    id: string,
    data: UpdateSystemSettingRequestDto
  ): Promise<SystemSettingResponseDto> {
    try {
      const response = await apiClient.patch<SystemSettingResponseDto>(
        API_ENDPOINTS.SYSTEM_SETTINGS.BY_ID(id),
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error updating system setting:', apiError);
      throw new Error(
        apiError.message || 'Không thể cập nhật cài đặt hệ thống. Vui lòng thử lại.'
      );
    }
  }
}

export const systemSettingsService: SystemSettingsService = new SystemSettingsServiceImpl();

