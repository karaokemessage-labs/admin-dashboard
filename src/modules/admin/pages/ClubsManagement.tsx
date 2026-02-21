import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Play, Pause, X, Loader2, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';
import { clubService, CreateClubRequest, Club } from '../../../services/clubService';

const ClubsManagement = () => {
  const { t, language } = useLanguage();
  // Localized labels for this page
  const labels = language === 'vi' ? {
    bulkDeleteTitle: 'Xóa nhiều Club',
    bulkDeleteWarning: 'Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh viễn khỏi hệ thống.',
    bulkDeleteConfirm: (count: number) => `Bạn có chắc chắn muốn xóa ${count} club đã chọn?`,
    bulkDeleteList: 'Danh sách sẽ bị xóa:',
    bulkDeleting: (count: number) => `Đang xóa ${count} club...`,
    bulkDeleteBtn: (count: number) => `Xóa ${count} club`,
    deleteSelected: 'Xóa đã chọn',
    bulkDeleteSuccess: (count: number) => `Đã xóa thành công ${count} club`,
    deleteFailed: 'Xóa thất bại. Vui lòng thử lại.',
  } : {
    bulkDeleteTitle: 'Delete Multiple Clubs',
    bulkDeleteWarning: 'This action cannot be undone. Data will be permanently removed from the system.',
    bulkDeleteConfirm: (count: number) => `Are you sure you want to delete ${count} selected clubs?`,
    bulkDeleteList: 'Clubs to be deleted:',
    bulkDeleting: (count: number) => `Deleting ${count} clubs...`,
    bulkDeleteBtn: (count: number) => `Delete ${count} clubs`,
    deleteSelected: 'Delete Selected',
    bulkDeleteSuccess: (count: number) => `Successfully deleted ${count} clubs`,
    deleteFailed: 'Deletion failed. Please try again.',
  };

  const [clubs, setClubs] = useState<Club[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingClubId, setEditingClubId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clubToDelete, setClubToDelete] = useState<{ id: string; name: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Bulk Selection States
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(7);
  const [, setTotalItems] = useState<number>(0);
  const [formData, setFormData] = useState<CreateClubRequest>({
    name: 'Karaoke VIP 201',
    type: 'KARAOKE',
    address: '123 Main Street, Ho Chi Minh City',
    phone: '+84901234567',
    email: 'contact@kaka.club',
    description: 'Premium karaoke club with modern facilities',
  });

  // Fetch clubs on component mount
  useEffect(() => {
    fetchClubs(1);
  }, []);

  const fetchClubs = async (page: number) => {
    setFetching(true);
    try {
      const { clubs: items, page: apiPage, total } = await clubService.getClubs(page, pageSize);
      setClubs(items);
      setCurrentPage(apiPage);
      setTotalItems(total);
    } catch (error: any) {
      toast.error(error.message || t('common.error'));
    } finally {
      setFetching(false);
    }
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingClubId(null);
    setIsModalOpen(true);
    setFormData({
      name: 'Karaoke VIP 201',
      type: 'KARAOKE',
      address: '123 Main Street, Ho Chi Minh City',
      phone: '+84901234567',
      email: 'contact@kaka.club',
      description: 'Premium karaoke club with modern facilities',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingClubId(null);
    setFormData({
      name: 'Karaoke VIP 201',
      type: 'KARAOKE',
      address: '123 Main Street, Ho Chi Minh City',
      phone: '+84901234567',
      email: 'contact@kaka.club',
      description: 'Premium karaoke club with modern facilities',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim() || !formData.type.trim() || !formData.address.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast.error(t('common.pleaseFillAllFields'));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Email không hợp lệ');
      return;
    }

    setLoading(true);
    try {
      if (isEditMode && editingClubId) {
        // Call API to update club
        await clubService.updateClub(editingClubId, {
          name: formData.name,
          type: formData.type,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          description: formData.description,
        });
        toast.success(t('common.update') + ' ' + t('common.success'));
      } else {
        // Call API to create club
        await clubService.createClub({
          name: formData.name,
          type: formData.type,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          description: formData.description,
        });
        toast.success(t('pages.games.createSuccess') || 'Tạo Club thành công');
      }

      handleCloseModal();
      await fetchClubs(currentPage);
    } catch (error: any) {
      toast.error(error.message || (isEditMode ? 'Cập nhật Club thất bại' : 'Tạo Club thất bại'));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteClick = (clubId: string, clubName: string) => {
    setClubToDelete({ id: clubId, name: clubName });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!clubToDelete) return;

    setDeletingId(clubToDelete.id);
    try {
      await clubService.deleteClub(clubToDelete.id);
      toast.success(t('pages.games.deleteSuccess') || 'Xóa Club thành công');
      setIsDeleteModalOpen(false);
      setClubToDelete(null);
      await fetchClubs(currentPage);
    } catch (error: any) {
      toast.error(error.message || t('pages.games.deleteFailed') || 'Xóa Club thất bại');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setClubToDelete(null);
  };

  // ── Bulk Selection Handlers ──
  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === clubs.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(clubs.map(club => String(club.id))));
    }
  };

  const handleBulkDeleteClick = () => {
    if (selectedIds.size === 0) return;
    setIsBulkDeleteModalOpen(true);
  };

  const handleBulkDeleteConfirm = async () => {
    if (selectedIds.size === 0) return;
    setBulkDeleting(true);
    try {
      const bulkResult = await clubService.deleteClubs(Array.from(selectedIds));
      if (bulkResult.failedCount === 0) {
        toast.success(labels.bulkDeleteSuccess(bulkResult.successCount));
      } else {
        toast.warning(
          `Xóa thành công ${bulkResult.successCount}/${bulkResult.successCount + bulkResult.failedCount} club. ${bulkResult.failedCount} xóa thất bại.`
        );
      }
      setSelectedIds(new Set());
      setIsBulkDeleteModalOpen(false);
      await fetchClubs(currentPage);
    } catch (error: any) {
      toast.error(error.message || labels.deleteFailed);
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleBulkDeleteCancel = () => {
    setIsBulkDeleteModalOpen(false);
  };

  const isAllSelected = clubs.length > 0 && selectedIds.size === clubs.length;
  const isSomeSelected = selectedIds.size > 0 && selectedIds.size < clubs.length;

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('pages.games.venueManagement')}</h1>
          <p className="text-gray-500 text-sm">{t('pages.games.description')}</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('pages.games.addVenue')}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('pages.games.searchVenuePlaceholder')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {selectedIds.size > 0 && (
              <button
                onClick={handleBulkDeleteClick}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors animate-fade-in whitespace-nowrap"
              >
                <Trash2 className="w-4 h-4" />
                <span>{labels.deleteSelected} ({selectedIds.size})</span>
              </button>
            )}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex-1 sm:flex-none justify-center">
              <Filter className="w-4 h-4" />
              {t('common.filter')}
            </button>
          </div>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-center w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={el => { if (el) el.indeterminate = isSomeSelected; }}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.tables.id')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.games.venueName')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.games.bookingsCount')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.games.revenue')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.games.actions')}</th>
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
              ) : clubs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    {t('pages.games.noVenuesYet') || 'Chưa có club nào'}
                  </td>
                </tr>
              ) : (
                clubs.map((club) => (
                  <tr key={club.id} className={`transition-colors ${selectedIds.has(String(club.id)) ? 'bg-purple-50' : 'hover:bg-gray-50'}`}>
                    <td className="px-4 py-3 text-center w-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(String(club.id))}
                        onChange={() => handleToggleSelect(String(club.id))}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{club.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-gray-900">{club.name}</div>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${club.type === 'KARAOKE' ? 'bg-pink-100 text-pink-800' :
                          club.type === 'MASSAGE' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                          {club.type === 'KARAOKE' ? t('pages.games.venueTypeKaraoke') : club.type === 'MASSAGE' ? t('pages.games.venueTypeMassage') : t('pages.games.venueTypeClub')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${club.status?.toUpperCase() === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}>
                        {club.status?.toUpperCase() === 'ACTIVE' ? (
                          <>
                            <Play className="w-3 h-3" />
                            {t('common.active')}
                          </>
                        ) : (
                          <>
                            <Pause className="w-3 h-3" />
                            {t('common.paused')}
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsModalOpen(true);
                            setIsEditMode(true);
                            setEditingClubId(club.id);
                            setFormData({
                              name: club.name || '',
                              type: club.type || 'KARAOKE',
                              address: club.address || '',
                              phone: club.phone || '',
                              email: club.email || '',
                              description: club.description || '',
                            });
                          }}
                          className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded"
                          title={t('common.edit')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(club.id, club.name)}
                          disabled={deletingId === club.id}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title={t('common.delete')}
                        >
                          {deletingId === club.id ? (
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
      </div>

      {/* Add Game Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditMode ? t('common.editAction') : t('pages.games.addVenue')}
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.name')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={t('pages.games.enterVenueName')}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('pages.games.venueType')} <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="KARAOKE">{t('pages.games.venueTypeKaraoke')}</option>
                  <option value="MASSAGE">{t('pages.games.venueTypeMassage')}</option>
                  <option value="CLUB">{t('pages.games.venueTypeClub')}</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập địa chỉ..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập số điện thoại..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập email..."
                />
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  disabled={loading}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                  placeholder="Nhập mô tả (tùy chọn)..."
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
                        : t('pages.games.addVenue')}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && clubToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('common.delete')} Club</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {t('common.deleteConfirmMessage')?.replace('this item', `Club "${clubToDelete.name}"`) || `Bạn có chắc chắn muốn xóa Club "${clubToDelete.name}"?`}
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
                disabled={deletingId === clubToDelete.id}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deletingId === clubToDelete.id}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deletingId === clubToDelete.id && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{deletingId === clubToDelete.id ? t('common.deleting') : t('common.delete')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {isBulkDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 text-red-600">
                <AlertTriangle className="w-6 h-6" />
                <h2 className="text-xl font-bold">{labels.bulkDeleteTitle}</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {labels.bulkDeleteConfirm(selectedIds.size)}
              </p>
              <div className="bg-gray-50 rounded-lg p-3 mb-4 max-h-40 overflow-y-auto">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{labels.bulkDeleteList}</p>
                <div className="flex flex-wrap gap-2">
                  {clubs.filter(c => selectedIds.has(String(c.id))).map(club => (
                    <span key={club.id} className="inline-flex items-center px-2 py-1 rounded-md bg-white border border-gray-200 text-xs text-gray-600">
                      {club.name}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-red-600 flex items-start gap-2">
                <span className="mt-0.5">•</span>
                {labels.bulkDeleteWarning}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleBulkDeleteCancel}
                disabled={bulkDeleting}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleBulkDeleteConfirm}
                disabled={bulkDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {bulkDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{labels.bulkDeleting(selectedIds.size)}</span>
                  </>
                ) : (
                  <span>{labels.bulkDeleteBtn(selectedIds.size)}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubsManagement;

