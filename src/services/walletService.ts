import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import { UpdateBalanceDto, BalanceResponse, SuccessResponseDto } from '../types/api';

export interface WalletService {
  getBalance: (userId: string) => Promise<BalanceResponse>;
  creditBalance: (data: UpdateBalanceDto) => Promise<SuccessResponseDto>;
  debitBalance: (data: UpdateBalanceDto) => Promise<SuccessResponseDto>;
}

class WalletServiceImpl implements WalletService {
  async getBalance(userId: string): Promise<BalanceResponse> {
    try {
      const response = await apiClient.get<BalanceResponse>(
        `${API_ENDPOINTS.WALLET.BALANCE}?user_id=${encodeURIComponent(userId)}`
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy số dư. Vui lòng thử lại.'
      );
    }
  }

  async creditBalance(data: UpdateBalanceDto): Promise<SuccessResponseDto> {
    try {
      // The API returns SuccessResponseDto, but apiClient extracts the inner data field
      // So we need to post without type, or handle the response structure properly
      const response = await apiClient.post<any>(
        API_ENDPOINTS.WALLET.CREDIT_BALANCE,
        data
      );
      // If apiClient extracted data, response.data is the inner data
      // If not, response.data is the full response
      // For consistency, we return SuccessResponseDto structure
      return { success: true, data: response.data || {}, message: response.message };
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Nạp tiền thất bại. Vui lòng thử lại.'
      );
    }
  }

  async debitBalance(data: UpdateBalanceDto): Promise<SuccessResponseDto> {
    try {
      // The API returns SuccessResponseDto, but apiClient extracts the inner data field
      // So we need to post without type, or handle the response structure properly
      const response = await apiClient.post<any>(
        API_ENDPOINTS.WALLET.DEBIT_BALANCE,
        data
      );
      // If apiClient extracted data, response.data is the inner data
      // If not, response.data is the full response
      // For consistency, we return SuccessResponseDto structure
      return { success: true, data: response.data || {}, message: response.message };
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Trừ tiền thất bại. Vui lòng thử lại.'
      );
    }
  }
}

export const walletService: WalletService = new WalletServiceImpl();

