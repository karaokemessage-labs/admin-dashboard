import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface CreateMassageRequest {
  name: string;
  code: string;
  email: string;
}

export interface UpdateMassageRequest {
  name?: string;
  code?: string;
  email?: string;
  status?: string;
}

export interface Massage {
  id: string;
  name: string;
  code: string;
  email: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  [key: string]: any;
}

export interface CreateMassageResponse {
  success?: boolean;
  message?: string;
  data?: Massage;
  [key: string]: any;
}

export interface GetMassageResponse {
  success?: boolean;
  message?: string;
  data?: Massage | Massage[];
  [key: string]: any;
}

export interface MassageService {
  createMassage: (data: CreateMassageRequest) => Promise<CreateMassageResponse>;
  getMassage: (id: string) => Promise<GetMassageResponse>;
  getMassages: (page?: number, pageSize?: number) => Promise<{ massages: Massage[]; page: number; total: number }>;
  updateMassage: (id: string, data: UpdateMassageRequest) => Promise<CreateMassageResponse>;
  deleteMassage: (id: string) => Promise<void>;
}

class MassageServiceImpl implements MassageService {
  async createMassage(data: CreateMassageRequest): Promise<CreateMassageResponse> {
    try {
      console.log('Calling createMassage API with data:', data);
      const response = await apiClient.post<CreateMassageResponse>(
        API_ENDPOINTS.MASSAGE.BASE,
        {
          name: data.name,
          code: data.code,
          email: data.email,
        }
      );
      
      console.log('Create massage response:', response);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error creating massage:', apiError);
      throw new Error(
        apiError.message || 'Tạo Massage thất bại. Vui lòng thử lại.'
      );
    }
  }

  async getMassage(id: string): Promise<GetMassageResponse> {
    try {
      const response = await apiClient.get<GetMassageResponse>(
        API_ENDPOINTS.MASSAGE.BY_ID(id)
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thông tin Massage. Vui lòng thử lại.'
      );
    }
  }

  async getMassages(page: number = 1, limit: number = 10): Promise<{ massages: Massage[]; page: number; total: number }> {
    try {
      console.log('Fetching massages with page:', page, 'limit:', limit);
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await apiClient.get<GetMassageResponse>(
        `${API_ENDPOINTS.MASSAGE.BASE}?${params.toString()}`
      );
      
      console.log('Get massages response:', response);
      
      // Handle different response formats
      const responseData = response.data;
      let massages: Massage[] = [];
      let total = 0;
      let currentPage = page;

      if (Array.isArray(responseData)) {
        massages = responseData;
        total = responseData.length;
      } else if (responseData?.data) {
        if (Array.isArray(responseData.data)) {
          massages = responseData.data;
          total = responseData.total || responseData.data.length;
          currentPage = responseData.page || page;
        } else {
          massages = [responseData.data];
          total = 1;
        }
      } else if (responseData?.items) {
        massages = responseData.items;
        total = responseData.total || responseData.items.length;
        currentPage = responseData.page || page;
      }

      console.log('Processed massages:', { massages, page: currentPage, total });

      return {
        massages,
        page: currentPage,
        total,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching massages:', apiError);
      throw new Error(
        apiError.message || 'Không thể lấy danh sách Massage. Vui lòng thử lại.'
      );
    }
  }

  async updateMassage(id: string, data: UpdateMassageRequest): Promise<CreateMassageResponse> {
    try {
      console.log('Calling updateMassage API for id:', id, 'with data:', data);
      const response = await apiClient.put<CreateMassageResponse>(
        API_ENDPOINTS.MASSAGE.BY_ID(id),
        data
      );
      console.log('updateMassage API response:', response);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('updateMassage API error:', apiError);
      throw new Error(
        apiError.message || 'Cập nhật Massage thất bại. Vui lòng thử lại.'
      );
    }
  }

  async deleteMassage(id: string): Promise<void> {
    try {
      console.log('Calling deleteMassage API for id:', id);
      const response = await apiClient.delete(API_ENDPOINTS.MASSAGE.BY_ID(id));
      console.log('deleteMassage API response:', response);
    } catch (error) {
      const apiError = error as ApiError;
      console.error('deleteMassage API error:', apiError);
      throw new Error(
        apiError.message || 'Xóa Massage thất bại. Vui lòng thử lại.'
      );
    }
  }
}

export const massageService: MassageService = new MassageServiceImpl();




