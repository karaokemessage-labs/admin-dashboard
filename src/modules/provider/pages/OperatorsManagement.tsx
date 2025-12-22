import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Filter, X, Loader2, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';
import { operatorService, CreateOperatorRequest, Operator } from '../../../services/operatorService';

const OperatorsManagement = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [operatorToDelete, setOperatorToDelete] = useState<{ id: string; name: string } | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [fetchingDetail, setFetchingDetail] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingOperatorId, setEditingOperatorId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<string>('inactive');
  const [editRegion, setEditRegion] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(7);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [formData, setFormData] = useState<CreateOperatorRequest>({
    name: '',
    contact_email: '',
    region: 'GLOBAL',
    admin_username: '',
    admin_display_name: '',
    admin_email: '',
    temp_password: '',
  });

  const [operators, setOperators] = useState<Operator[]>([]);

  // Fetch operators on component mount
  useEffect(() => {
    fetchOperators(1);
  }, []);

  const fetchOperators = async (page: number) => {
    setFetching(true);
    try {
      const { operators: items, page: apiPage, total } = await operatorService.getOperators(page, pageSize);
      setOperators(items);
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
    setEditingOperatorId(null);
    setEditStatus('inactive');
    setEditRegion('');
    setIsModalOpen(true);
    setFormData({
      name: '',
      contact_email: '',
      region: 'GLOBAL',
      admin_username: '',
      admin_display_name: '',
      admin_email: '',
      temp_password: '',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingOperatorId(null);
    setEditStatus('inactive');
    setEditRegion('');
    setFormData({
      name: '',
      contact_email: '',
      region: 'GLOBAL',
      admin_username: '',
      admin_display_name: '',
      admin_email: '',
      temp_password: '',
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

    // Validate required fields
    if (!formData.name.trim() || !formData.contact_email.trim() || 
        !formData.admin_username.trim() || !formData.admin_display_name.trim() || 
        !formData.admin_email.trim() || !formData.temp_password.trim()) {
      toast.error(t('common.pleaseFillAllFields'));
      return;
    }

    setLoading(true);
    try {
      if (isEditMode && editingOperatorId) {
        await operatorService.updateOperator(editingOperatorId, {
          name: formData.name,
          status: editStatus,
          region: formData.region || editRegion,
        });
        toast.success(t('common.update') + ' ' + t('common.success'));
      } else {
        await operatorService.createOperator(formData);
        toast.success(t('pages.operators.createSuccess'));
      }

      handleCloseModal();
      await fetchOperators(currentPage);
    } catch (error: any) {
      toast.error(error.message || t('pages.operators.createFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (operatorId: string, operatorName: string) => {
    setOperatorToDelete({ id: operatorId, name: operatorName });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!operatorToDelete) return;

    setDeletingId(operatorToDelete.id);
    try {
      await operatorService.deleteOperator(operatorToDelete.id);
      toast.success(t('pages.operators.deleteSuccess'));
      setIsDeleteModalOpen(false);
      setOperatorToDelete(null);
      await fetchOperators(currentPage);
    } catch (error: any) {
      toast.error(error.message || t('pages.operators.deleteFailed'));
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setOperatorToDelete(null);
  };

  const handleViewDetail = async (operator: Operator) => {
    setIsDetailModalOpen(true);
    setFetchingDetail(true);
    setSelectedOperator(null);
    
    try {
      const response = await operatorService.getOperatorDetail(operator.id);
      if (response.data) {
        setSelectedOperator(response.data);
      }
    } catch (error: any) {
      toast.error(error.message || t('common.error'));
      setIsDetailModalOpen(false);
    } finally {
      setFetchingDetail(false);
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOperator(null);
  };

  const filteredOperators = operators.filter(operator =>
    operator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    operator.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('pages.operators.title')}</h1>
          <p className="text-gray-600">{t('pages.operators.description')}</p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('pages.operators.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4" />
                <span>{t('common.filter')}</span>
              </button>
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{t('pages.operators.addOperator')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('pages.operators.title')}</p>
                <p className="text-2xl font-bold text-gray-900">{operators.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">O</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('common.active')}</p>
                <p className="text-2xl font-bold text-green-600">
                  {operators.filter(op => op.status?.toUpperCase() === 'ACTIVE').length}
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
                  {operators.filter(op => op.status?.toUpperCase() === 'INACTIVE').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 font-bold">✗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Operators Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {fetching ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              <span className="ml-3 text-gray-600">{t('common.loadingData')}</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('pages.operators.title')}
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
                    {t('common.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOperators.map((operator) => (
                  <tr key={operator.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-purple-600 font-semibold">
                            {operator.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{operator.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{operator.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          operator.status?.toUpperCase() === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {operator.status?.toUpperCase() === 'ACTIVE' ? t('common.active') : t('common.inactive')}
                      </span>
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {operator.createdAt ? new Date(operator.createdAt).toLocaleDateString('vi-VN') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {operator.lastLogin ? new Date(operator.lastLogin).toLocaleDateString('vi-VN') : '-'}
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetail(operator)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded"
                          title={t('pages.operators.viewDetails')}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setIsModalOpen(true);
                            setIsEditMode(true);
                            setEditingOperatorId(operator.id);
                            setEditStatus(operator.status || 'inactive');
                            setEditRegion(operator.region || '');
                            setFormData({
                              name: operator.name,
                              contact_email: operator.email || '',
                              region: operator.region || 'GLOBAL',
                              admin_username: '',
                              admin_display_name: '',
                              admin_email: '',
                              temp_password: '',
                            });
                          }}
                          className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded"
                          title={t('pages.operators.edit')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(String(operator.id), operator.name)}
                          disabled={deletingId === String(operator.id)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title={t('pages.operators.deleteOperator')}
                        >
                          {deletingId === String(operator.id) ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
            </div>
          )}

          {!fetching && filteredOperators.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchQuery ? t('pages.operators.noOperatorsFound') : t('pages.operators.noOperatorsYet')}
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
                {t('pages.operators.operatorsLabel')}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => currentPage > 1 && fetchOperators(currentPage - 1)}
                  disabled={currentPage === 1 || fetching}
                  className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('common.previous') || 'Previous'}
                </button>

                <span className="text-sm text-gray-600">
                  {t('common.page')}{' '}
                  <span className="font-medium">{currentPage}</span>{' '}
                  {t('common.of') || 'of'}{' '}
                  <span className="font-medium">{totalPages}</span>
                </span>

                <button
                  type="button"
                  onClick={() => currentPage < totalPages && fetchOperators(currentPage + 1)}
                  disabled={currentPage >= totalPages || fetching}
                  className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('common.next') || 'Next'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Operator Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditMode ? t('common.editAction') : t('pages.operators.addOperator')}
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
                  {t('pages.operators.operatorName')} <span className="text-red-500">*</span>
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
                  placeholder={t('pages.operators.enterOperatorName')}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder={t('common.email')}
                />
              </div>

              {!isEditMode && (
                <>
                  <div className="mb-4">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('common.region') || 'Region'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder={t('common.region') || 'Enter region (e.g., GLOBAL, ASIA, etc.)'}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="admin_username" className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="admin_username"
                      name="admin_username"
                      value={formData.admin_username}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter admin username"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="admin_display_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Display Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="admin_display_name"
                      name="admin_display_name"
                      value={formData.admin_display_name}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter admin display name"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="admin_email" className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="admin_email"
                      name="admin_email"
                      value={formData.admin_email}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter admin email"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="temp_password" className="block text-sm font-medium text-gray-700 mb-2">
                      Temporary Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="temp_password"
                      name="temp_password"
                      value={formData.temp_password}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter temporary password"
                    />
                  </div>
                </>
              )}
              
              {/* When editing, allow changing status & region */}

              {isEditMode && (
                <>
                  <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('common.status')}
                    </label>
                    <select
                      id="status"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="active">{t('common.active')}</option>
                      <option value="inactive">{t('common.inactive')}</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                      {'Region'}
                    </label>
                    <input
                      type="text"
                      id="region"
                      value={editRegion}
                      onChange={(e) => setEditRegion(e.target.value)}
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder={t('common.region') || 'Enter region'}
                    />
                  </div>
                </>
              )}

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
                        ? t('common.update')
                        : t('common.creating')
                      : isEditMode
                        ? t('common.update')
                        : t('pages.operators.createOperator')}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && operatorToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('pages.operators.deleteOperatorTitle')}</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {t('common.deleteConfirmMessage').replace('this item', `Operator "${operatorToDelete.name}"`)}
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
                disabled={deletingId === operatorToDelete.id}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deletingId === operatorToDelete.id}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deletingId === operatorToDelete.id && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{deletingId === operatorToDelete.id ? t('common.deleting') : t('common.delete')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Detail Modal */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">{t('pages.operators.operatorDetails')}</h2>
              <button
                onClick={handleCloseDetailModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {fetchingDetail ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                  <span className="ml-3 text-gray-600">{t('common.loadingData')}</span>
                </div>
              ) : selectedOperator ? (
                <>
                  {/* Operator Avatar and Name */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-2xl">
                        {selectedOperator.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedOperator.name}</h3>
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mt-2 ${
                          selectedOperator.status?.toUpperCase() === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {selectedOperator.status?.toUpperCase() === 'ACTIVE' ? t('common.active') : t('common.inactive')}
                      </span>
                    </div>
                  </div>

                  {/* Operator Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">{t('common.code')}</label>
                      <p className="text-base text-gray-900 font-mono">{selectedOperator.code || '-'}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">{t('common.email')}</label>
                      <p className="text-base text-gray-900">{selectedOperator.email || '-'}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">{t('common.status')}</label>
                      <p className="text-base text-gray-900">
                        {selectedOperator.status?.toUpperCase() === 'ACTIVE' ? t('common.active') : t('common.inactive')}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">{t('pages.tables.id')}</label>
                      <p className="text-base text-gray-900 font-mono text-sm break-all">{selectedOperator.id}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                      <p className="text-base text-gray-900 font-mono text-sm">
                        {selectedOperator.userId || '-'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Created By</label>
                      <p className="text-base text-gray-900 font-mono text-sm">
                        {selectedOperator.createdBy || '-'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">{t('common.createdAt')}</label>
                      <p className="text-base text-gray-900">
                        {selectedOperator.createdAt
                          ? new Date(selectedOperator.createdAt).toLocaleDateString('vi-VN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '-'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Updated At</label>
                      <p className="text-base text-gray-900">
                        {selectedOperator.updatedAt
                          ? new Date(selectedOperator.updatedAt).toLocaleDateString('vi-VN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '-'}
                      </p>
                    </div>
                  </div>

                  {/* Config Section */}
                  {selectedOperator.config && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Config</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="text-sm text-gray-600 overflow-x-auto">
                          {JSON.stringify(selectedOperator.config, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">{t('common.error')}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseDetailModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('common.close')}
              </button>
              {selectedOperator && (
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  {t('common.edit')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperatorsManagement;

