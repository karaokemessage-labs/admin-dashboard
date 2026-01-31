import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
    SendFriendRequestRequestDto,
    FriendRequestResponseDto,
    FriendshipResponseDto,
    GetFriendRequestsResponseDto,
    GetFriendsResponseDto,
    PaginationParams,
} from '../types/api';

export interface FriendService {
    // Friend Requests
    sendFriendRequest: (receiverId: string) => Promise<FriendRequestResponseDto>;
    getFriendRequests: (type?: 'sent' | 'received', params?: PaginationParams) => Promise<GetFriendRequestsResponseDto>;
    acceptFriendRequest: (requestId: string) => Promise<FriendshipResponseDto>;
    rejectFriendRequest: (requestId: string) => Promise<FriendRequestResponseDto>;
    cancelFriendRequest: (requestId: string) => Promise<FriendRequestResponseDto>;

    // Friends List
    getFriends: (params?: PaginationParams) => Promise<GetFriendsResponseDto>;
    unfriend: (friendId: string) => Promise<void>;
}

class FriendServiceImpl implements FriendService {
    async sendFriendRequest(receiverId: string): Promise<FriendRequestResponseDto> {
        try {
            const response = await apiClient.post<FriendRequestResponseDto>(
                API_ENDPOINTS.FRIENDS.REQUESTS,
                { receiverId } as SendFriendRequestRequestDto
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Gửi lời mời kết bạn thất bại');
        }
    }

    async getFriendRequests(
        type: 'sent' | 'received' = 'received',
        params: PaginationParams = {}
    ): Promise<GetFriendRequestsResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('type', type);
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());

            const response = await apiClient.get<GetFriendRequestsResponseDto>(
                `${API_ENDPOINTS.FRIENDS.REQUESTS}?${queryParams.toString()}`
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách lời mời kết bạn thất bại');
        }
    }

    async acceptFriendRequest(requestId: string): Promise<FriendshipResponseDto> {
        try {
            const response = await apiClient.post<FriendshipResponseDto>(
                API_ENDPOINTS.FRIENDS.ACCEPT_REQUEST(requestId),
                ''
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Chấp nhận lời mời kết bạn thất bại');
        }
    }

    async rejectFriendRequest(requestId: string): Promise<FriendRequestResponseDto> {
        try {
            const response = await apiClient.post<FriendRequestResponseDto>(
                API_ENDPOINTS.FRIENDS.REJECT_REQUEST(requestId),
                ''
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Từ chối lời mời kết bạn thất bại');
        }
    }

    async cancelFriendRequest(requestId: string): Promise<FriendRequestResponseDto> {
        try {
            const response = await apiClient.delete<FriendRequestResponseDto>(
                API_ENDPOINTS.FRIENDS.REQUEST_BY_ID(requestId)
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Hủy lời mời kết bạn thất bại');
        }
    }

    async getFriends(params: PaginationParams = {}): Promise<GetFriendsResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());

            const endpoint = queryParams.toString()
                ? `${API_ENDPOINTS.FRIENDS.LIST}?${queryParams.toString()}`
                : API_ENDPOINTS.FRIENDS.LIST;

            const response = await apiClient.get<GetFriendsResponseDto>(endpoint);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách bạn bè thất bại');
        }
    }

    async unfriend(friendId: string): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.FRIENDS.BY_ID(friendId));
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Hủy kết bạn thất bại');
        }
    }
}

export const friendService: FriendService = new FriendServiceImpl();
