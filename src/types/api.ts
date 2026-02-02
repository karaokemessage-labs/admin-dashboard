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
  isActive?: boolean;
  isEnable2FA?: boolean;
  twoFaEnabled?: boolean;
  requires2FAChallenge?: boolean;
  mustChangePassword?: boolean;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  username: string;
  isActive: boolean;
  isEnable2FA: boolean;
  twoFaEnabled?: boolean;
  requires2FAChallenge?: boolean;
  mustChangePassword?: boolean;
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

// Document/KYC Types
export type DocumentType = 'ID_CARD' | 'PASSPORT' | 'DRIVER_LICENSE' | 'OTHER';
export type DocumentStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';

export interface CreateDocumentRequestDto {
  type: DocumentType;
  file: File | string; // File object or base64 string
  userId?: string;
  description?: string;
}

export interface UpdateDocumentRequestDto {
  type?: DocumentType;
  description?: string;
}

export interface DocumentResponseDto {
  id: string;
  type: DocumentType;
  status: DocumentStatus;
  fileUrl: string;
  userId: string;
  description: string | null;
  verifiedBy: string | null;
  verifiedAt: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetDocumentsResponseDto {
  data: DocumentResponseDto[];
  total: number;
  page: number;
  limit: number;
}

export interface VerifyDocumentRequestDto {
  status: 'VERIFIED' | 'REJECTED';
  rejectionReason?: string;
}

export interface VerifyDocumentResponseDto {
  id: string;
  status: DocumentStatus;
  verifiedBy: string;
  verifiedAt: string;
  rejectionReason: string | null;
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

// Notification Types
export type NotificationStatus = 'READ' | 'UNREAD' | 'ARCHIVED';

export interface CreateNotificationRequestDto {
  title: string;
  message: string;
  userId?: string; // Optional, if not provided, notification is for current user
  type?: string; // Optional notification type
  metadata?: Record<string, any>; // Optional metadata
}

export interface UpdateNotificationRequestDto {
  title?: string;
  message?: string;
  type?: string;
  metadata?: Record<string, any>;
}

export interface NotificationResponseDto {
  id: string;
  title: string;
  message: string;
  userId: string;
  type: string | null;
  status: NotificationStatus;
  data: Record<string, any> | null;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetNotificationsResponseDto {
  success: boolean;
  data: {
    items: NotificationResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}

// Feed Types
export interface CreateFeedRequestDto {
  title: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
  published?: boolean;
  authorId?: string;
}

export interface UpdateFeedRequestDto {
  title?: string;
  content?: string;
  imageUrl?: string;
  tags?: string[];
  published?: boolean;
}

export interface FeedResponseDto {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  tags: string[];
  published: boolean;
  authorId: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetFeedsResponseDto {
  data: FeedResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// Friend Types
export interface SendFriendRequestRequestDto {
  receiverId: string;
}

export interface FriendRequestResponseDto {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface FriendshipResponseDto {
  id: string;
  userId: string;
  friendId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetFriendRequestsResponseDto {
  data: FriendRequestResponseDto[];
  total: number;
  page: number;
  limit: number;
}

export interface GetFriendsResponseDto {
  data: FriendshipResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// Chat Types
export type ChatRoomType = 'DIRECT' | 'GROUP';

export interface CreateChatRoomRequestDto {
  name?: string;
  type: ChatRoomType;
  participantIds: string[];
}

export interface ChatRoomResponseDto {
  id: string;
  name: string | null;
  type: ChatRoomType;
  createdBy: string;
  participants: ChatParticipantDto[];
  lastMessage?: ChatMessageResponseDto | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChatParticipantDto {
  id: string;
  userId: string;
  joinedAt: string;
}

export interface SendMessageRequestDto {
  content: string;
  type?: 'TEXT' | 'IMAGE' | 'FILE';
}

export interface ChatMessageResponseDto {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  type: 'TEXT' | 'IMAGE' | 'FILE';
  readBy: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MarkMessagesReadRequestDto {
  messageIds: string[];
}

export interface GetChatRoomsResponseDto {
  data: ChatRoomResponseDto[];
  total: number;
  page: number;
  limit: number;
}

export interface GetMessagesResponseDto {
  data: ChatMessageResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// Follow Types
export interface FollowResponseDto {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface FollowListResponseDto {
  data: FollowResponseDto[];
  total: number;
  page: number;
  limit: number;
}

export interface FollowStatsResponseDto {
  followersCount: number;
  followingCount: number;
}

export interface FollowStatusResponseDto {
  isFollowing: boolean;
}

// Reaction Types
export type ReactionType = 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY';

export interface AddReactionRequestDto {
  type: ReactionType;
}

export interface ReactionResponseDto {
  id: string;
  articleId: string;
  userId: string;
  type: ReactionType;
  createdAt: string;
  updatedAt: string;
}

export interface ReactionListResponseDto {
  data: ReactionResponseDto[];
  total: number;
  page: number;
  limit: number;
}

export interface ReactionStatsResponseDto {
  total: number;
  byType: Record<ReactionType, number>;
  userReaction: ReactionType | null;
}

// Favorite Types
export interface KaraokeFavoriteResponseDto {
  id: string;
  userId: string;
  karaokeId: string;
  createdAt: string;
}

// Image Types
export interface UploadImageRequestDto {
  file: File;
  description?: string;
}

export interface ImageResponseDto {
  id: string;
  userId: string;
  imageUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

// Public/Facility Types
export interface GetAllDataResponseDto {
  karaokes: KaraokeResponseDto[];
  clubs: ClubResponseDto[];
  massages: MassageResponseDto[];
}

export interface GetFacilityWithRatingsResponseDto {
  facility: KaraokeResponseDto | ClubResponseDto | MassageResponseDto;
  ratings: RatingResponseDto[];
  comments: CommentResponseDto[];
  averageRating: number;
  totalRatings: number;
}

// Karaoke Types
export type KaraokeStatus = 'ACTIVE' | 'INACTIVE';

export interface CreateKaraokeRequestDto {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  openingHours?: string;
  closingHours?: string;
  priceRange?: string;
  imageUrl?: string;
  bannerUrl?: string;
}

export interface UpdateKaraokeRequestDto extends Partial<CreateKaraokeRequestDto> {
  status?: KaraokeStatus;
}

export interface KaraokeResponseDto {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  description: string | null;
  openingHours: string | null;
  closingHours: string | null;
  priceRange: string | null;
  imageUrl: string | null;
  bannerUrl: string | null;
  status: KaraokeStatus;
  rating?: number;
  totalRatings?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetKaraokesResponseDto {
  data: KaraokeResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// Club Types
export type ClubStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface CreateClubRequestDto {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  openingHours?: string;
  closingHours?: string;
  priceRange?: string;
  imageUrl?: string;
  bannerUrl?: string;
}

export interface UpdateClubRequestDto extends Partial<CreateClubRequestDto> {
  status?: ClubStatus;
}

export interface ClubResponseDto {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  description: string | null;
  openingHours: string | null;
  closingHours: string | null;
  priceRange: string | null;
  imageUrl: string | null;
  bannerUrl: string | null;
  status: ClubStatus;
  rating?: number;
  totalRatings?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetClubsResponseDto {
  data: ClubResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// Massage Types
export type MassageStatus = 'ACTIVE' | 'INACTIVE';

export interface CreateMassageRequestDto {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  openingHours?: string;
  closingHours?: string;
  priceRange?: string;
  imageUrl?: string;
  bannerUrl?: string;
}

export interface UpdateMassageRequestDto extends Partial<CreateMassageRequestDto> {
  status?: MassageStatus;
}

export interface MassageResponseDto {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  description: string | null;
  openingHours: string | null;
  closingHours: string | null;
  priceRange: string | null;
  imageUrl: string | null;
  bannerUrl: string | null;
  status: MassageStatus;
  rating?: number;
  totalRatings?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetMassagesResponseDto {
  data: MassageResponseDto[];
  total: number;
  page: number;
  limit: number;
}

// Two-Factor Types
export type TwoFactorType = 'TOTP' | 'EMAIL';

export interface SetupTwoFactorRequestDto {
  userId: string;
  type: TwoFactorType;
}

export interface SetupTwoFactorResponseDto {
  qrCodeUrl?: string;
  qrCode?: string;
  secret?: string;
  secretKey?: string;
  backupCodes?: string[];
  config?: {
    id: string;
    userId: string;
    type: TwoFactorType;
    isActive: boolean;
  };
}

export interface VerifyTwoFactorRequestDto {
  userId: string;
  code: string;
  type: TwoFactorType;
}

export interface ResendEmailOtpRequestDto {
  userId: string;
}

export interface RegenerateSecretRequestDto {
  userId: string;
}

export interface UseRecoveryCodeRequestDto {
  userId: string;
  code: string;
}

export interface Disable2FAChallengeRequestDto {
  userId: string;
  code: string;
  type: 'TOTP' | 'EMAIL' | 'RECOVERY';
}

export interface RecoveryCodeResponseDto {
  id: string;
  code: string;
  isUsed: boolean;
  usedAt: string | null;
  createdAt: string;
}

export interface TwoFactorConfigResponseDto {
  id: string;
  userId: string;
  type: TwoFactorType;
  isActive: boolean;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

// Pagination Common Types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Updated Rating Types for facility
export interface CreateFacilityRatingRequestDto {
  rating: number;
  facilityType: 'KARAOKE' | 'CLUB' | 'MASSAGE';
  facilityId: string;
  comment?: string;
}

export interface FacilityRatingResponseDto {
  id: string;
  rating: number;
  comment: string | null;
  facilityType: 'KARAOKE' | 'CLUB' | 'MASSAGE';
  facilityId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetFacilityRatingsParams extends PaginationParams {
  facilityType: 'KARAOKE' | 'CLUB' | 'MASSAGE';
  facilityId: string;
}

