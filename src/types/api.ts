// Type definitions based on OpenAPI specification

// Common Response Types
export interface SuccessResponseDto<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ErrorResponseDto {
  success: false;
  message: string;
  error: {
    code: string;
    details?: Array<{ field?: string; message: string }>;
  };
}

// Auth Types
export interface RegisterDto {
  name: string;
  email: string;
  username: string;
  password: string;
  role?: string; // Role name: "admin", "user", "partner"
}

export interface LoginDto {
  emailOrUsername: string;
  password: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

export interface AccountResponseDto {
  id: string;
  name: string;
  email: string;
  username: string;
  isActive: boolean;
  isEnable2FA: boolean;
  activeAt: string | null;
  role?: string; // Optional for backward compatibility
  roles?: Array<{ id: string; name: string }>; // Optional for roles array
  [key: string]: any; // For any additional fields from API
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Wallet Types
export interface UpdateBalanceDto {
  user_id: string;
  amount: number;
}

export interface BalanceResponse {
  balance: number;
  currency?: string;
  userId?: string;
  [key: string]: any; // For any additional fields from API
}

// Admin Types
export interface DashboardStatsResponseDto {
  revenue: RevenueStatsDto;
  bookings: BookingsStatsDto;
  activeCustomers: ActiveCustomersStatsDto;
  accessSalesChart: AccessSalesChartDto;
  trafficSources: TrafficSourceDto[];
  recentBookings: RecentBookingDto[];
}

export interface RevenueStatsDto {
  total: number;
  changePercent: number;
  currency: string;
  previousPeriod: number;
}

export interface BookingsStatsDto {
  total: number;
  changePercent: number;
  previousPeriod: number;
}

export interface ActiveCustomersStatsDto {
  current: number;
  changePercent: number;
  previousPeriod: number;
}

export interface ChartDataPointDto {
  label: string;
  value: number;
  series?: string;
}

export interface AccessSalesChartDto {
  data: ChartDataPointDto[];
  series: string[];
}

export interface TrafficSourceDto {
  source: string;
  percentage: number;
  visits: number;
}

export interface RecentBookingDto {
  id: string;
  customerName: string;
  facilityName: string;
  startTime: string;
  endTime: string;
  status: string;
  amount: number;
}

// Facility Types
export type FacilityType = 'KARAOKE' | 'MASSAGE' | 'OTHER';
export type FacilityStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'RESERVED';

export interface CreateFacilityRequestDto {
  name: string;
  type: FacilityType;
  capacity: number;
  pricePerHour: number;
  description?: string;
}

export interface UpdateFacilityRequestDto {
  name?: string;
  type?: FacilityType;
  capacity?: number;
  pricePerHour?: number;
  description?: string;
}

export interface FacilityResponseDto {
  id: string;
  name: string;
  type: FacilityType;
  status: FacilityStatus;
  capacity: number;
  pricePerHour: number;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetFacilitiesResponseDto {
  data: FacilityResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// RBAC Types
export interface CreateRoleRequestDto {
  title: string;
  slug: string;
  description?: string;
  content?: string;
}

export interface RoleResponseDto {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  active: boolean;
  content: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetRolesResponseDto {
  data: RoleResponseDto[];
  total: number;
  page: number;
  limit: number;
}

export type PermissionAction = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'MANAGE';

export interface CreatePermissionRequestDto {
  title: string;
  slug: string;
  resource: string;
  action: PermissionAction;
  description?: string;
  content?: string;
}

export interface PermissionResponseDto {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  active: boolean;
  content: string | null;
  resource: string;
  action: PermissionAction;
  createdAt: string;
  updatedAt: string;
}

export interface AssignRolesToUserRequestDto {
  roleIds: string[];
}

// Booking Types
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface CreateBookingRequestDto {
  facilityId: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  notes?: string;
}

export interface BookingResponseDto {
  id: string;
  userId: string;
  facilityId: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  totalAmount: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetBookingsResponseDto {
  data: BookingResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// User Types
export interface CreateUserRequestDto {
  name: string;
  email: string;
  username: string;
}

export interface UpdateUserRequestDto {
  name?: string;
  email?: string;
  username?: string;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  username: string;
  isActive: boolean;
  isEnable2FA: boolean;
  activeAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersResponseDto {
  users: UserResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// Article Types
export type ArticleStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface CreateArticleRequestDto {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
}

export interface UpdateArticleRequestDto {
  title?: string;
  content?: string;
  excerpt?: string;
}

export interface ArticleResponseDto {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  status: ArticleStatus;
  authorId: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetArticlesResponseDto {
  data: ArticleResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// Comment Types
export interface CreateCommentRequestDto {
  content: string;
  articleId: string;
  parentId?: string;
}

export interface UpdateCommentRequestDto {
  content: string;
}

export interface CommentResponseDto {
  id: string;
  content: string;
  articleId: string;
  userId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetCommentsResponseDto {
  data: CommentResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// Rating Types
export interface CreateRatingRequestDto {
  rating: number; // 1-5 stars
  articleId: string;
  comment?: string;
}

export interface UpdateRatingRequestDto {
  rating?: number;
  comment?: string;
}

export interface RatingResponseDto {
  id: string;
  rating: number;
  comment: string | null;
  articleId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetRatingsResponseDto {
  data: RatingResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// System Settings Types
export interface SystemSettingsResponseDto {
  general: {
    systemName: string;
    systemDescription: string;
    defaultLanguage: string;
  };
  notifications: {
    emailNotification: boolean;
    pushNotification: boolean;
    smsAlert: boolean;
  };
  security: {
    sessionTimeout: number;
    maxLoginAttempts: number;
    require2FA: boolean;
  };
  booking: {
    minBookingDuration: number;
    maxBookingDuration: number;
    cancellationTimeBefore: number;
    allowOnlineBooking: boolean;
  };
}

export interface UpdateSystemSettingsRequestDto {
  general?: {
    systemName?: string;
    systemDescription?: string;
    defaultLanguage?: string;
  };
  notifications?: {
    emailNotification?: boolean;
    pushNotification?: boolean;
    smsAlert?: boolean;
  };
  security?: {
    sessionTimeout?: number;
    maxLoginAttempts?: number;
    require2FA?: boolean;
  };
  booking?: {
    minBookingDuration?: number;
    maxBookingDuration?: number;
    cancellationTimeBefore?: number;
    allowOnlineBooking?: boolean;
  };
}

export interface CreateSystemSettingRequestDto {
  key: string;
  value: string | number | boolean;
}

export interface UpdateSystemSettingRequestDto {
  key?: string;
  value?: string | number | boolean;
}

export interface SystemSettingResponseDto {
  id?: string;
  key: string;
  value: string | number | boolean;
  createdAt?: string;
  updatedAt?: string;
}
