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

export interface UpdateRoleRequestDto {
  title?: string;
  description?: string;
  content?: string;
  active?: boolean;
}

export interface UpdatePermissionRequestDto {
  title?: string;
  description?: string;
  content?: string;
  active?: boolean;
}

export interface GetPermissionsResponseDto {
  data: PermissionResponseDto[];
  total: number;
  page: number;
  limit: number;
}

export interface RbacService {
  // Roles
  createRole: (data: CreateRoleRequestDto) => Promise<RoleResponseDto>;
  getRoles: (page?: number, limit?: number) => Promise<GetRolesResponseDto>;
  getRole: (id: string) => Promise<RoleResponseDto>;
  updateRole: (id: string, data: UpdateRoleRequestDto) => Promise<RoleResponseDto>;
  deleteRole: (id: string) => Promise<void>;

  // Permissions
  createPermission: (data: CreatePermissionRequestDto) => Promise<PermissionResponseDto>;
  getPermissions: (page?: number, limit?: number) => Promise<GetPermissionsResponseDto>;
  getPermission: (id: string) => Promise<PermissionResponseDto>;
  updatePermission: (id: string, data: UpdatePermissionRequestDto) => Promise<PermissionResponseDto>;
  deletePermission: (id: string) => Promise<void>;

  // User roles
  assignRolesToUser: (userId: string, data: AssignRolesToUserRequestDto) => Promise<void>;
  getUserRoles: (userId: string) => Promise<RoleResponseDto[]>;
  removeRoleFromUser: (userId: string, roleId: string) => Promise<void>;
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

  async updateRole(id: string, data: UpdateRoleRequestDto): Promise<RoleResponseDto> {
    try {
      const response = await apiClient.patch<RoleResponseDto>(
        API_ENDPOINTS.RBAC.ROLE_BY_ID(id),
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Cập nhật vai trò thất bại. Vui lòng thử lại.'
      );
    }
  }

  async deleteRole(id: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.RBAC.ROLE_BY_ID(id));
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Xóa vai trò thất bại. Vui lòng thử lại.'
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

  async getPermissions(page: number = 1, limit: number = 10): Promise<GetPermissionsResponseDto> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await apiClient.get<GetPermissionsResponseDto>(
        `${API_ENDPOINTS.RBAC.PERMISSIONS}?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy danh sách quyền. Vui lòng thử lại.'
      );
    }
  }

  async getPermission(id: string): Promise<PermissionResponseDto> {
    try {
      const response = await apiClient.get<PermissionResponseDto>(
        `${API_ENDPOINTS.RBAC.PERMISSIONS}/${id}`
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy thông tin quyền. Vui lòng thử lại.'
      );
    }
  }

  async updatePermission(id: string, data: UpdatePermissionRequestDto): Promise<PermissionResponseDto> {
    try {
      const response = await apiClient.patch<PermissionResponseDto>(
        `${API_ENDPOINTS.RBAC.PERMISSIONS}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Cập nhật quyền thất bại. Vui lòng thử lại.'
      );
    }
  }

  async deletePermission(id: string): Promise<void> {
    try {
      await apiClient.delete(`${API_ENDPOINTS.RBAC.PERMISSIONS}/${id}`);
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Xóa quyền thất bại. Vui lòng thử lại.'
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

  async getUserRoles(userId: string): Promise<RoleResponseDto[]> {
    try {
      const response = await apiClient.get<RoleResponseDto[]>(
        API_ENDPOINTS.RBAC.ASSIGN_ROLES_TO_USER(userId)
      );
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Không thể lấy danh sách vai trò của người dùng. Vui lòng thử lại.'
      );
    }
  }

  async removeRoleFromUser(userId: string, roleId: string): Promise<void> {
    try {
      await apiClient.delete(
        `${API_ENDPOINTS.RBAC.ASSIGN_ROLES_TO_USER(userId)}/${roleId}`
      );
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(
        apiError.message || 'Xóa vai trò khỏi người dùng thất bại. Vui lòng thử lại.'
      );
    }
  }
}

export const rbacService: RbacService = new RbacServiceImpl();
