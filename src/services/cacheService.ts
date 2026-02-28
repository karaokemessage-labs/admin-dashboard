import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface CacheEntry {
    key: string;
    value: any;
    ttl: number;
}

export interface CacheListData {
    totalKeys: number;
    entries: CacheEntry[];
}

export interface CacheService {
    getAllCache: (pattern?: string) => Promise<CacheListData>;
    getCacheByKey: (key: string) => Promise<CacheEntry>;
    deleteCacheByKey: (key: string) => Promise<{ key: string }>;
    clearAllCache: () => Promise<null>;
}

class CacheServiceImpl implements CacheService {
    async getAllCache(pattern?: string): Promise<CacheListData> {
        try {
            const params = pattern ? `?pattern=${encodeURIComponent(pattern)}` : '';
            const response = await apiClient.get<CacheListData>(
                `${API_ENDPOINTS.CACHE.BASE}${params}`
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            console.error('Error fetching cache entries:', apiError);
            throw new Error(
                apiError.message || 'Không thể lấy danh sách cache. Vui lòng thử lại.'
            );
        }
    }

    async getCacheByKey(key: string): Promise<CacheEntry> {
        try {
            const response = await apiClient.get<CacheEntry>(
                API_ENDPOINTS.CACHE.BY_KEY(key)
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            console.error('Error fetching cache entry:', apiError);
            throw new Error(
                apiError.message || 'Không thể lấy cache entry. Vui lòng thử lại.'
            );
        }
    }

    async deleteCacheByKey(key: string): Promise<{ key: string }> {
        try {
            const response = await apiClient.delete<{ key: string }>(
                API_ENDPOINTS.CACHE.BY_KEY(key)
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            console.error('Error deleting cache entry:', apiError);
            throw new Error(
                apiError.message || 'Không thể xóa cache entry. Vui lòng thử lại.'
            );
        }
    }

    async clearAllCache(): Promise<null> {
        try {
            const response = await apiClient.delete<null>(API_ENDPOINTS.CACHE.BASE);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            console.error('Error clearing all cache:', apiError);
            throw new Error(
                apiError.message || 'Không thể xóa toàn bộ cache. Vui lòng thử lại.'
            );
        }
    }
}

export const cacheService: CacheService = new CacheServiceImpl();
