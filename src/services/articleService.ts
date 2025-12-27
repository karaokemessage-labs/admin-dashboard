import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
  CreateArticleRequestDto,
  UpdateArticleRequestDto,
  ArticleResponseDto,
  GetArticlesResponseDto,
  ArticleStatus,
} from '../types/api';

export interface ArticleService {
  createArticle: (data: CreateArticleRequestDto) => Promise<ArticleResponseDto>;
  getArticles: (params?: {
    page?: number;
    limit?: number;
    status?: ArticleStatus;
  }) => Promise<GetArticlesResponseDto>;
  getArticle: (id: string) => Promise<ArticleResponseDto>;
  getArticleBySlug: (slug: string) => Promise<ArticleResponseDto>;
  updateArticle: (id: string, data: UpdateArticleRequestDto) => Promise<ArticleResponseDto>;
  deleteArticle: (id: string) => Promise<void>;
  publishArticle: (id: string) => Promise<ArticleResponseDto>;
}

class ArticleServiceImpl implements ArticleService {
  async createArticle(data: CreateArticleRequestDto): Promise<ArticleResponseDto> {
    try {
      const response = await apiClient.post<ArticleResponseDto>(
        API_ENDPOINTS.ARTICLES.BASE,
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Tạo bài viết thất bại. Vui lòng thử lại.'
      );
    }
  }

  async getArticles(params?: {
    page?: number;
    limit?: number;
    status?: ArticleStatus;
  }): Promise<GetArticlesResponseDto> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.status) searchParams.append('status', params.status);
      
      const queryString = searchParams.toString();
      const endpoint = queryString
        ? `${API_ENDPOINTS.ARTICLES.BASE}?${queryString}`
        : API_ENDPOINTS.ARTICLES.BASE;
        
      const response = await apiClient.get<GetArticlesResponseDto>(endpoint);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy danh sách bài viết. Vui lòng thử lại.'
      );
    }
  }

  async getArticle(id: string): Promise<ArticleResponseDto> {
    try {
      const response = await apiClient.get<ArticleResponseDto>(
        API_ENDPOINTS.ARTICLES.BY_ID(id)
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thông tin bài viết. Vui lòng thử lại.'
      );
    }
  }

  async getArticleBySlug(slug: string): Promise<ArticleResponseDto> {
    try {
      const response = await apiClient.get<ArticleResponseDto>(
        API_ENDPOINTS.ARTICLES.BY_SLUG(slug)
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thông tin bài viết. Vui lòng thử lại.'
      );
    }
  }

  async updateArticle(id: string, data: UpdateArticleRequestDto): Promise<ArticleResponseDto> {
    try {
      const response = await apiClient.put<ArticleResponseDto>(
        API_ENDPOINTS.ARTICLES.BY_ID(id),
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Cập nhật bài viết thất bại. Vui lòng thử lại.'
      );
    }
  }

  async deleteArticle(id: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.ARTICLES.BY_ID(id));
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Xóa bài viết thất bại. Vui lòng thử lại.'
      );
    }
  }

  async publishArticle(id: string): Promise<ArticleResponseDto> {
    try {
      const response = await apiClient.post<ArticleResponseDto>(
        API_ENDPOINTS.ARTICLES.PUBLISH(id)
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Xuất bản bài viết thất bại. Vui lòng thử lại.'
      );
    }
  }
}

export const articleService: ArticleService = new ArticleServiceImpl();

