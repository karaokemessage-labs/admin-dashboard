import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface CreateKaraokeRequest {
  name: string;
  email: string;
  description?: string;
}

export interface UpdateKaraokeRequest {
  name?: string;
  email?: string;
  description?: string;
  status?: string;
}

export interface Karaoke {
  id: string;
  name: string;
  email: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface CreateKaraokeResponse {
  success?: boolean;
  message?: string;
  data?: Karaoke;
  [key: string]: any;
}

export interface GetKaraokeResponse {
  success?: boolean;
  message?: string;
  data?: Karaoke | Karaoke[];
  [key: string]: any;
}

export interface KaraokeService {
  createKaraoke: (data: CreateKaraokeRequest) => Promise<CreateKaraokeResponse>;
  getKaraoke: (id: string) => Promise<GetKaraokeResponse>;
  getKaraokes: (page?: number, pageSize?: number) => Promise<{ karaokes: Karaoke[]; page: number; total: number }>;
  updateKaraoke: (id: string, data: UpdateKaraokeRequest) => Promise<CreateKaraokeResponse>;
  deleteKaraoke: (id: string) => Promise<void>;
}

class KaraokeServiceImpl implements KaraokeService {
  async createKaraoke(data: CreateKaraokeRequest): Promise<CreateKaraokeResponse> {
    try {
      console.log('Creating karaoke with data:', data);
      const response = await apiClient.post<CreateKaraokeResponse>(
        API_ENDPOINTS.KARAOKE.BASE,
        {
          name: data.name,
          email: data.email,
          description: data.description,
        }
      );
      
      console.log('Create karaoke response:', response);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error creating karaoke:', apiError);
      throw new Error(
        apiError.message || 'Tạo Karaoke thất bại. Vui lòng thử lại.'
      );
    }
  }

  async getKaraoke(id: string): Promise<GetKaraokeResponse> {
    try {
      const response = await apiClient.get<GetKaraokeResponse>(
        API_ENDPOINTS.KARAOKE.BY_ID(id)
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thông tin Karaoke. Vui lòng thử lại.'
      );
    }
  }

  async getKaraokes(page: number = 1, limit: number = 10): Promise<{ karaokes: Karaoke[]; page: number; total: number }> {
    try {
      console.log('Fetching karaokes with page:', page, 'limit:', limit);
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await apiClient.get<GetKaraokeResponse>(
        `${API_ENDPOINTS.KARAOKE.BASE}?${params.toString()}`
      );
      
      console.log('Get karaokes response:', response);
      
      // Handle different response formats
      const responseData = response.data;
      let karaokes: Karaoke[] = [];
      let total = 0;
      let currentPage = page;

      if (Array.isArray(responseData)) {
        karaokes = responseData;
        total = responseData.length;
      } else if (responseData?.data) {
        if (Array.isArray(responseData.data)) {
          karaokes = responseData.data;
          total = responseData.total || responseData.data.length;
          currentPage = responseData.page || page;
        } else {
          karaokes = [responseData.data];
          total = 1;
        }
      } else if (responseData?.items) {
        karaokes = responseData.items;
        total = responseData.total || responseData.items.length;
        currentPage = responseData.page || page;
      }

      console.log('Processed karaokes:', { karaokes, page: currentPage, total });

      return {
        karaokes,
        page: currentPage,
        total,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching karaokes:', apiError);
      throw new Error(
        apiError.message || 'Không thể lấy danh sách Karaoke. Vui lòng thử lại.'
      );
    }
  }

  async updateKaraoke(id: string, data: UpdateKaraokeRequest): Promise<CreateKaraokeResponse> {
    try {
      console.log('Calling updateKaraoke API for id:', id, 'with data:', data);
      const response = await apiClient.put<CreateKaraokeResponse>(
        API_ENDPOINTS.KARAOKE.BY_ID(id),
        data
      );
      console.log('updateKaraoke API response:', response);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('updateKaraoke API error:', apiError);
      throw new Error(
        apiError.message || 'Cập nhật Karaoke thất bại. Vui lòng thử lại.'
      );
    }
  }

  async deleteKaraoke(id: string): Promise<void> {
    try {
      console.log('Calling deleteKaraoke API for id:', id);
      const response = await apiClient.delete(API_ENDPOINTS.KARAOKE.BY_ID(id));
      console.log('deleteKaraoke API response:', response);
    } catch (error) {
      const apiError = error as ApiError;
      console.error('deleteKaraoke API error:', apiError);
      throw new Error(
        apiError.message || 'Xóa Karaoke thất bại. Vui lòng thử lại.'
      );
    }
  }
}

export const karaokeService: KaraokeService = new KaraokeServiceImpl();

