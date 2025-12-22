import { apiClient, ApiError } from './apiClient';

export interface CreateOperatorRequest {
  name: string;
  contact_email: string;
  region: string;
  admin_username: string;
  admin_display_name: string;
  admin_email: string;
  temp_password: string;
}

export interface UpdateOperatorRequest {
  name?: string;
  status?: string;
  region?: string;
}

export interface Operator {
  id: string;
  code: string;
  name: string;
  email: string;
  status?: string;
  region?: string;
  userId?: string | null;
  createdBy?: string;
  config?: any | null;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
}

export interface CreateOperatorResponse {
  data?: Operator;
  message?: string;
  status?: number;
}

export interface GetOperatorsResponse {
  success: boolean;
  message: string;
  data: {
    items: {
      id: string;
      name: string;
      status: string;
      region: string;
      created_at: number;
    }[];
    page: number;
    pageSize?: number;
    page_size?: number;
    total: number;
  };
}

export interface GetOperatorDetailResponse {
  status: string;
  message: string;
  data: Operator;
}

class OperatorService {
  private getAuthToken(): string | null {
    return localStorage.getItem('accessToken') || localStorage.getItem('token') || null;
  }

  async getOperators(page = 1, pageSize = 7): Promise<{
    operators: Operator[];
    page: number;
    pageSize: number;
    total: number;
  }> {
    try {
      const token = this.getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const endpoint = `/operators?page=${page}&pageSize=${pageSize}`;

      const response = await apiClient.get<GetOperatorsResponse>(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const apiData = response.data;

      if (!apiData.success) {
        throw new Error(apiData.message || 'Lấy danh sách Operator thất bại. Vui lòng thử lại.');
      }

      const items = apiData.data?.items || [];
      const operators: Operator[] = items.map((item) => ({
        id: item.id,
        code: '',
        name: item.name,
        email: '',
        status: item.status,
        region: item.region,
        createdAt: item.created_at ? new Date(item.created_at * 1000).toISOString() : undefined,
      }));

      const metaPage = apiData.data?.page || page;
      const metaPageSize = apiData.data?.pageSize || apiData.data?.page_size || pageSize;
      const metaTotal = apiData.data?.total ?? operators.length;

      return {
        operators,
        page: metaPage,
        pageSize: metaPageSize,
        total: metaTotal,
      };
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Lấy danh sách Operator thất bại. Vui lòng thử lại.'
      );
    }
  }

  async getOperatorDetail(operatorId: string): Promise<GetOperatorDetailResponse> {
    try {
      const token = this.getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await apiClient.get<GetOperatorDetailResponse>(
        `/operators/${operatorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Lấy thông tin chi tiết Operator thất bại. Vui lòng thử lại.'
      );
    }
  }

  async createOperator(data: CreateOperatorRequest): Promise<CreateOperatorResponse> {
    try {
      const token = this.getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await apiClient.post<CreateOperatorResponse>(
        '/operators',
        {
          name: data.name,
          contact_email: data.contact_email,
          region: data.region,
          admin_username: data.admin_username,
          admin_display_name: data.admin_display_name,
          admin_email: data.admin_email,
          temp_password: data.temp_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Tạo Operator thất bại. Vui lòng thử lại.'
      );
    }
  }

  async deleteOperator(operatorId: string): Promise<void> {
    try {
      const token = this.getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      await apiClient.delete(
        `/operators/${operatorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Xóa Operator thất bại. Vui lòng thử lại.'
      );
    }
  }

  async updateOperator(operatorId: string, data: UpdateOperatorRequest): Promise<void> {
    try {
      const token = this.getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      await apiClient.patch(
        `/operators/${operatorId}`,
        {
          name: data.name,
          status: data.status,
          region: data.region,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Cập nhật Operator thất bại. Vui lòng thử lại.'
      );
    }
  }
}

export const operatorService = new OperatorService();

