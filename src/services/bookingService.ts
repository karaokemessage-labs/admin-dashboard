import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
  CreateBookingRequestDto,
  BookingResponseDto,
  GetBookingsResponseDto,
  BookingStatus,
} from '../types/api';

export interface BookingService {
  createBooking: (data: CreateBookingRequestDto) => Promise<BookingResponseDto>;
  getBookings: (params?: {
    userId?: string;
    facilityId?: string;
    status?: BookingStatus;
    page?: number;
    limit?: number;
  }) => Promise<GetBookingsResponseDto>;
  getBooking: (id: string) => Promise<BookingResponseDto>;
}

class BookingServiceImpl implements BookingService {
  async createBooking(data: CreateBookingRequestDto): Promise<BookingResponseDto> {
    try {
      const response = await apiClient.post<BookingResponseDto>(
        API_ENDPOINTS.BOOKINGS.BASE,
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Tạo đặt chỗ thất bại. Vui lòng thử lại.'
      );
    }
  }

  async getBookings(params?: {
    userId?: string;
    facilityId?: string;
    status?: BookingStatus;
    page?: number;
    limit?: number;
  }): Promise<GetBookingsResponseDto> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.userId) searchParams.append('userId', params.userId);
      if (params?.facilityId) searchParams.append('facilityId', params.facilityId);
      if (params?.status) searchParams.append('status', params.status);
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      
      const queryString = searchParams.toString();
      const endpoint = queryString
        ? `${API_ENDPOINTS.BOOKINGS.BASE}?${queryString}`
        : API_ENDPOINTS.BOOKINGS.BASE;
        
      const response = await apiClient.get<GetBookingsResponseDto>(endpoint);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy danh sách đặt chỗ. Vui lòng thử lại.'
      );
    }
  }

  async getBooking(id: string): Promise<BookingResponseDto> {
    try {
      const response = await apiClient.get<BookingResponseDto>(
        API_ENDPOINTS.BOOKINGS.BY_ID(id)
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thông tin đặt chỗ. Vui lòng thử lại.'
      );
    }
  }
}

export const bookingService: BookingService = new BookingServiceImpl();

