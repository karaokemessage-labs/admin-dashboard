// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3003/api',
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000, // 30 seconds
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    ME: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
    SETUP_2FA: '/two-factor/setup',
    REGENERATE_2FA: '/two-factor/regenerate-secret',
    VERIFY_2FA: '/two-factor/verify',
    DISABLE_2FA: '/two-factor/disable',
    SETUP_2FA_EMAIL: '/auth/2fa/setup/email',
    RECOVERY_CODES: '/two-factor/recovery-codes',
  },
};

