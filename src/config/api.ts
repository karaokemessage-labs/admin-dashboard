// API Configuration
// Get API base URL from environment variable
// Default to localhost:3000 for development
const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || "https://kaka-club-api-gateway.ngrok.dev"
  return envUrl;
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000, // 30 seconds
};

export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    // Legacy 2FA endpoints (not in OpenAPI spec, kept for backward compatibility)
    SETUP_2FA: '/two-factor/setup',
    REGENERATE_2FA: '/two-factor/regenerate-secret',
    VERIFY_2FA: '/two-factor/verify',
    DISABLE_2FA: '/two-factor/disable',
    SETUP_2FA_EMAIL: '/auth/2fa/setup/email',
    RECOVERY_CODES: '/two-factor/recovery-codes',
  },
  // Admin endpoints
  ADMIN: {
    LOGIN: '/admin/login',
    DASHBOARD_STATS: '/admin/dashboard/stats',
  },
  // Wallet endpoints
  WALLET: {
    BALANCE: '/wallet/balance',
    CREDIT_BALANCE: '/wallet/credit-balance',
    DEBIT_BALANCE: '/wallet/debit-balance',
  },
  // Facility endpoints
  FACILITIES: {
    BASE: '/facilities',
    BY_ID: (id: string) => `/facilities/${id}`,
  },
  // RBAC endpoints
  RBAC: {
    ROLES: '/rbac/roles',
    ROLE_BY_ID: (id: string) => `/rbac/roles/${id}`,
    PERMISSIONS: '/rbac/permissions',
    ASSIGN_ROLES_TO_USER: (userId: string) => `/rbac/users/${userId}/roles`,
  },
  // Booking endpoints
  BOOKINGS: {
    BASE: '/bookings',
    BY_ID: (id: string) => `/bookings/${id}`,
  },
  // User endpoints
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
  },
  // Article endpoints
  ARTICLES: {
    BASE: '/articles',
    BY_ID: (id: string) => `/articles/${id}`,
    BY_SLUG: (slug: string) => `/articles/slug/${slug}`,
    PUBLISH: (id: string) => `/articles/${id}/publish`,
  },
  // Comment endpoints
  COMMENTS: {
    BASE: '/comments',
    BY_ID: (id: string) => `/comments/${id}`,
    BY_ARTICLE: (articleId: string) => `/comments/article/${articleId}`,
  },
  // Karaoke endpoints
  KARAOKE: {
    BASE: '/karaoke',
    BY_ID: (id: string) => `/karaoke/${id}`,
  },
  // Massage endpoints
  MASSAGE: {
    BASE: '/massages',
    BY_ID: (id: string) => `/massages/${id}`,
  },
  // Club endpoints
  CLUBS: {
    BASE: '/clubs',
    BY_ID: (id: string) => `/clubs/${id}`,
  },
};

