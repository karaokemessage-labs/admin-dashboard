import { useState, useEffect } from 'react';
import { Search, Filter, Plus, X, Loader2, Edit, Trash2, Key } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';
import { rbacService } from '../../../services/rbacService';
import { PermissionResponseDto, PermissionAction } from '../../../types/api';

const PermissionsManagement = () => {
    const { t } = useLanguage();
    const [permissions, setPermissions] = useState<PermissionResponseDto[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingPermissionId, setEditingPermissionId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [permissionToDelete, setPermissionToDelete] = useState<{ id: string; title: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        resource: '',
        action: '' as PermissionAction | '',
        content: '',
    });

    // Fetch permissions on component mount
    useEffect(() => {
        fetchPermissions(1);
    }, []);

    const fetchPermissions = async (page: number) => {
        setFetching(true);
        try {
            const response = await rbacService.getPermissions(page, pageSize);
            // apiClient extracts data from { success, data: {...}, message }
            // So response is { data: [...permissions], total, page, limit }
            const data = response as any;
            // Handle both nested data.data (from API) and direct items array
            const permissionsList = data?.data || data?.items || (Array.isArray(data) ? data : []);
            setPermissions(permissionsList);
            setCurrentPage(data?.page || page);
            setTotalItems(data?.total || 0);
        } catch (error: any) {
            toast.error(error.message || t('common.error'));
        } finally {
            setFetching(false);
        }
    };

    const handleOpenModal = () => {
        setIsEditMode(false);
        setEditingPermissionId(null);
        setIsModalOpen(true);
        setFormData({
            title: '',
            slug: '',
            description: '',
            resource: '',
            action: '',
            content: '',
        });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setEditingPermissionId(null);
        setFormData({
            title: '',
            slug: '',
            description: '',
            resource: '',
            action: '',
            content: '',
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.slug.trim()) {
            toast.error(t('common.pleaseFillAllFields'));
            return;
        }

        setLoading(true);
        try {
            if (isEditMode && editingPermissionId) {
                await rbacService.updatePermission(editingPermissionId, {
                    title: formData.title,
                    slug: formData.slug,
                    description: formData.description || undefined,
                    content: formData.content || undefined,
                });
                toast.success(t('pages.permissions.updateSuccess'));
            } else {
                if (!formData.resource || !formData.action) {
                    toast.error(t('pages.permissions.selectResourceAndAction'));
                    setLoading(false);
                    return;
                }
                await rbacService.createPermission({
                    title: formData.title,
                    slug: formData.slug,
                    description: formData.description || undefined,
                    resource: formData.resource,
                    action: formData.action as PermissionAction,
                    content: formData.content || undefined,
                });
                toast.success(t('pages.permissions.createSuccess'));
            }

            handleCloseModal();
            await fetchPermissions(currentPage);
        } catch (error: any) {
            toast.error(error.message || (isEditMode ? t('pages.permissions.updateFailed') : t('pages.permissions.createFailed')));
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDeleteClick = (permissionId: string, permissionTitle: string) => {
        setPermissionToDelete({ id: permissionId, title: permissionTitle });
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!permissionToDelete) return;

        setDeletingId(permissionToDelete.id);
        try {
            await rbacService.deletePermission(permissionToDelete.id);
            toast.success(t('pages.permissions.deleteSuccess'));
            setIsDeleteModalOpen(false);
            setPermissionToDelete(null);
            await fetchPermissions(currentPage);
        } catch (error: any) {
            toast.error(error.message || t('pages.permissions.deleteFailed'));
        } finally {
            setDeletingId(null);
        }
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setPermissionToDelete(null);
    };

    // Filter permissions based on search query
    const filteredPermissions = permissions.filter(permission => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
            permission.title.toLowerCase().includes(query) ||
            permission.slug.toLowerCase().includes(query) ||
            (permission.description && permission.description.toLowerCase().includes(query)) ||
            (permission.resource && permission.resource.toLowerCase().includes(query))
        );
    });

    // Get action badge color
    const getActionBadge = (action: PermissionAction | undefined) => {
        const actionColors: { [key: string]: string } = {
            'READ': 'bg-blue-100 text-blue-800',
            'CREATE': 'bg-green-100 text-green-800',
            'UPDATE': 'bg-yellow-100 text-yellow-800',
            'DELETE': 'bg-red-100 text-red-800',
            'MANAGE': 'bg-purple-100 text-purple-800',
        };
        const color = action ? actionColors[action] || 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800';
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
                {action || 'N/A'}
            </span>
        );
    };

    return (
        <div className="flex-1 bg-gray-50 p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('pages.permissions.title')}</h1>
                <p className="text-gray-500 text-sm">{t('pages.permissions.description') || 'Quản lý các quyền hạn trong hệ thống'}</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('pages.permissions.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button
                        onClick={handleOpenModal}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {t('pages.permissions.addPermission')}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                        {t('common.filter')}
                    </button>
                </div>
            </div>

            {/* Permissions Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.permissions.permission')}</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.permissions.slug')}</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.permissions.resource')}</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.permissions.action')}</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.status')}</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.createdAt')}</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {fetching ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
                                        <p className="mt-2 text-gray-600">{t('common.loadingData')}</p>
                                    </td>
                                </tr>
                            ) : filteredPermissions.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        {searchQuery ? t('pages.permissions.noPermissionsFound') : t('pages.permissions.noPermissionsYet')}
                                    </td>
                                </tr>
                            ) : (
                                filteredPermissions.map((permission) => (
                                    <tr key={permission.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <Key className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div className="text-sm font-medium text-gray-900">{permission.title}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 font-mono">
                                                {permission.slug}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                {permission.resource || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getActionBadge(permission.action)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${permission.active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {permission.active ? t('common.active') : t('common.inactive')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {new Date(permission.createdAt).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setIsModalOpen(true);
                                                        setIsEditMode(true);
                                                        setEditingPermissionId(permission.id);
                                                        setFormData({
                                                            title: permission.title,
                                                            slug: permission.slug,
                                                            description: permission.description || '',
                                                            resource: permission.resource || '',
                                                            action: permission.action || '',
                                                            content: permission.content || '',
                                                        });
                                                    }}
                                                    className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded"
                                                    title={t('common.edit')}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(permission.id, permission.title)}
                                                    disabled={deletingId === permission.id}
                                                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title={t('common.delete')}
                                                >
                                                    {deletingId === permission.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalItems > pageSize && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            {t('pages.permissions.showing')} {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} {t('pages.permissions.of')} {totalItems} permissions
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => fetchPermissions(currentPage - 1)}
                                disabled={currentPage === 1 || fetching}
                                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t('pages.permissions.previous')}
                            </button>
                            <span className="px-3 py-1 text-sm text-gray-700">
                                {t('pages.permissions.page')} {currentPage} / {Math.ceil(totalItems / pageSize)}
                            </span>
                            <button
                                onClick={() => fetchPermissions(currentPage + 1)}
                                disabled={currentPage >= Math.ceil(totalItems / pageSize) || fetching}
                                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t('pages.permissions.next')}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add/Edit Permission Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">
                                {isEditMode ? t('pages.permissions.editPermission') : t('pages.permissions.createPermission')}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                disabled={loading}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('pages.permissions.permission')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder={t('pages.permissions.enterPermissionName')}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('pages.permissions.slug')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="slug"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading || isEditMode}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder={t('pages.permissions.enterSlug')}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="resource" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('pages.permissions.resource')} {!isEditMode && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type="text"
                                        id="resource"
                                        name="resource"
                                        value={formData.resource}
                                        onChange={handleInputChange}
                                        disabled={loading || isEditMode}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        placeholder={t('pages.permissions.enterResource')}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('pages.permissions.action')} {!isEditMode && <span className="text-red-500">*</span>}
                                    </label>
                                    <select
                                        id="action"
                                        name="action"
                                        value={formData.action}
                                        onChange={handleInputChange}
                                        disabled={loading || isEditMode}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    >
                                        <option value="">{t('pages.permissions.selectAction')}</option>
                                        <option value="READ">READ</option>
                                        <option value="CREATE">CREATE</option>
                                        <option value="UPDATE">UPDATE</option>
                                        <option value="DELETE">DELETE</option>
                                        <option value="MANAGE">MANAGE</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('pages.permissions.description')}
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                    rows={2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder={t('pages.permissions.enterDescription')}
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('pages.permissions.detailedContent')}
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder={t('pages.permissions.enterDetailedContent')}
                                />
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    disabled={loading}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    <span>
                                        {loading
                                            ? isEditMode
                                                ? t('common.updating')
                                                : t('common.creating')
                                            : isEditMode
                                                ? t('common.update')
                                                : t('pages.permissions.createPermission')}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && permissionToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">{t('pages.permissions.deletePermission')}</h2>
                        </div>

                        <div className="p-6">
                            <p className="text-gray-700 mb-4">
                                {t('pages.permissions.deleteConfirmMessage')} <strong>"{permissionToDelete.title}"</strong>?
                            </p>
                            <p className="text-sm text-red-600">
                                {t('common.deleteWarning') || 'Hành động này không thể hoàn tác.'}
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleDeleteCancel}
                                disabled={deletingId === permissionToDelete.id}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteConfirm}
                                disabled={deletingId === permissionToDelete.id}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {deletingId === permissionToDelete.id && <Loader2 className="w-4 h-4 animate-spin" />}
                                <span>{deletingId === permissionToDelete.id ? t('common.deleting') : t('common.delete')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PermissionsManagement;
