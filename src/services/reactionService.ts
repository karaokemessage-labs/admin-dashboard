import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
    AddReactionRequestDto,
    ReactionResponseDto,
    ReactionListResponseDto,
    ReactionStatsResponseDto,
    ReactionType,
    PaginationParams,
} from '../types/api';

export interface ReactionService {
    addReaction: (articleId: string, type: ReactionType) => Promise<ReactionResponseDto>;
    removeReaction: (articleId: string) => Promise<void>;
    getReactions: (articleId: string, params?: PaginationParams) => Promise<ReactionListResponseDto>;
    getReactionStats: (articleId: string) => Promise<ReactionStatsResponseDto>;
}

class ReactionServiceImpl implements ReactionService {
    async addReaction(articleId: string, type: ReactionType): Promise<ReactionResponseDto> {
        try {
            const response = await apiClient.post<ReactionResponseDto>(
                API_ENDPOINTS.REACTIONS.BY_ARTICLE(articleId),
                { type } as AddReactionRequestDto
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Thêm reaction thất bại');
        }
    }

    async removeReaction(articleId: string): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.REACTIONS.BY_ARTICLE(articleId));
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Xóa reaction thất bại');
        }
    }

    async getReactions(articleId: string, params: PaginationParams = {}): Promise<ReactionListResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());

            const endpoint = queryParams.toString()
                ? `${API_ENDPOINTS.REACTIONS.BY_ARTICLE(articleId)}?${queryParams.toString()}`
                : API_ENDPOINTS.REACTIONS.BY_ARTICLE(articleId);

            const response = await apiClient.get<ReactionListResponseDto>(endpoint);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách reactions thất bại');
        }
    }

    async getReactionStats(articleId: string): Promise<ReactionStatsResponseDto> {
        try {
            const response = await apiClient.get<ReactionStatsResponseDto>(
                API_ENDPOINTS.REACTIONS.STATS(articleId)
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy thống kê reactions thất bại');
        }
    }
}

export const reactionService: ReactionService = new ReactionServiceImpl();
