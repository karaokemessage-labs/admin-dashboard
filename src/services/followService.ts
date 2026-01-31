import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
    FollowResponseDto,
    FollowListResponseDto,
    FollowStatsResponseDto,
    FollowStatusResponseDto,
    PaginationParams,
} from '../types/api';

export interface FollowService {
    // Follow/Unfollow
    followUser: (userId: string) => Promise<FollowResponseDto>;
    unfollowUser: (userId: string) => Promise<void>;

    // Followers
    getFollowers: (params?: PaginationParams) => Promise<FollowListResponseDto>;
    getFollowersByUserId: (userId: string, params?: PaginationParams) => Promise<FollowListResponseDto>;

    // Following
    getFollowing: (params?: PaginationParams) => Promise<FollowListResponseDto>;
    getFollowingByUserId: (userId: string, params?: PaginationParams) => Promise<FollowListResponseDto>;

    // Stats
    getFollowStats: (userId: string) => Promise<FollowStatsResponseDto>;
    checkFollowStatus: (userId: string) => Promise<FollowStatusResponseDto>;
}

class FollowServiceImpl implements FollowService {
    async followUser(userId: string): Promise<FollowResponseDto> {
        try {
            const response = await apiClient.post<FollowResponseDto>(
                API_ENDPOINTS.FOLLOW.BY_USER(userId),
                ''
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Theo dõi người dùng thất bại');
        }
    }

    async unfollowUser(userId: string): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.FOLLOW.BY_USER(userId));
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Bỏ theo dõi người dùng thất bại');
        }
    }

    async getFollowers(params: PaginationParams = {}): Promise<FollowListResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());

            const endpoint = queryParams.toString()
                ? `${API_ENDPOINTS.FOLLOW.FOLLOWERS}?${queryParams.toString()}`
                : API_ENDPOINTS.FOLLOW.FOLLOWERS;

            const response = await apiClient.get<FollowListResponseDto>(endpoint);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách người theo dõi thất bại');
        }
    }

    async getFollowersByUserId(userId: string, params: PaginationParams = {}): Promise<FollowListResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());

            const endpoint = queryParams.toString()
                ? `${API_ENDPOINTS.FOLLOW.FOLLOWERS_BY_USER(userId)}?${queryParams.toString()}`
                : API_ENDPOINTS.FOLLOW.FOLLOWERS_BY_USER(userId);

            const response = await apiClient.get<FollowListResponseDto>(endpoint);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách người theo dõi thất bại');
        }
    }

    async getFollowing(params: PaginationParams = {}): Promise<FollowListResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());

            const endpoint = queryParams.toString()
                ? `${API_ENDPOINTS.FOLLOW.FOLLOWING}?${queryParams.toString()}`
                : API_ENDPOINTS.FOLLOW.FOLLOWING;

            const response = await apiClient.get<FollowListResponseDto>(endpoint);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách đang theo dõi thất bại');
        }
    }

    async getFollowingByUserId(userId: string, params: PaginationParams = {}): Promise<FollowListResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());

            const endpoint = queryParams.toString()
                ? `${API_ENDPOINTS.FOLLOW.FOLLOWING_BY_USER(userId)}?${queryParams.toString()}`
                : API_ENDPOINTS.FOLLOW.FOLLOWING_BY_USER(userId);

            const response = await apiClient.get<FollowListResponseDto>(endpoint);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách đang theo dõi thất bại');
        }
    }

    async getFollowStats(userId: string): Promise<FollowStatsResponseDto> {
        try {
            const response = await apiClient.get<FollowStatsResponseDto>(
                API_ENDPOINTS.FOLLOW.STATS(userId)
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy thống kê theo dõi thất bại');
        }
    }

    async checkFollowStatus(userId: string): Promise<FollowStatusResponseDto> {
        try {
            const response = await apiClient.get<FollowStatusResponseDto>(
                API_ENDPOINTS.FOLLOW.STATUS(userId)
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Kiểm tra trạng thái theo dõi thất bại');
        }
    }
}

export const followService: FollowService = new FollowServiceImpl();
