import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import { DashboardStatsResponseDto } from '../types/api';

export interface AdminService {
  getDashboardStats: (startDate?: string, endDate?: string) => Promise<DashboardStatsResponseDto>;
}

class AdminServiceImpl implements AdminService {
  async getDashboardStats(startDate?: string, endDate?: string): Promise<DashboardStatsResponseDto> {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const queryString = params.toString();
      const endpoint = queryString 
        ? `${API_ENDPOINTS.ADMIN.DASHBOARD_STATS}?${queryString}`
        : API_ENDPOINTS.ADMIN.DASHBOARD_STATS;
        
      const response = await apiClient.get<DashboardStatsResponseDto>(endpoint);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thống kê dashboard. Vui lòng thử lại.'
      );
    }
  }
}

export const adminService: AdminService = new AdminServiceImpl();

