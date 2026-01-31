import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
    GetAllDataResponseDto,
    GetFacilityWithRatingsResponseDto,
    GetKaraokesResponseDto,
    GetClubsResponseDto,
    GetMassagesResponseDto,
    PaginationParams,
} from '../types/api';

export interface PublicKaraokesParams extends PaginationParams {
    status?: string;
    search?: string;
}

export interface PublicClubsParams extends PaginationParams {
    status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    search?: string;
}

export interface PublicMassagesParams extends PaginationParams {
    status?: 'ACTIVE' | 'INACTIVE';
}

export interface PublicService {
    // Public Data
    getAllFacilities: () => Promise<GetAllDataResponseDto>;
    getAllData: (params?: PaginationParams) => Promise<GetAllDataResponseDto>;
    getFacilityById: (id: string, type: 'karaoke' | 'club' | 'massage') => Promise<GetFacilityWithRatingsResponseDto>;
    getFacilityCoupons: (id: string) => Promise<{ data: any[]; total: number }>;

    // Public Lists
    getPublicKaraokes: (params?: PublicKaraokesParams) => Promise<GetKaraokesResponseDto>;
    getPublicClubs: (params?: PublicClubsParams) => Promise<GetClubsResponseDto>;
    getPublicMassages: (params?: PublicMassagesParams) => Promise<GetMassagesResponseDto>;
}

class PublicServiceImpl implements PublicService {
    async getAllFacilities(): Promise<GetAllDataResponseDto> {
        try {
            const response = await apiClient.get<GetAllDataResponseDto>(
                API_ENDPOINTS.PUBLIC.FACILITIES
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách cơ sở thất bại');
        }
    }

    async getAllData(params: PaginationParams = {}): Promise<GetAllDataResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());

            const endpoint = queryParams.toString()
                ? `${API_ENDPOINTS.PUBLIC.ALL}?${queryParams.toString()}`
                : API_ENDPOINTS.PUBLIC.ALL;

            const response = await apiClient.get<GetAllDataResponseDto>(endpoint);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy dữ liệu thất bại');
        }
    }

    async getFacilityById(
        id: string,
        type: 'karaoke' | 'club' | 'massage'
    ): Promise<GetFacilityWithRatingsResponseDto> {
        try {
            const response = await apiClient.get<GetFacilityWithRatingsResponseDto>(
                `${API_ENDPOINTS.PUBLIC.FACILITY_BY_ID(id)}?type=${type}`
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy thông tin cơ sở thất bại');
        }
    }

    async getFacilityCoupons(id: string): Promise<{ data: any[]; total: number }> {
        try {
            const response = await apiClient.get<{ data: any[]; total: number }>(
                API_ENDPOINTS.PUBLIC.FACILITY_COUPONS(id)
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách coupon thất bại');
        }
    }

    async getPublicKaraokes(params: PublicKaraokesParams = {}): Promise<GetKaraokesResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());
            if (params.status) queryParams.append('status', params.status);
            if (params.search) queryParams.append('search', params.search);

            const endpoint = queryParams.toString()
                ? `${API_ENDPOINTS.PUBLIC.KARAOKES}?${queryParams.toString()}`
                : API_ENDPOINTS.PUBLIC.KARAOKES;

            const response = await apiClient.get<GetKaraokesResponseDto>(endpoint);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách karaoke thất bại');
        }
    }

    async getPublicClubs(params: PublicClubsParams = {}): Promise<GetClubsResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());
            if (params.status) queryParams.append('status', params.status);
            if (params.search) queryParams.append('search', params.search);

            const endpoint = queryParams.toString()
                ? `${API_ENDPOINTS.PUBLIC.CLUBS}?${queryParams.toString()}`
                : API_ENDPOINTS.PUBLIC.CLUBS;

            const response = await apiClient.get<GetClubsResponseDto>(endpoint);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách club thất bại');
        }
    }

    async getPublicMassages(params: PublicMassagesParams = {}): Promise<GetMassagesResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());
            if (params.status) queryParams.append('status', params.status);

            const endpoint = queryParams.toString()
                ? `${API_ENDPOINTS.PUBLIC.MASSAGES}?${queryParams.toString()}`
                : API_ENDPOINTS.PUBLIC.MASSAGES;

            const response = await apiClient.get<GetMassagesResponseDto>(endpoint);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách massage thất bại');
        }
    }
}

export const publicService: PublicService = new PublicServiceImpl();
