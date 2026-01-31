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
  getFacilities: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    type?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => Promise<GetFacilitiesResponseDto>;
  getFacility: (id: string) => Promise<FacilityResponseDto>;
  updateFacility: (id: string, data: UpdateFacilityRequestDto) => Promise<FacilityResponseDto>;
  deleteFacility: (id: string) => Promise<void>;
  activateFacility: (id: string) => Promise<FacilityResponseDto>;
  deactivateFacility: (id: string) => Promise<FacilityResponseDto>;
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

  async getFacilities(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    type?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<GetFacilitiesResponseDto> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.search) searchParams.append('search', params.search);
      if (params?.status) searchParams.append('status', params.status);
      if (params?.type) searchParams.append('type', params.type);
      if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.append('sortOrder', params.sortOrder);

      const queryString = searchParams.toString();
      const endpoint = queryString
        ? `${API_ENDPOINTS.FACILITIES.BASE}?${queryString}`
        : API_ENDPOINTS.FACILITIES.BASE;

      const response = await apiClient.get<GetFacilitiesResponseDto>(endpoint);
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

  async activateFacility(id: string): Promise<FacilityResponseDto> {
    try {
      const response = await apiClient.patch<FacilityResponseDto>(
        API_ENDPOINTS.FACILITIES.BY_ID(id),
        { status: 'ACTIVE' }
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Kích hoạt cơ sở vật chất thất bại. Vui lòng thử lại.'
      );
    }
  }

  async deactivateFacility(id: string): Promise<FacilityResponseDto> {
    try {
      const response = await apiClient.patch<FacilityResponseDto>(
        API_ENDPOINTS.FACILITIES.BY_ID(id),
        { status: 'INACTIVE' }
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Vô hiệu hóa cơ sở vật chất thất bại. Vui lòng thử lại.'
      );
    }
  }
}

export const facilityService: FacilityService = new FacilityServiceImpl();
