import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface ServiceStatus {
    name: string;
    status: 'up' | 'down' | 'unknown';
    responseTimeMs: number;
    details: Record<string, any>;
}

export interface SystemInfo {
    nodeVersion: string;
    platform: string;
    arch: string;
    memoryUsage: {
        rss: string;
        heapUsed: string;
        heapTotal: string;
        external: string;
    };
    cpuUsage: {
        user: number;
        system: number;
    };
}

export interface SystemStatusResponse {
    status: string;
    timestamp: string;
    uptime: number;
    services: ServiceStatus[];
    system: SystemInfo;
}

export interface HealthService {
    getSystemStatus: () => Promise<SystemStatusResponse>;
}

class HealthServiceImpl implements HealthService {
    async getSystemStatus(): Promise<SystemStatusResponse> {
        try {
            const response = await apiClient.get<SystemStatusResponse>(
                API_ENDPOINTS.HEALTH.BASE
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            console.error('Error fetching system status:', apiError);
            // Return a fallback response when the endpoint is unreachable
            return {
                status: 'unhealthy',
                timestamp: new Date().toISOString(),
                uptime: 0,
                services: [
                    { name: 'PostgreSQL', status: 'unknown', responseTimeMs: 0, details: { error: apiError.message } },
                    { name: 'Redis', status: 'unknown', responseTimeMs: 0, details: { error: apiError.message } },
                ],
                system: {
                    nodeVersion: 'N/A',
                    platform: 'N/A',
                    arch: 'N/A',
                    memoryUsage: { rss: 'N/A', heapUsed: 'N/A', heapTotal: 'N/A', external: 'N/A' },
                    cpuUsage: { user: 0, system: 0 },
                },
            };
        }
    }
}

export const healthService: HealthService = new HealthServiceImpl();
