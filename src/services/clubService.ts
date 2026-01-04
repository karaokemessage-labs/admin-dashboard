import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface CreateClubRequest {
  name: string;
  type: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
}

export interface UpdateClubRequest {
  name?: string;
  type?: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  status?: string;
}

export interface Club {
  id: string;
  name: string;
  type: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface CreateClubResponse {
  success?: boolean;
  message?: string;
  data?: Club;
  [key: string]: any;
}

export interface FacilityWithRatingsAndComments {
  facility: Club;
  ratings: Array<{
    id: string;
    rating: number;
    comment: string | null;
    articleId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }>;
  comments: Array<{
    id: string;
    content: string;
    articleId: string;
    userId: string;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  totalRatings: number;
  totalComments?: number;
  page: number;
  limit: number;
}

export interface GetClubResponse {
  success?: boolean;
  message?: string;
  data?: Club | Club[] | FacilityWithRatingsAndComments;
  [key: string]: any;
}

export interface ClubService {
  createClub: (data: CreateClubRequest) => Promise<CreateClubResponse>;
  getClub: (id: string) => Promise<GetClubResponse>;
  getClubWithRatingsAndComments: (id: string) => Promise<FacilityWithRatingsAndComments>;
  getClubs: (page?: number, pageSize?: number) => Promise<{ clubs: Club[]; page: number; total: number }>;
  updateClub: (id: string, data: UpdateClubRequest) => Promise<CreateClubResponse>;
  deleteClub: (id: string) => Promise<void>;
}

class ClubServiceImpl implements ClubService {
  async createClub(data: CreateClubRequest): Promise<CreateClubResponse> {
    try {
      console.log('Calling createClub API with data:', data);
      const response = await apiClient.post<CreateClubResponse>(
        API_ENDPOINTS.CLUBS.BASE,
        {
          name: data.name,
          type: data.type,
          address: data.address,
          phone: data.phone,
          email: data.email,
          description: data.description,
        }
      );
      
      console.log('Create club response:', response);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error creating club:', apiError);
      throw new Error(
        apiError.message || 'Tạo Club thất bại. Vui lòng thử lại.'
      );
    }
  }

  async getClub(id: string): Promise<GetClubResponse> {
    try {
      const response = await apiClient.get<GetClubResponse>(
        API_ENDPOINTS.CLUBS.BY_ID(id)
      );
      
      // Ensure response includes ratings and comments
      const data = response.data;
      if (data && typeof data === 'object' && 'data' in data && data.data && typeof data.data === 'object' && 'facility' in data.data) {
        const facilityData = data.data as any;
        return {
          ...data,
          data: {
            ...facilityData,
            comments: facilityData.comments || [],
            totalComments: facilityData.totalComments || (facilityData.comments?.length || 0),
            ratings: facilityData.ratings || [],
            totalRatings: facilityData.totalRatings || (facilityData.ratings?.length || 0),
          }
        };
      }
      
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thông tin Club. Vui lòng thử lại.'
      );
    }
  }

  async getClubWithRatingsAndComments(id: string): Promise<FacilityWithRatingsAndComments> {
    try {
      const response = await apiClient.get<{ success: boolean; data: FacilityWithRatingsAndComments; message?: string }>(
        API_ENDPOINTS.CLUBS.BY_ID(id)
      );
      
      // Ensure comments array exists even if API doesn't return it
      const data = response.data.data || response.data;
      if (data && 'facility' in data) {
        return {
          ...data,
          comments: data.comments || [],
          totalComments: data.totalComments || data.comments?.length || 0,
        };
      }
      
      // If response doesn't have the expected structure, try to extract from response.data
      if (response.data && typeof response.data === 'object' && 'facility' in response.data) {
        return {
          ...(response.data as FacilityWithRatingsAndComments),
          comments: (response.data as any).comments || [],
          totalComments: (response.data as any).totalComments || ((response.data as any).comments?.length || 0),
        };
      }
      
      throw new Error('Response format không đúng. Vui lòng thử lại.');
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thông tin Club với ratings và comments. Vui lòng thử lại.'
      );
    }
  }

  async getClubs(page: number = 1, limit: number = 10): Promise<{ clubs: Club[]; page: number; total: number }> {
    try {
      console.log('Fetching clubs with page:', page, 'limit:', limit);
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await apiClient.get<GetClubResponse>(
        `${API_ENDPOINTS.CLUBS.BASE}?${params.toString()}`
      );
      
      console.log('Get clubs response:', response);
      
      // Handle different response formats
      const responseData = response.data;
      let clubs: Club[] = [];
      let total = 0;
      let currentPage = page;

      if (Array.isArray(responseData)) {
        clubs = responseData;
        total = responseData.length;
      } else if (responseData?.data) {
        if (Array.isArray(responseData.data)) {
          clubs = responseData.data;
          total = responseData.total || responseData.data.length;
          currentPage = responseData.page || page;
        } else {
          clubs = [responseData.data];
          total = 1;
        }
      } else if (responseData?.items) {
        clubs = responseData.items;
        total = responseData.total || responseData.items.length;
        currentPage = responseData.page || page;
      }

      console.log('Processed clubs:', { clubs, page: currentPage, total });

      return {
        clubs,
        page: currentPage,
        total,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching clubs:', apiError);
      throw new Error(
        apiError.message || 'Không thể lấy danh sách Club. Vui lòng thử lại.'
      );
    }
  }

  async updateClub(id: string, data: UpdateClubRequest): Promise<CreateClubResponse> {
    try {
      console.log('Calling updateClub API for id:', id, 'with data:', data);
      const response = await apiClient.put<CreateClubResponse>(
        API_ENDPOINTS.CLUBS.BY_ID(id),
        data
      );
      console.log('updateClub API response:', response);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('updateClub API error:', apiError);
      throw new Error(
        apiError.message || 'Cập nhật Club thất bại. Vui lòng thử lại.'
      );
    }
  }

  async deleteClub(id: string): Promise<void> {
    try {
      console.log('Calling deleteClub API for id:', id);
      const response = await apiClient.delete(API_ENDPOINTS.CLUBS.BY_ID(id));
      console.log('deleteClub API response:', response);
    } catch (error) {
      const apiError = error as ApiError;
      console.error('deleteClub API error:', apiError);
      throw new Error(
        apiError.message || 'Xóa Club thất bại. Vui lòng thử lại.'
      );
    }
  }
}

export const clubService: ClubService = new ClubServiceImpl();





