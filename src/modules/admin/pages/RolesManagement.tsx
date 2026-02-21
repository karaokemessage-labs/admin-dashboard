import { useState, useEffect } from 'react';
import { Search, Filter, Plus, X, Loader2, Edit, Trash2, Shield, Key } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';
import { rbacService } from '../../../services/rbacService';
import { RoleResponseDto, PermissionResponseDto } from '../../../types/api';

const RolesManagement = () => {
    const { t } = useLanguage();
    const [roles, setRoles] = useState<RoleResponseDto[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<{ id: string; title: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isBatchDeleteModalOpen, setIsBatchDeleteModalOpen] = useState(false);
    const [batchDeleting, setBatchDeleting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
    });

    // Assign permissions modal state
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [assigningRole, setAssigningRole] = useState<{ id: string; title: string } | null>(null);
    const [allPermissions, setAllPermissions] = useState<PermissionResponseDto[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [loadingPermissions, setLoadingPermissions] = useState(false);
    const [savingPermissions, setSavingPermissions] = useState(false);

    // Fetch roles on component mount
    useEffect(() => {
        fetchRoles(1);
    }, []);

    const fetchRoles = async (page: number) => {
        setFetching(true);
        try {
            const response = await rbacService.getRoles(page, pageSize);
            // apiClient extracts data from { success, data: {...}, message }
            // So response is { data: [...roles], total, page, limit }
            const data = response as any;
            // Handle both nested data.data (from API) and direct items array
            const rolesList = data?.data || data?.items || (Array.isArray(data) ? data : []);
            setRoles(rolesList);
            setCurrentPage(data?.page || page);
            setTotalItems(data?.total || 0);
            setSelectedIds(new Set());
        } catch (error: any) {
            toast.error(error.message || t('common.error'));
        } finally {
            setFetching(false);
        }
    };

    const handleOpenModal = () => {
        setIsEditMode(false);
        setEditingRoleId(null);
        setIsModalOpen(true);
        setFormData({
            title: '',
            slug: '',
            description: '',
        });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setEditingRoleId(null);
        setFormData({
            title: '',
            slug: '',
            description: '',
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
            if (isEditMode && editingRoleId) {
                await rbacService.updateRole(editingRoleId, {
                    title: formData.title,
                    description: formData.description || undefined,
                });
                toast.success('Cập nhật role thành công');
            } else {
                await rbacService.createRole({
                    title: formData.title,
                    slug: formData.slug,
                    description: formData.description || undefined,
                });
                toast.success('Tạo role thành công');
            }

            handleCloseModal();
            await fetchRoles(currentPage);
        } catch (error: any) {
            toast.error(error.message || (isEditMode ? 'Cập nhật role thất bại' : 'Tạo role thất bại'));
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDeleteClick = (roleId: string, roleTitle: string) => {
        setRoleToDelete({ id: roleId, title: roleTitle });
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!roleToDelete) return;

        setDeletingId(roleToDelete.id);
        try {
            await rbacService.deleteRole(roleToDelete.id);
            toast.success('Xóa role thành công');
            setIsDeleteModalOpen(false);
            setRoleToDelete(null);
            await fetchRoles(currentPage);
        } catch (error: any) {
            toast.error(error.message || 'Xóa role thất bại');
        } finally {
            setDeletingId(null);
        }
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setRoleToDelete(null);
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const newSelectedIds = new Set(filteredRoles.map(r => r.id));
            setSelectedIds(newSelectedIds);
        } else {
            setSelectedIds(new Set());
        }
    };

    const handleSelectItem = (id: string) => {
        const newSelectedIds = new Set(selectedIds);
        if (newSelectedIds.has(id)) {
            newSelectedIds.delete(id);
        } else {
            newSelectedIds.add(id);
        }
        setSelectedIds(newSelectedIds);
    };

    const handleBatchDeleteClick = () => {
        if (selectedIds.size === 0) return;
        setIsBatchDeleteModalOpen(true);
    };

    const handleBatchDeleteConfirm = async () => {
        setBatchDeleting(true);
        try {
            await rbacService.deleteRoles(Array.from(selectedIds));
            toast.success(`Đã xóa ${selectedIds.size} vai trò thành công`);
            setIsBatchDeleteModalOpen(false);
            setSelectedIds(new Set());
            await fetchRoles(currentPage);
        } catch (error: any) {
            toast.error(error.message || 'Xóa nhiều vai trò thất bại');
        } finally {
            setBatchDeleting(false);
        }
    };

    // Handle opening assign permissions modal
    const handleAssignClick = async (roleId: string, roleTitle: string) => {
        setAssigningRole({ id: roleId, title: roleTitle });
        setIsAssignModalOpen(true);
        setLoadingPermissions(true);

        try {
            // Fetch all permissions
            const permissionsResponse = await rbacService.getPermissions(1, 100);
            const permissionsList = (permissionsResponse as any)?.data || [];
            setAllPermissions(permissionsList);

            // Fetch current role permissions
            const rolePermissions = await rbacService.getRolePermissions(roleId);
            const rolePermissionIds = (rolePermissions || []).map((p: PermissionResponseDto) => p.id);
            setSelectedPermissions(rolePermissionIds);
        } catch (error: any) {
            toast.error(error.message || t('pages.roles.loadPermissionsFailed'));
        } finally {
            setLoadingPermissions(false);
        }
    };

    const handleCloseAssignModal = () => {
        setIsAssignModalOpen(false);
        setAssigningRole(null);
        setSelectedPermissions([]);
        setAllPermissions([]);
    };

    const handlePermissionToggle = (permissionId: string) => {
        setSelectedPermissions(prev =>
            prev.includes(permissionId)
                ? prev.filter(id => id !== permissionId)
                : [...prev, permissionId]
        );
    };

    const handleSelectAllPermissions = () => {
        if (selectedPermissions.length === allPermissions.length) {
            setSelectedPermissions([]);
        } else {
            setSelectedPermissions(allPermissions.map(p => p.id));
        }
    };

    const handleSavePermissions = async () => {
        if (!assigningRole) return;

        setSavingPermissions(true);
        try {
            await rbacService.assignPermissionsToRole(assigningRole.id, {
                permissionIds: selectedPermissions,
            });
            toast.success(t('pages.roles.assignSuccess'));
            handleCloseAssignModal();
        } catch (error: any) {
            toast.error(error.message || t('pages.roles.assignFailed'));
        } finally {
            setSavingPermissions(false);
        }
    };

    // Filter roles based on search query
    const filteredRoles = roles.filter(role => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
            role.title.toLowerCase().includes(query) ||
            role.slug.toLowerCase().includes(query) ||
            (role.description && role.description.toLowerCase().includes(query))
        );
    });

    return (
        <div className="flex-1 bg-gray-50 p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('pages.roles.title')}</h1>
                <p className="text-gray-500 text-sm">{t('pages.roles.description') || 'Quản lý các vai trò trong hệ thống'}</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('pages.roles.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    {selectedIds.size > 0 && (
                        <button
                            onClick={handleBatchDeleteClick}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Xóa {selectedIds.size} đã chọn
                        </button>
                    )}
                    <button
                        onClick={handleOpenModal}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {t('pages.roles.addRole')}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                        {t('common.filter')}
                    </button>
                </div>
            </div>

            {/* Roles Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left w-12">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                                        checked={filteredRoles.length > 0 && selectedIds.size === filteredRoles.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.roles.role')}</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.roles.slug')}</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.roles.description')}</th>
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
                            ) : filteredRoles.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        {searchQuery ? t('pages.roles.noRolesFound') : t('pages.roles.noRolesYet')}
                                    </td>
                                </tr>
                            ) : (
                                filteredRoles.map((role) => (
                                    <tr key={role.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                                                checked={selectedIds.has(role.id)}
                                                onChange={() => handleSelectItem(role.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                    <Shield className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div className="text-sm font-medium text-gray-900">{role.title}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 font-mono">
                                                {role.slug}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 max-w-md truncate">
                                                {role.description || '—'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${role.active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {role.active ? 'Hoạt động' : 'Không hoạt động'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {new Date(role.createdAt).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleAssignClick(role.id, role.title)}
                                                    className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded"
                                                    title="Gán Permissions"
                                                >
                                                    <Key className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setIsModalOpen(true);
                                                        setIsEditMode(true);
                                                        setEditingRoleId(role.id);
                                                        setFormData({
                                                            title: role.title,
                                                            slug: role.slug,
                                                            description: role.description || '',
                                                        });
                                                    }}
                                                    className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded"
                                                    title={t('common.edit')}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(role.id, role.title)}
                                                    disabled={deletingId === role.id}
                                                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title={t('common.delete')}
                                                >
                                                    {deletingId === role.id ? (
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
                            Hiển thị {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} của {totalItems} roles
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => fetchRoles(currentPage - 1)}
                                disabled={currentPage === 1 || fetching}
                                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Trước
                            </button>
                            <span className="px-3 py-1 text-sm text-gray-700">
                                Trang {currentPage} / {Math.ceil(totalItems / pageSize)}
                            </span>
                            <button
                                onClick={() => fetchRoles(currentPage + 1)}
                                disabled={currentPage >= Math.ceil(totalItems / pageSize) || fetching}
                                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add/Edit Role Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">
                                {isEditMode ? 'Chỉnh sửa Role' : 'Tạo Role mới'}
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
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên Role <span className="text-red-500">*</span>
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
                                    placeholder="Nhập tên role..."
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                                    Slug <span className="text-red-500">*</span>
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
                                    placeholder="vd: admin, manager, user..."
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mô tả
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="Nhập mô tả về role..."
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
                                                : 'Tạo Role'}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && roleToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">{t('common.delete')} Role</h2>
                        </div>

                        <div className="p-6">
                            <p className="text-gray-700 mb-4">
                                Bạn có chắc chắn muốn xóa role <strong>"{roleToDelete.title}"</strong>?
                            </p>
                            <p className="text-sm text-red-600">
                                {t('common.deleteWarning') || 'Hành động này không thể hoàn tác.'}
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleDeleteCancel}
                                disabled={deletingId === roleToDelete.id}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteConfirm}
                                disabled={deletingId === roleToDelete.id}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {deletingId === roleToDelete.id && <Loader2 className="w-4 h-4 animate-spin" />}
                                <span>{deletingId === roleToDelete.id ? t('common.deleting') : t('common.delete')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Permissions Modal */}
            {isAssignModalOpen && assigningRole && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{t('pages.roles.assignPermissions')}</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {t('pages.roles.role')}: <span className="font-medium text-purple-600">{assigningRole.title}</span>
                                </p>
                            </div>
                            <button
                                onClick={handleCloseAssignModal}
                                disabled={savingPermissions}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto flex-1">
                            {loadingPermissions ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                                    <span className="ml-2 text-gray-600">{t('pages.roles.loadingPermissions')}</span>
                                </div>
                            ) : allPermissions.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    {t('pages.roles.noPermissionsYet')}
                                </div>
                            ) : (
                                <>
                                    {/* Select All */}
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedPermissions.length === allPermissions.length}
                                                onChange={handleSelectAllPermissions}
                                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">
                                                {t('pages.roles.selectAll')} ({allPermissions.length} permissions)
                                            </span>
                                        </label>
                                        <span className="text-sm text-gray-500">
                                            {t('pages.roles.selectedCount')}: {selectedPermissions.length}
                                        </span>
                                    </div>

                                    {/* Permissions List */}
                                    <div className="space-y-2">
                                        {allPermissions.map((permission) => (
                                            <label
                                                key={permission.id}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPermissions.includes(permission.id)}
                                                    onChange={() => handlePermissionToggle(permission.id)}
                                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <Key className="w-4 h-4 text-green-600" />
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {permission.title}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="px-2 py-0.5 rounded text-xs font-mono bg-gray-100 text-gray-600">
                                                            {permission.slug}
                                                        </span>
                                                        {permission.resource && (
                                                            <span className="px-2 py-0.5 rounded text-xs bg-indigo-100 text-indigo-700">
                                                                {permission.resource}
                                                            </span>
                                                        )}
                                                        {permission.action && (
                                                            <span className={`px-2 py-0.5 rounded text-xs ${permission.action === 'READ' ? 'bg-blue-100 text-blue-700' :
                                                                permission.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                                                                    permission.action === 'UPDATE' ? 'bg-yellow-100 text-yellow-700' :
                                                                        permission.action === 'DELETE' ? 'bg-red-100 text-red-700' :
                                                                            'bg-purple-100 text-purple-700'
                                                                }`}>
                                                                {permission.action}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleCloseAssignModal}
                                disabled={savingPermissions}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                type="button"
                                onClick={handleSavePermissions}
                                disabled={savingPermissions || loadingPermissions}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {savingPermissions && <Loader2 className="w-4 h-4 animate-spin" />}
                                <span>{savingPermissions ? t('pages.roles.saving') : t('pages.roles.saveChanges')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Batch Delete Confirmation Modal */}
            {isBatchDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Xóa nhiều vai trò</h2>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 mb-4">
                                Bạn có chắc chắn muốn xóa {selectedIds.size} vai trò đã chọn không?
                            </p>
                            <p className="text-sm text-red-600">
                                Hành động này không thể hoàn tác và sẽ xóa vĩnh viễn các vai trò này.
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setIsBatchDeleteModalOpen(false)}
                                disabled={batchDeleting}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                onClick={handleBatchDeleteConfirm}
                                disabled={batchDeleting}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {batchDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                                <span>{batchDeleting ? t('common.deleting') : t('common.delete')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RolesManagement;
