import { useState, useEffect, useCallback } from 'react';
import { HardDrive, Trash2, RefreshCw, Search, AlertTriangle, Clock, Loader2, X, Database } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { cacheService, CacheEntry } from '../../../services/cacheService';
import { toast } from 'react-toastify';

const CacheManagement = () => {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState<CacheEntry[]>([]);
    const [totalKeys, setTotalKeys] = useState(0);
    const [searchPattern, setSearchPattern] = useState('');
    const [activePattern, setActivePattern] = useState('');
    const [deletingKey, setDeletingKey] = useState<string | null>(null);
    const [clearingAll, setClearingAll] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

    const fetchCache = useCallback(async (pattern?: string) => {
        try {
            setLoading(true);
            const data = await cacheService.getAllCache(pattern || undefined);
            setEntries(data.entries || []);
            setTotalKeys(data.totalKeys || 0);
        } catch (error: any) {
            console.error('Error fetching cache:', error);
            toast.error(error.message || 'Không thể tải cache');
            setEntries([]);
            setTotalKeys(0);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCache();
    }, [fetchCache]);

    const handleSearch = () => {
        setActivePattern(searchPattern);
        fetchCache(searchPattern || undefined);
    };

    const handleClearSearch = () => {
        setSearchPattern('');
        setActivePattern('');
        fetchCache();
    };

    const handleDeleteKey = async (key: string) => {
        try {
            setDeletingKey(key);
            await cacheService.deleteCacheByKey(key);
            toast.success(`Đã xóa cache key "${key}"`);
            setShowDeleteConfirm(null);
            // Refresh list
            await fetchCache(activePattern || undefined);
        } catch (error: any) {
            toast.error(error.message || `Không thể xóa cache key "${key}"`);
        } finally {
            setDeletingKey(null);
        }
    };

    const handleClearAll = async () => {
        try {
            setClearingAll(true);
            await cacheService.clearAllCache();
            toast.success('Đã xóa toàn bộ cache!');
            setShowClearConfirm(false);
            setEntries([]);
            setTotalKeys(0);
        } catch (error: any) {
            toast.error(error.message || 'Không thể xóa toàn bộ cache');
        } finally {
            setClearingAll(false);
        }
    };

    const toggleExpand = (key: string) => {
        setExpandedKeys(prev => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const formatTTL = (ttl: number): string => {
        if (ttl === -1) return 'Không hết hạn';
        if (ttl === -2) return 'Đã bị xóa';
        if (ttl < 60) return `${ttl}s`;
        if (ttl < 3600) return `${Math.floor(ttl / 60)}m ${ttl % 60}s`;
        const hours = Math.floor(ttl / 3600);
        const minutes = Math.floor((ttl % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    const getTTLColor = (ttl: number): string => {
        if (ttl === -1) return 'text-blue-600 bg-blue-50';
        if (ttl === -2) return 'text-red-600 bg-red-50';
        if (ttl < 60) return 'text-red-600 bg-red-50';
        if (ttl < 300) return 'text-orange-600 bg-orange-50';
        return 'text-green-600 bg-green-50';
    };

    const formatValue = (value: any): string => {
        if (typeof value === 'string') return value;
        return JSON.stringify(value, null, 2);
    };

    const getKeyPrefix = (key: string): string => {
        const parts = key.split(':');
        return parts[0] || key;
    };

    const getPrefixColor = (prefix: string): string => {
        const colors: Record<string, string> = {
            auth: 'bg-purple-100 text-purple-700',
            session: 'bg-blue-100 text-blue-700',
            rate_limit: 'bg-red-100 text-red-700',
            user: 'bg-green-100 text-green-700',
            cache: 'bg-yellow-100 text-yellow-700',
        };
        return colors[prefix] || 'bg-gray-100 text-gray-700';
    };

    // Quick filter buttons
    const quickFilters = ['auth:*', 'session:*', 'rate_limit:*', 'user:*'];

    return (
        <div className="flex-1 bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                            <HardDrive className="w-7 h-7 text-purple-600" />
                            Caching Management
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Quản lý Redis cache — xem, tìm kiếm và xóa cache entries
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => fetchCache(activePattern || undefined)}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                        <button
                            onClick={() => setShowClearConfirm(true)}
                            disabled={loading || entries.length === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Trash2 className="w-4 h-4" />
                            Xóa tất cả
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Database className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Tổng cache keys</p>
                            <p className="text-xl font-bold text-gray-800">{totalKeys}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Search className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Kết quả hiển thị</p>
                            <p className="text-xl font-bold text-gray-800">{entries.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pattern filter</p>
                            <p className="text-xl font-bold text-gray-800 truncate">
                                {activePattern || 'Tất cả (*)'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Nhập pattern filter (vd: auth:*, rate_limit:*, user:*)..."
                                value={searchPattern}
                                onChange={(e) => setSearchPattern(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            {searchPattern && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                    {/* Quick filters */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-500 font-medium">Bộ lọc nhanh:</span>
                        {quickFilters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => {
                                    setSearchPattern(filter);
                                    setActivePattern(filter);
                                    fetchCache(filter);
                                }}
                                className={`px-3 py-1 text-xs rounded-full border transition-colors ${activePattern === filter
                                        ? 'bg-purple-100 text-purple-700 border-purple-300'
                                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                        {activePattern && (
                            <button
                                onClick={handleClearSearch}
                                className="px-3 py-1 text-xs rounded-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            >
                                ✕ Xóa bộ lọc
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Cache Entries Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                        <span className="ml-3 text-gray-600">{t('common.loading') || 'Đang tải...'}</span>
                    </div>
                ) : entries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <HardDrive className="w-16 h-16 mb-4 opacity-30" />
                        <p className="text-lg font-medium">Không tìm thấy cache entry nào</p>
                        <p className="text-sm mt-1">
                            {activePattern
                                ? `Không có key nào khớp với pattern "${activePattern}"`
                                : 'Cache hiện tại trống'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Key
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        TTL
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Value
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {entries.map((entry) => {
                                    const prefix = getKeyPrefix(entry.key);
                                    const isExpanded = expandedKeys.has(entry.key);
                                    const valueStr = formatValue(entry.value);
                                    const isLongValue = valueStr.length > 80;

                                    return (
                                        <tr
                                            key={entry.key}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${getPrefixColor(prefix)}`}>
                                                        {prefix}
                                                    </span>
                                                    <span className="text-sm font-mono text-gray-800 break-all">
                                                        {entry.key}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getTTLColor(entry.ttl)}`}>
                                                    <Clock className="w-3 h-3" />
                                                    {formatTTL(entry.ttl)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 max-w-md">
                                                {isLongValue ? (
                                                    <div>
                                                        <button
                                                            onClick={() => toggleExpand(entry.key)}
                                                            className="text-xs text-purple-600 hover:text-purple-800 font-medium mb-1"
                                                        >
                                                            {isExpanded ? '▼ Thu gọn' : '▶ Xem chi tiết'}
                                                        </button>
                                                        {isExpanded ? (
                                                            <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded-lg overflow-auto max-h-48 font-mono mt-1">
                                                                {valueStr}
                                                            </pre>
                                                        ) : (
                                                            <p className="text-sm text-gray-600 truncate font-mono">
                                                                {valueStr.substring(0, 80)}...
                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <pre className="text-sm text-gray-700 font-mono whitespace-pre-wrap break-all">
                                                        {valueStr}
                                                    </pre>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => setShowDeleteConfirm(entry.key)}
                                                    disabled={deletingKey === entry.key}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                                                >
                                                    {deletingKey === entry.key ? (
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    )}
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Delete Single Confirm Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Xác nhận xóa cache</h3>
                        </div>
                        <p className="text-gray-600 mb-2">
                            Bạn có chắc chắn muốn xóa cache key này?
                        </p>
                        <div className="bg-gray-50 rounded-lg p-3 mb-6">
                            <code className="text-sm text-red-600 font-mono break-all">{showDeleteConfirm}</code>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => handleDeleteKey(showDeleteConfirm)}
                                disabled={deletingKey !== null}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {deletingKey ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                                Xóa cache key
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Clear All Confirm Modal */}
            {showClearConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Xóa toàn bộ cache?</h3>
                        </div>
                        <p className="text-gray-600 mb-2">
                            Thao tác này sẽ <strong>xóa tất cả {totalKeys} cache entries</strong> khỏi Redis.
                            Hành động này không thể hoàn tác.
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                            <p className="text-sm text-red-700 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                Tất cả sessions, rate limits và cached data sẽ bị xóa.
                            </p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowClearConfirm(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleClearAll}
                                disabled={clearingAll}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {clearingAll ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                                Xóa toàn bộ cache
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CacheManagement;
