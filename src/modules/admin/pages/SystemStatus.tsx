import { useState, useEffect, useCallback } from 'react';
import {
    Activity, Database, HardDrive, RefreshCw, CheckCircle2, XCircle,
    AlertCircle, Clock, Server, Cpu, MemoryStick, Timer
} from 'lucide-react';
import { healthService, SystemStatusResponse, ServiceStatus } from '../../../services/healthService';

const SystemStatus = () => {
    const [data, setData] = useState<SystemStatusResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastChecked, setLastChecked] = useState<Date | null>(null);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStatus = useCallback(async (isManual = false) => {
        if (isManual) setRefreshing(true);
        try {
            const result = await healthService.getSystemStatus();
            setData(result);
            setLastChecked(new Date());
        } catch {
            setData(null);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => { fetchStatus(); }, [fetchStatus]);

    useEffect(() => {
        if (!autoRefresh) return;
        const interval = setInterval(() => fetchStatus(), 30000);
        return () => clearInterval(interval);
    }, [autoRefresh, fetchStatus]);

    const getServiceIcon = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('postgres') || lower.includes('db') || lower.includes('database'))
            return <Database className="w-6 h-6 text-blue-500" />;
        if (lower.includes('redis'))
            return <HardDrive className="w-6 h-6 text-red-500" />;
        return <Server className="w-6 h-6 text-purple-500" />;
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'up':
                return {
                    icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50',
                    border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700',
                    label: 'Online', dot: 'bg-emerald-500', glow: 'shadow-emerald-100',
                };
            case 'down':
                return {
                    icon: XCircle, color: 'text-red-500', bg: 'bg-red-50',
                    border: 'border-red-200', badge: 'bg-red-100 text-red-700',
                    label: 'Offline', dot: 'bg-red-500', glow: 'shadow-red-100',
                };
            default:
                return {
                    icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50',
                    border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700',
                    label: 'Unknown', dot: 'bg-amber-500', glow: 'shadow-amber-100',
                };
        }
    };

    const getOverallConfig = (status?: string) => {
        if (status === 'healthy') return getStatusConfig('up');
        if (status === 'unhealthy') return getStatusConfig('down');
        return getStatusConfig('unknown');
    };

    const formatUptime = (seconds: number) => {
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        if (h < 24) return `${h}h ${m}m`;
        const d = Math.floor(h / 24);
        return `${d}d ${h % 24}h ${m}m`;
    };

    const renderServiceCard = (service: ServiceStatus) => {
        const config = getStatusConfig(service.status);
        const StatusIcon = config.icon;

        return (
            <div
                key={service.name}
                className={`relative overflow-hidden rounded-2xl border ${config.border} ${config.bg} p-6 transition-all duration-300 hover:shadow-lg ${config.glow}`}
            >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.badge}`}>
                        <span className={`w-2 h-2 rounded-full ${config.dot} ${service.status === 'up' ? 'animate-pulse' : ''}`} />
                        {config.label}
                    </span>
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center`}>
                        {getServiceIcon(service.name)}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <StatusIcon className={`w-4 h-4 ${config.color}`} />
                            <span className={`text-sm font-medium ${config.color}`}>
                                {service.status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Response time */}
                <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-white/60 rounded-lg">
                    <Timer className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className={`ml-auto text-sm font-bold ${service.responseTimeMs < 100 ? 'text-emerald-600' :
                            service.responseTimeMs < 500 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                        {service.responseTimeMs}ms
                    </span>
                </div>

                {/* Details */}
                {service.details && Object.keys(service.details).length > 0 && (
                    <div className="space-y-2">
                        {Object.entries(service.details).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="text-gray-800 font-medium truncate max-w-[200px]">
                                    {typeof value === 'boolean' ? (value ? '✅ Yes' : '❌ No') :
                                        typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-3">
                    <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
                    <span className="text-gray-500 text-sm">Checking system status...</span>
                </div>
            </div>
        );
    }

    const overallConfig = getOverallConfig(data?.status);
    const OverallIcon = overallConfig.icon;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        System Status
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Monitor the health of your backend services
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <span className="text-sm text-gray-500">Auto-refresh</span>
                        <button
                            onClick={() => setAutoRefresh(!autoRefresh)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoRefresh ? 'bg-purple-500' : 'bg-gray-300'
                                }`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoRefresh ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                        </button>
                    </label>

                    <button
                        onClick={() => fetchStatus(true)}
                        disabled={refreshing}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Overall Status + Uptime */}
            <div className={`rounded-2xl border ${overallConfig.border} ${overallConfig.bg} p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                <div className="flex items-center gap-3">
                    <OverallIcon className={`w-6 h-6 ${overallConfig.color}`} />
                    <span className="text-base font-semibold text-gray-900">
                        Overall System:{' '}
                        <span className={overallConfig.color}>
                            {data?.status === 'healthy' ? 'HEALTHY' : data?.status?.toUpperCase() || 'UNKNOWN'}
                        </span>
                    </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    {data?.uptime !== undefined && (
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            Uptime: <span className="font-medium text-gray-700">{formatUptime(data.uptime)}</span>
                        </span>
                    )}
                    {lastChecked && (
                        <span className="flex items-center gap-1.5">
                            <RefreshCw className="w-3.5 h-3.5" />
                            {lastChecked.toLocaleTimeString()}
                        </span>
                    )}
                </div>
            </div>

            {/* Service Cards */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {data?.services?.map(renderServiceCard)}
            </div>

            {/* System Info */}
            {data?.system && (
                <>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">System Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Runtime */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <Server className="w-5 h-5 text-blue-500" />
                                </div>
                                <h3 className="font-semibold text-gray-800">Runtime</h3>
                            </div>
                            <div className="space-y-2.5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Node.js</span>
                                    <span className="font-medium text-gray-800">{data.system.nodeVersion}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Platform</span>
                                    <span className="font-medium text-gray-800">{data.system.platform}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Architecture</span>
                                    <span className="font-medium text-gray-800">{data.system.arch}</span>
                                </div>
                            </div>
                        </div>

                        {/* Memory */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                                    <MemoryStick className="w-5 h-5 text-purple-500" />
                                </div>
                                <h3 className="font-semibold text-gray-800">Memory</h3>
                            </div>
                            <div className="space-y-2.5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">RSS</span>
                                    <span className="font-medium text-gray-800">{data.system.memoryUsage.rss}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Heap Used</span>
                                    <span className="font-medium text-gray-800">{data.system.memoryUsage.heapUsed}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Heap Total</span>
                                    <span className="font-medium text-gray-800">{data.system.memoryUsage.heapTotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">External</span>
                                    <span className="font-medium text-gray-800">{data.system.memoryUsage.external}</span>
                                </div>
                            </div>
                        </div>

                        {/* CPU */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                    <Cpu className="w-5 h-5 text-amber-500" />
                                </div>
                                <h3 className="font-semibold text-gray-800">CPU Usage</h3>
                            </div>
                            <div className="space-y-2.5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">User</span>
                                    <span className="font-medium text-gray-800">{data.system.cpuUsage.user}ms</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">System</span>
                                    <span className="font-medium text-gray-800">{data.system.cpuUsage.system}ms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SystemStatus;
