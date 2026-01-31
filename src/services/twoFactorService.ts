import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
    SetupTwoFactorRequestDto,
    SetupTwoFactorResponseDto,
    VerifyTwoFactorRequestDto,
    ResendEmailOtpRequestDto,
    RegenerateSecretRequestDto,
    UseRecoveryCodeRequestDto,
    Disable2FAChallengeRequestDto,
    RecoveryCodeResponseDto,
    TwoFactorConfigResponseDto,
    TwoFactorType,
} from '../types/api';

export interface TwoFactorService {
    // Setup
    setupTwoFactor: (userId: string, type: TwoFactorType) => Promise<SetupTwoFactorResponseDto>;

    // Verify
    verifyTwoFactor: (data: VerifyTwoFactorRequestDto) => Promise<void>;

    // Email OTP
    resendEmailOtp: (userId: string) => Promise<void>;

    // TOTP
    regenerateSecret: (userId: string) => Promise<SetupTwoFactorResponseDto>;

    // Recovery Codes
    getRecoveryCodes: () => Promise<RecoveryCodeResponseDto[]>;
    useRecoveryCode: (userId: string, code: string) => Promise<void>;

    // Disable
    disable2FAChallenge: (data: Disable2FAChallengeRequestDto) => Promise<void>;
    disableTwoFactor: () => Promise<void>;

    // Configs
    getTwoFactorConfigs: () => Promise<TwoFactorConfigResponseDto[]>;
}

class TwoFactorServiceImpl implements TwoFactorService {
    async setupTwoFactor(userId: string, type: TwoFactorType): Promise<SetupTwoFactorResponseDto> {
        try {
            const response = await apiClient.post<SetupTwoFactorResponseDto>(
                API_ENDPOINTS.TWO_FACTOR.SETUP,
                { userId, type } as SetupTwoFactorRequestDto
            );
            const data = response.data;

            // Normalize response structure
            return {
                qrCodeUrl: data.qrCodeUrl || data.qrCode,
                qrCode: data.qrCode || data.qrCodeUrl,
                secret: data.secret || data.secretKey,
                secretKey: data.secretKey || data.secret,
                backupCodes: data.backupCodes,
                config: data.config,
            };
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Thiết lập 2FA thất bại');
        }
    }

    async verifyTwoFactor(data: VerifyTwoFactorRequestDto): Promise<void> {
        try {
            await apiClient.post(API_ENDPOINTS.TWO_FACTOR.VERIFY, data);
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Xác thực 2FA thất bại');
        }
    }

    async resendEmailOtp(userId: string): Promise<void> {
        try {
            await apiClient.post(
                API_ENDPOINTS.TWO_FACTOR.RESEND_EMAIL_OTP,
                { userId } as ResendEmailOtpRequestDto
            );
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Gửi lại mã OTP thất bại');
        }
    }

    async regenerateSecret(userId: string): Promise<SetupTwoFactorResponseDto> {
        try {
            const response = await apiClient.post<SetupTwoFactorResponseDto>(
                API_ENDPOINTS.TWO_FACTOR.REGENERATE_SECRET,
                { userId } as RegenerateSecretRequestDto
            );
            const data = response.data;

            // Normalize response structure
            return {
                qrCodeUrl: data.qrCodeUrl || data.qrCode,
                qrCode: data.qrCode || data.qrCodeUrl,
                secret: data.secret || data.secretKey,
                secretKey: data.secretKey || data.secret,
                backupCodes: data.backupCodes,
                config: data.config,
            };
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Tạo lại mã bí mật thất bại');
        }
    }

    async getRecoveryCodes(): Promise<RecoveryCodeResponseDto[]> {
        try {
            const response = await apiClient.get<RecoveryCodeResponseDto[]>(
                API_ENDPOINTS.TWO_FACTOR.RECOVERY_CODES
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy mã khôi phục thất bại');
        }
    }

    async useRecoveryCode(userId: string, code: string): Promise<void> {
        try {
            await apiClient.post(
                API_ENDPOINTS.TWO_FACTOR.USE_RECOVERY_CODE,
                { userId, code } as UseRecoveryCodeRequestDto
            );
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Sử dụng mã khôi phục thất bại');
        }
    }

    async disable2FAChallenge(data: Disable2FAChallengeRequestDto): Promise<void> {
        try {
            await apiClient.post(API_ENDPOINTS.TWO_FACTOR.DISABLE_CHALLENGE, data);
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Tắt 2FA thất bại');
        }
    }

    async disableTwoFactor(): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.TWO_FACTOR.DISABLE);
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Tắt 2FA thất bại');
        }
    }

    async getTwoFactorConfigs(): Promise<TwoFactorConfigResponseDto[]> {
        try {
            const response = await apiClient.get<TwoFactorConfigResponseDto[]>(
                API_ENDPOINTS.TWO_FACTOR.CONFIGS
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy cấu hình 2FA thất bại');
        }
    }
}

export const twoFactorService: TwoFactorService = new TwoFactorServiceImpl();
