import { useState, useEffect } from 'react';
import { Search, X, Loader2, Edit, Trash2, Bell, CheckCircle2, Archive, Mail } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';
import { notificationService } from '../../../services/notificationService';
import {
  CreateNotificationRequestDto,
  UpdateNotificationRequestDto,
  NotificationResponseDto
} from '../../../types/api';

const NotificationsManagement = () => {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState<NotificationResponseDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingNotificationId, setEditingNotificationId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<{ id: string; title: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBatchDeleteModalOpen, setIsBatchDeleteModalOpen] = useState(false);
  const [batchDeleting, setBatchDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [formData, setFormData] = useState<CreateNotificationRequestDto>({
    title: '',
    message: '',
    userId: '',
    type: '',
  });

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications(1);
  }, []);

  const fetchNotifications = async (page: number) => {
    setFetching(true);
    try {
      const response = await notificationService.getNotifications(page, pageSize);
      // apiClient already extracts data.data from { success, data: {...}, message }
      // So response is already: { items, total, page, limit, totalPages }
      const data = response as any;
      setNotifications(data?.items || []);
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
    setEditingNotificationId(null);
    setIsModalOpen(true);
    setFormData({
      title: '',
      message: '',
      userId: '',
      type: '',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingNotificationId(null);
    setFormData({
      title: '',
      message: '',
      userId: '',
      type: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title.trim() || !formData.message.trim()) {
      toast.error(t('common.pleaseFillAllFields'));
      return;
    }

    setLoading(true);
    try {
      if (isEditMode && editingNotificationId) {
        // Call API to update notification
        const updateData: UpdateNotificationRequestDto = {
          title: formData.title,
          message: formData.message,
          type: formData.type || undefined,
        };
        await notificationService.updateNotification(editingNotificationId, updateData);
        toast.success(t('common.update') + ' ' + t('common.success'));
      } else {
        // Call API to create notification
        await notificationService.createNotification({
          title: formData.title,
          message: formData.message,
          userId: formData.userId || undefined,
          type: formData.type || undefined,
        });
        toast.success('Tạo thông báo thành công');
      }

      handleCloseModal();
      await fetchNotifications(currentPage);
    } catch (error: any) {
      toast.error(error.message || (isEditMode ? 'Cập nhật thông báo thất bại' : 'Tạo thông báo thất bại'));
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

  const handleDeleteClick = (notificationId: string, notificationTitle: string) => {
    setNotificationToDelete({ id: notificationId, title: notificationTitle });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!notificationToDelete) return;

    setDeletingId(notificationToDelete.id);
    try {
      await notificationService.deleteNotification(notificationToDelete.id);
      toast.success('Xóa thông báo thành công');
      setIsDeleteModalOpen(false);
      setNotificationToDelete(null);
      await fetchNotifications(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Xóa thông báo thất bại');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setNotificationToDelete(null);
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      toast.success('Đánh dấu đã đọc thành công');
      await fetchNotifications(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Đánh dấu đã đọc thất bại');
    }
  };

  const handleMarkAsUnread = async (id: string) => {
    try {
      await notificationService.markAsUnread(id);
      toast.success('Đánh dấu chưa đọc thành công');
      await fetchNotifications(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Đánh dấu chưa đọc thất bại');
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await notificationService.archiveNotification(id);
      toast.success('Lưu trữ thông báo thành công');
      await fetchNotifications(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Lưu trữ thông báo thất bại');
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelectedIds = new Set(filteredNotifications.map(n => n.id));
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
      await notificationService.deleteNotifications(Array.from(selectedIds));
      toast.success(`Đã xóa ${selectedIds.size} thông báo thành công`);
      setIsBatchDeleteModalOpen(false);
      setSelectedIds(new Set());
      await fetchNotifications(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Xóa thông báo thất bại');
    } finally {
      setBatchDeleting(false);
    }
  };

  // Filter notifications based on search query and status
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = !searchQuery.trim() ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' ||
      notification.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'READ':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle2 className="w-3 h-3" />
            Đã đọc
          </span>
        );
      case 'UNREAD':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Mail className="w-3 h-3" />
            Chưa đọc
          </span>
        );
      case 'ARCHIVED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Archive className="w-3 h-3" />
            Đã lưu trữ
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const getTypeBadge = (type: string | null) => {
    const typeMap: Record<string, { bg: string; text: string; label: string }> = {
      system: { bg: 'bg-blue-100', text: 'text-blue-800', label: '🔔 Hệ thống' },
      social: { bg: 'bg-green-100', text: 'text-green-800', label: '👥 Xã hội' },
      promotion: { bg: 'bg-orange-100', text: 'text-orange-800', label: '🎁 Khuyến mãi' },
      chat: { bg: 'bg-purple-100', text: 'text-purple-800', label: '💬 Tin nhắn' },
      security: { bg: 'bg-red-100', text: 'text-red-800', label: '🛡️ Bảo mật' },
      booking: { bg: 'bg-cyan-100', text: 'text-cyan-800', label: '📅 Đặt phòng' },
    };

    const config = type ? typeMap[type.toLowerCase()] : null;

    if (!config) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          {type || 'Khác'}
        </span>
      );
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Quản lý Thông báo</h1>
        <p className="text-gray-500 text-sm">Quản lý thông báo trong hệ thống</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tiêu đề hoặc nội dung..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="READ">Đã đọc</option>
            <option value="UNREAD">Chưa đọc</option>
            <option value="ARCHIVED">Đã lưu trữ</option>
          </select>
          {selectedIds.size > 0 && (
            <button
              onClick={handleBatchDeleteClick}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Xóa {selectedIds.size} đã chọn
            </button>
          )}
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Tạo thông báo
          </button>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    checked={filteredNotifications.length > 0 && selectedIds.size === filteredNotifications.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tiêu đề</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nội dung</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Người dùng</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Loại</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày tạo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fetching ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
                    <p className="mt-2 text-gray-600">{t('common.loadingData')}</p>
                  </td>
                </tr>
              ) : filteredNotifications.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    {searchQuery || statusFilter !== 'ALL' ? 'Không tìm thấy thông báo nào' : 'Chưa có thông báo nào'}
                  </td>
                </tr>
              ) : (
                filteredNotifications.map((notification) => (
                  <tr key={notification.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                        checked={selectedIds.has(notification.id)}
                        onChange={() => handleSelectItem(notification.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{notification.id.slice(0, 8)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <Bell className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{notification.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-md truncate">{notification.message}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      #{notification.userId.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTypeBadge(notification.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(notification.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(notification.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        {notification.status === 'UNREAD' && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded"
                            title="Đánh dấu đã đọc"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {notification.status === 'READ' && (
                          <button
                            onClick={() => handleMarkAsUnread(notification.id)}
                            className="text-yellow-600 hover:text-yellow-900 p-2 hover:bg-yellow-50 rounded"
                            title="Đánh dấu chưa đọc"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                        )}
                        {notification.status !== 'ARCHIVED' && (
                          <button
                            onClick={() => handleArchive(notification.id)}
                            className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-50 rounded"
                            title="Lưu trữ"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setIsModalOpen(true);
                            setIsEditMode(true);
                            setEditingNotificationId(notification.id);
                            setFormData({
                              title: notification.title,
                              message: notification.message,
                              userId: notification.userId,
                              type: notification.type || '',
                            });
                          }}
                          className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded"
                          title={t('common.edit')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(notification.id, notification.title)}
                          disabled={deletingId === notification.id}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title={t('common.delete')}
                        >
                          {deletingId === notification.id ? (
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
              Hiển thị {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} của {totalItems} thông báo
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchNotifications(currentPage - 1)}
                disabled={currentPage === 1 || fetching}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                Trang {currentPage} / {Math.ceil(totalItems / pageSize)}
              </span>
              <button
                onClick={() => fetchNotifications(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalItems / pageSize) || fetching}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Notification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditMode ? 'Chỉnh sửa thông báo' : 'Tạo thông báo mới'}
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
                  Tiêu đề <span className="text-red-500">*</span>
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
                  placeholder="Nhập tiêu đề thông báo..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập nội dung thông báo..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                  ID Người dùng (Tùy chọn)
                </label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Để trống để gửi cho người dùng hiện tại"
                />
                <p className="mt-1 text-xs text-gray-500">Để trống nếu muốn gửi cho người dùng hiện tại</p>
              </div>

              <div className="mb-6">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Loại thông báo (Tùy chọn)
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Ví dụ: SYSTEM, ALERT, INFO"
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
                        : 'Tạo thông báo'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && notificationToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('common.delete')} Thông báo</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {t('common.deleteConfirmMessage')?.replace('this item', `thông báo "${notificationToDelete.title}"`) || `Bạn có chắc chắn muốn xóa thông báo "${notificationToDelete.title}"?`}
              </p>
              <p className="text-sm text-red-600">
                {t('common.deleteWarning') || 'Hành động này không thể hoàn tác.'}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleDeleteCancel}
                disabled={deletingId === notificationToDelete.id}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deletingId === notificationToDelete.id}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deletingId === notificationToDelete.id && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{deletingId === notificationToDelete.id ? t('common.deleting') : t('common.delete')}</span>
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
              <h2 className="text-xl font-bold text-gray-900">Xóa nhiều thông báo</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Bạn có chắc chắn muốn xóa {selectedIds.size} thông báo đã chọn không?
              </p>
              <p className="text-sm text-red-600">
                Hành động này không thể hoàn tác và sẽ xóa vĩnh viễn các thông báo này.
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
                <span>{batchDeleting ? 'Đang xóa...' : 'Xóa'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsManagement;

