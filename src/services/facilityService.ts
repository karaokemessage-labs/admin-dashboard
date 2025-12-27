import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
  CreateFacilityRequestDto,
  UpdateFacilityRequestDto,
  FacilityResponseDto,
  GetFacilitiesResponseDto,
} from '../types/api';

export interface FacilityService {
  createFacility: (data: CreateFacilityRequestDto) => Promise<FacilityResponseDto>;
  getFacilities: (page?: number, limit?: number) => Promise<GetFacilitiesResponseDto>;
  getFacility: (id: string) => Promise<FacilityResponseDto>;
  updateFacility: (id: string, data: UpdateFacilityRequestDto) => Promise<FacilityResponseDto>;
  deleteFacility: (id: string) => Promise<void>;
}

class FacilityServiceImpl implements FacilityService {
  async createFacility(data: CreateFacilityRequestDto): Promise<FacilityResponseDto> {
    try {
      const response = await apiClient.post<FacilityResponseDto>(
        API_ENDPOINTS.FACILITIES.BASE,
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Tạo cơ sở vật chất thất bại. Vui lòng thử lại.'
      );
    }
  }

  async getFacilities(page: number = 1, limit: number = 10): Promise<GetFacilitiesResponseDto> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await apiClient.get<GetFacilitiesResponseDto>(
        `${API_ENDPOINTS.FACILITIES.BASE}?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy danh sách cơ sở vật chất. Vui lòng thử lại.'
      );
    }
  }

  async getFacility(id: string): Promise<FacilityResponseDto> {
    try {
      const response = await apiClient.get<FacilityResponseDto>(
        API_ENDPOINTS.FACILITIES.BY_ID(id)
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thông tin cơ sở vật chất. Vui lòng thử lại.'
      );
    }
  }

  async updateFacility(id: string, data: UpdateFacilityRequestDto): Promise<FacilityResponseDto> {
    try {
      const response = await apiClient.put<FacilityResponseDto>(
        API_ENDPOINTS.FACILITIES.BY_ID(id),
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Cập nhật cơ sở vật chất thất bại. Vui lòng thử lại.'
      );
    }
  }

  async deleteFacility(id: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.FACILITIES.BY_ID(id));
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Xóa cơ sở vật chất thất bại. Vui lòng thử lại.'
      );
    }
  }
}

export const facilityService: FacilityService = new FacilityServiceImpl();

