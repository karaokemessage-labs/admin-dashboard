import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, MoreVertical, Filter, X, Loader2, RefreshCw, UserCog, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';
import { massageService, Massage } from '../../../services/massageService';

const MassagesManagement = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMassageId, setEditingMassageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<{ id: string; name: string } | null>(null);
  const [formData, setFormData] = useState({
    code: 'massage001',
    name: 'Massage Spa Center',
    email: 'massage@kaka.club',
  });

  const [accounts, setAccounts] = useState<Massage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(7);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Bulk Selection States
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Localized labels for bulk delete
  const labels = {
    bulkDeleteTitle: 'Xóa nhiều Massage',
    bulkDeleteWarning: 'Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh viễn khỏi hệ thống.',
    bulkDeleteConfirm: (count: number) => `Bạn có chắc chắn muốn xóa ${count} massage đã chọn?`,
    bulkDeleteList: 'Danh sách sẽ bị xóa:',
    bulkDeletingLabel: (count: number) => `Đang xóa ${count} massage...`,
    bulkDeleteBtn: (count: number) => `Xóa ${count} massage`,
    deleteSelected: 'Xóa đã chọn',
    bulkDeleteSuccess: (count: number) => `Đã xóa thành công ${count} massage`,
    deleteFailed: 'Xóa thất bại. Vui lòng thử lại.',
  };

  // Fetch massages on component mount
  useEffect(() => {
    fetchMassages(1);
  }, []);

  const fetchMassages = async (page: number) => {
    setFetching(true);
    try {
      const { massages, page: apiPage, total } = await massageService.getMassages(page, pageSize);
      setAccounts(massages);
      setCurrentPage(apiPage);
      setTotalItems(total);
    } catch (error: any) {
      toast.error(error.message || t('common.error'));
    } finally {
      setFetching(false);
    }
  };

  const generateRandomData = () => {
    const randomNum = Math.floor(Math.random() * 1000000);
    const prefixes = ['provider', 'admin', 'manager', 'account', 'user'];
    const suffixes = ['test', 'demo', 'temp', 'new', 'dev'];
    const domains = ['example.com', 'test.com', 'demo.com', 'provider.com', 'admin.com'];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];

    return {
      code: `${prefix}${randomNum}`,
      name: `${prefix} ${suffix} ${randomNum}`,
      email: `${prefix}${suffix}${randomNum}@${domain}`,
    };
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingMassageId(null);
    setIsModalOpen(true);
    setFormData({
      code: 'massage001',
      name: 'Massage Spa Center',
      email: 'massage@kaka.club',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingMassageId(null);
    setFormData({
      code: 'massage001',
      name: 'Massage Spa Center',
      email: 'massage@kaka.club',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.code.trim() || !formData.name.trim() || !formData.email.trim()) {
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
      if (isEditMode && editingMassageId) {
        // Call API to update massage
        await massageService.updateMassage(editingMassageId, {
          name: formData.name,
          code: formData.code,
          email: formData.email,
        });
        toast.success(t('common.update') + ' ' + t('common.success'));
      } else {
        // Call API to create massage
        await massageService.createMassage({
          name: formData.name,
          code: formData.code,
          email: formData.email,
        });
        toast.success(t('pages.providerAccounts.createSuccess'));
      }

      handleCloseModal();
      await fetchMassages(currentPage);
    } catch (error: any) {
      toast.error(error.message || (isEditMode ? t('pages.providerAccounts.updateFailed') : t('pages.providerAccounts.createFailed')));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (accountId: string, accountName: string) => {
    setAccountToDelete({ id: accountId, name: accountName });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!accountToDelete) return;

    setDeletingId(accountToDelete.id);
    try {
      await massageService.deleteMassage(accountToDelete.id);
      toast.success(t('pages.providerAccounts.deleteSuccess'));
      setIsDeleteModalOpen(false);
      setAccountToDelete(null);
      await fetchMassages(currentPage);
    } catch (error: any) {
      toast.error(error.message || t('pages.providerAccounts.deleteFailed'));
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setAccountToDelete(null);
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
    if (selectedIds.size === accounts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(accounts.map(acc => String(acc.id))));
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
      const bulkResult = await massageService.deleteMassages(Array.from(selectedIds));
      if (bulkResult.failedCount === 0) {
        toast.success(labels.bulkDeleteSuccess(bulkResult.successCount));
      } else {
        toast.warning(
          `Xóa thành công ${bulkResult.successCount} massage. ${bulkResult.failedCount} xóa thất bại.`
        );
      }
      setSelectedIds(new Set());
      setIsBulkDeleteModalOpen(false);
      await fetchMassages(currentPage);
    } catch (error: any) {
      toast.error(error.message || labels.deleteFailed);
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleBulkDeleteCancel = () => {
    setIsBulkDeleteModalOpen(false);
  };

  const isAllSelected = accounts.length > 0 && selectedIds.size === accounts.length;
  const isSomeSelected = selectedIds.size > 0 && selectedIds.size < accounts.length;

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('pages.providerAccounts.title')}</h1>
          <p className="text-gray-600">{t('pages.providerAccounts.description')}</p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('pages.providerAccounts.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full sm:w-auto">
              {selectedIds.size > 0 && (
                <button
                  onClick={handleBulkDeleteClick}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors animate-fade-in"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{labels.deleteSelected} ({selectedIds.size})</span>
                </button>
              )}
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4" />
                <span>{t('common.filter')}</span>
              </button>
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{t('pages.providerAccounts.addAccount')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('pages.providerAccounts.totalAccounts')}</p>
                <p className="text-2xl font-bold text-gray-900">{accounts.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserCog className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('pages.providerAccounts.activeAccounts')}</p>
                <p className="text-2xl font-bold text-green-600">
                  {accounts.filter(acc => acc.status?.toUpperCase() === 'ACTIVE').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('common.inactive')}</p>
                <p className="text-2xl font-bold text-red-600">
                  {accounts.filter(acc => acc.status?.toUpperCase() !== 'ACTIVE').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 font-bold">✗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {fetching ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              <span className="ml-3 text-gray-600">{t('pages.providerAccounts.loadingAccounts')}</span>
            </div>
          ) : (
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('pages.providerAccounts.providerAccount')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('common.code')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('common.email')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('common.status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('common.createdAt')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('common.lastLogin')}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('pages.tables.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAccounts.map((account) => (
                    <tr key={account.id} className={`transition-colors ${selectedIds.has(String(account.id)) ? 'bg-purple-50' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-3 text-center w-10">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(String(account.id))}
                          onChange={() => handleToggleSelect(String(account.id))}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-purple-600 font-semibold">
                              {account.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{account.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{account.code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{account.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${account.status?.toUpperCase() === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {account.status?.toUpperCase() === 'ACTIVE' ? t('common.active') : t('common.inactive')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {account.createdAt ? new Date(account.createdAt).toLocaleDateString('vi-VN') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {account.lastLogin ? new Date(account.lastLogin).toLocaleDateString('vi-VN') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setIsModalOpen(true);
                              setIsEditMode(true);
                              setEditingMassageId(account.id);
                              setFormData({
                                code: account.code || '',
                                name: account.name || '',
                                email: account.email || '',
                              });
                            }}
                            className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded"
                            title={t('common.edit')}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(account.id, account.name)}
                            disabled={deletingId === account.id}
                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            title={t('pages.providerAccounts.deleteAccount')}
                          >
                            {deletingId === account.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-50 rounded">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!fetching && filteredAccounts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchQuery ? t('pages.providerAccounts.noAccountsFound') : t('pages.providerAccounts.noAccountsYet')}
              </p>
            </div>
          )}

          {/* Pagination */}
          {!fetching && totalItems > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                {t('common.showing')}{' '}
                <span className="font-medium">
                  {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1}
                </span>{' '}
                {t('common.to')}{' '}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, totalItems)}
                </span>{' '}
                {t('common.of')}{' '}
                <span className="font-medium">{totalItems}</span>{' '}
                {t('pages.providerAccounts.accountsLabel') || 'accounts'}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => currentPage > 1 && fetchMassages(currentPage - 1)}
                  disabled={currentPage === 1 || fetching}
                  className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('common.previous') || 'Previous'}
                </button>

                <span className="text-sm text-gray-600">
                  {t('common.page')}{' '}
                  <span className="font-medium">{currentPage}</span>{' '}
                  {t('common.of') || 'of'}{' '}
                  <span className="font-medium">{Math.max(1, Math.ceil(totalItems / pageSize))}</span>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
                    if (currentPage < totalPages) {
                      fetchMassages(currentPage + 1);
                    }
                  }}
                  disabled={currentPage >= Math.ceil(totalItems / pageSize) || fetching}
                  className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('common.next') || 'Next'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Provider Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditMode ? t('common.editAction') : t('pages.providerAccounts.addAccount')}
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
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    {t('common.code')} <span className="text-red-500">*</span>
                  </label>
                  {!isEditMode && (
                    <button
                      type="button"
                      onClick={() => {
                        const randomData = generateRandomData();
                        setFormData(randomData);
                      }}
                      disabled={loading}
                      className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      title={t('pages.providerAccounts.randomData')}
                    >
                      <RefreshCw className="w-3 h-3" />
                      {t('pages.providerAccounts.random')}
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder={t('common.code') + '...'}
                />
              </div>

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
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder={t('common.name') + '...'}
                />
              </div>

              <div className="mb-6">
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
                  placeholder={t('common.enterProviderAccountEmail')}
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
                        : t('pages.providerAccounts.createAccount')}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && accountToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('pages.providerAccounts.deleteAccountTitle')}</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {t('common.deleteConfirmMessage').replace('this item', `Massage "${accountToDelete.name}"`)}
              </p>
              <p className="text-sm text-red-600">
                {t('common.deleteConfirmMessage').split('?')[1] || t('common.deleteConfirmMessage')}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleDeleteCancel}
                disabled={deletingId === accountToDelete.id}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deletingId === accountToDelete.id}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deletingId === accountToDelete.id && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{deletingId === accountToDelete.id ? t('common.deleting') : t('common.delete')}</span>
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
            <div className="p-6 border-b border-gray-200 flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-xl font-bold">{labels.bulkDeleteTitle}</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4 font-medium">
                {labels.bulkDeleteConfirm(selectedIds.size)}
              </p>
              <p className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                {labels.bulkDeleteWarning}
              </p>

              <div className="max-h-32 overflow-y-auto mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {labels.bulkDeleteList}
                </p>
                <div className="space-y-1">
                  {accounts.filter(acc => selectedIds.has(String(acc.id))).map(acc => (
                    <div key={acc.id} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      {acc.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleBulkDeleteCancel}
                disabled={bulkDeleting}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleBulkDeleteConfirm}
                disabled={bulkDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {bulkDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{labels.bulkDeletingLabel(selectedIds.size)}</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>{labels.bulkDeleteBtn(selectedIds.size)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MassagesManagement;

