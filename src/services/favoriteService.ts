import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import { KaraokeFavoriteResponseDto } from '../types/api';

export interface FavoriteService {
    addKaraokeToFavorites: (karaokeId: string) => Promise<KaraokeFavoriteResponseDto>;
    removeKaraokeFromFavorites: (karaokeId: string) => Promise<void>;
}

class FavoriteServiceImpl implements FavoriteService {
    async addKaraokeToFavorites(karaokeId: string): Promise<KaraokeFavoriteResponseDto> {
        try {
            const response = await apiClient.post<KaraokeFavoriteResponseDto>(
                API_ENDPOINTS.FAVORITES.KARAOKE(karaokeId),
                ''
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Thêm vào yêu thích thất bại');
        }
    }

    async removeKaraokeFromFavorites(karaokeId: string): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.FAVORITES.KARAOKE(karaokeId));
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Xóa khỏi yêu thích thất bại');
        }
    }
}

export const favoriteService: FavoriteService = new FavoriteServiceImpl();
