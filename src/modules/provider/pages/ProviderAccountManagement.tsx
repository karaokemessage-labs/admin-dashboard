import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, MoreVertical, Filter, X, Loader2, RefreshCw, UserCog } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';

interface ProviderAccount {
  id: string;
  code: string;
  name: string;
  email: string;
  status?: string;
  createdAt?: string;
  lastLogin?: string;
}

const ProviderAccountManagement = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<{ id: string; name: string } | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    email: '',
  });

  const [accounts, setAccounts] = useState<ProviderAccount[]>([]);

  // Mock data - sẽ thay bằng API call sau
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAccounts([
        {
          id: '1',
          code: 'provider001',
          name: 'Provider Account 1',
          email: 'provider1@example.com',
          status: 'active',
          createdAt: '2024-01-15',
          lastLogin: '2024-01-20',
        },
        {
          id: '2',
          code: 'provider002',
          name: 'Provider Account 2',
          email: 'provider2@example.com',
          status: 'active',
          createdAt: '2024-01-16',
          lastLogin: '2024-01-19',
        },
      ]);
      setFetching(false);
    }, 500);
  }, []);

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
    const randomData = generateRandomData();
    setIsModalOpen(true);
    setFormData(randomData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      code: '',
      name: '',
      email: '',
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

    setLoading(true);
    try {
      // TODO: Call API to create provider account
      const newAccount: ProviderAccount = {
        id: String(accounts.length + 1),
        code: formData.code,
        name: formData.name,
        email: formData.email,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      setAccounts([...accounts, newAccount]);
      toast.success(t('pages.providerAccounts.createSuccess'));
      handleCloseModal();
    } catch (error: any) {
      toast.error(error.message || t('pages.providerAccounts.createFailed'));
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
      // TODO: Call API to delete provider account
      setAccounts(accounts.filter(acc => acc.id !== accountToDelete.id));
      toast.success(t('pages.providerAccounts.deleteSuccess'));
      setIsDeleteModalOpen(false);
      setAccountToDelete(null);
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
                  {accounts.filter(acc => acc.status === 'active').length}
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
                  {accounts.filter(acc => acc.status === 'inactive').length}
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
                    <tr key={account.id} className="hover:bg-gray-50 transition-colors">
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
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            account.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {account.status === 'active' ? t('common.active') : t('common.inactive')}
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
                          <button className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded">
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
        </div>
      </div>

      {/* Add Provider Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('pages.providerAccounts.addAccount')}</h2>
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
                  <span>{loading ? t('common.creating') : t('pages.providerAccounts.createAccount')}</span>
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
                {t('common.deleteConfirmMessage').replace('this item', `Provider Account "${accountToDelete.name}"`)}
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
    </div>
  );
};

export default ProviderAccountManagement;

