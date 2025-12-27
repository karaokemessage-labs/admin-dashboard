import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
  CreateRoleRequestDto,
  RoleResponseDto,
  GetRolesResponseDto,
  CreatePermissionRequestDto,
  PermissionResponseDto,
  AssignRolesToUserRequestDto,
} from '../types/api';

export interface RbacService {
  // Roles
  createRole: (data: CreateRoleRequestDto) => Promise<RoleResponseDto>;
  getRoles: (page?: number, limit?: number) => Promise<GetRolesResponseDto>;
  getRole: (id: string) => Promise<RoleResponseDto>;
  // Permissions
  createPermission: (data: CreatePermissionRequestDto) => Promise<PermissionResponseDto>;
  // User roles
  assignRolesToUser: (userId: string, data: AssignRolesToUserRequestDto) => Promise<void>;
}

class RbacServiceImpl implements RbacService {
  async createRole(data: CreateRoleRequestDto): Promise<RoleResponseDto> {
    try {
      const response = await apiClient.post<RoleResponseDto>(
        API_ENDPOINTS.RBAC.ROLES,
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Tạo vai trò thất bại. Vui lòng thử lại.'
      );
    }
  }

  async getRoles(page: number = 1, limit: number = 10): Promise<GetRolesResponseDto> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await apiClient.get<GetRolesResponseDto>(
        `${API_ENDPOINTS.RBAC.ROLES}?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy danh sách vai trò. Vui lòng thử lại.'
      );
    }
  }

  async getRole(id: string): Promise<RoleResponseDto> {
    try {
      const response = await apiClient.get<RoleResponseDto>(
        API_ENDPOINTS.RBAC.ROLE_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thông tin vai trò. Vui lòng thử lại.'
      );
    }
  }

  async createPermission(data: CreatePermissionRequestDto): Promise<PermissionResponseDto> {
    try {
      const response = await apiClient.post<PermissionResponseDto>(
        API_ENDPOINTS.RBAC.PERMISSIONS,
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Tạo quyền thất bại. Vui lòng thử lại.'
      );
    }
  }

  async assignRolesToUser(userId: string, data: AssignRolesToUserRequestDto): Promise<void> {
    try {
      await apiClient.post(
        API_ENDPOINTS.RBAC.ASSIGN_ROLES_TO_USER(userId),
        data
      );
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Gán vai trò cho người dùng thất bại. Vui lòng thử lại.'
      );
    }
  }
}

export const rbacService: RbacService = new RbacServiceImpl();

