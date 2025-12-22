import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Filter, X, Loader2, Shield, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Permission {
  id: string;
  name: string;
  code: string;
  description?: string;
}

interface Role {
  id: string;
  name: string;
  code: string;
  description?: string;
  permissions: Permission[];
  createdAt?: string;
  updatedAt?: string;
}

interface OperatorAccount {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt?: string;
  lastLogin?: string;
}

const RolePermissionManagement = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'roles' | 'permissions' | 'operator-accounts'>('roles');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string; type: 'role' | 'permission' } | null>(null);
  
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    code: '',
    description: '',
    permissions: [] as string[],
  });

  const [permissionFormData, setPermissionFormData] = useState({
    name: '',
    code: '',
    description: '',
  });

  // Mock permissions
  const [permissions] = useState<Permission[]>([
    { id: '1', name: 'View Dashboard', code: 'dashboard.view', description: 'Xem trang dashboard' },
    { id: '2', name: 'Manage Games', code: 'games.manage', description: 'Quản lý games' },
    { id: '3', name: 'Manage Operators', code: 'operators.manage', description: 'Quản lý operators' },
    { id: '4', name: 'Manage Players', code: 'players.manage', description: 'Quản lý players' },
    { id: '5', name: 'View Reports', code: 'reports.view', description: 'Xem báo cáo' },
    { id: '6', name: 'Manage Settings', code: 'settings.manage', description: 'Quản lý cài đặt' },
  ]);

  // Mock operator accounts
  const [operatorAccounts] = useState<OperatorAccount[]>([
    {
      id: '1',
      username: 'operator001',
      email: 'operator001@example.com',
      role: 'operator',
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20',
    },
    {
      id: '2',
      username: 'operator002',
      email: 'operator002@example.com',
      role: 'operator',
      status: 'active',
      createdAt: '2024-01-16',
      lastLogin: '2024-01-19',
    },
    {
      id: '3',
      username: 'operator003',
      email: 'operator003@example.com',
      role: 'operator',
      status: 'inactive',
      createdAt: '2024-01-17',
      lastLogin: '2024-01-18',
    },
  ]);

  // Mock roles with permissions
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Super Admin',
      code: 'super_admin',
      description: 'Toàn quyền truy cập hệ thống',
      permissions: permissions.slice(0, 6),
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Admin',
      code: 'admin',
      description: 'Quản trị viên',
      permissions: permissions.slice(0, 4),
      createdAt: '2024-01-16',
    },
    {
      id: '3',
      name: 'Manager',
      code: 'manager',
      description: 'Quản lý',
      permissions: permissions.slice(0, 3),
      createdAt: '2024-01-17',
    },
  ]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFetching(false);
    }, 500);
  }, []);

  const handleOpenRoleModal = () => {
    setIsRoleModalOpen(true);
    setRoleFormData({
      name: '',
      code: '',
      description: '',
      permissions: [],
    });
  };

  const handleCloseRoleModal = () => {
    setIsRoleModalOpen(false);
    setRoleFormData({
      name: '',
      code: '',
      description: '',
      permissions: [],
    });
  };

  const handleOpenPermissionModal = () => {
    setIsPermissionModalOpen(true);
    setPermissionFormData({
      name: '',
      code: '',
      description: '',
    });
  };

  const handleClosePermissionModal = () => {
    setIsPermissionModalOpen(false);
    setPermissionFormData({
      name: '',
      code: '',
      description: '',
    });
  };

  const handleRoleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRoleFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermissionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPermissionFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermissionToggle = (permissionId: string) => {
    setRoleFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roleFormData.name.trim() || !roleFormData.code.trim()) {
      toast.error(t('common.pleaseFillAllFields'));
      return;
    }

    setLoading(true);
    try {
      const selectedPermissions = permissions.filter(p => roleFormData.permissions.includes(p.id));
      const newRole: Role = {
        id: String(roles.length + 1),
        name: roleFormData.name,
        code: roleFormData.code,
        description: roleFormData.description,
        permissions: selectedPermissions,
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      setRoles([...roles, newRole]);
      toast.success(t('pages.roles.createSuccess'));
      handleCloseRoleModal();
    } catch (error: any) {
      toast.error(error.message || t('pages.roles.createFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!permissionFormData.name.trim() || !permissionFormData.code.trim()) {
      toast.error(t('common.pleaseFillAllFields'));
      return;
    }

    setLoading(true);
    try {
      // TODO: Call API to create permission
      toast.success(t('pages.permissions.createSuccess'));
      handleClosePermissionModal();
    } catch (error: any) {
      toast.error(error.message || t('pages.permissions.createFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string, name: string, type: 'role' | 'permission') => {
    setItemToDelete({ id, name, type });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    setDeletingId(itemToDelete.id);
    try {
      if (itemToDelete.type === 'role') {
        setRoles(roles.filter(role => role.id !== itemToDelete.id));
        toast.success(t('pages.roles.deleteSuccess'));
      } else {
        // TODO: Handle permission deletion
        toast.success(t('pages.permissions.deleteSuccess'));
      }
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error: any) {
      toast.error(error.message || t('common.error'));
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    permission.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('menu.rolesPermissionsManagement')}</h1>
          <p className="text-gray-600">{t('menu.rolesPermissionsManagement')}</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6 inline-flex">
          <button
            onClick={() => setSelectedTab('roles')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'roles'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t('pages.roles.role')}s
          </button>
          <button
            onClick={() => setSelectedTab('permissions')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'permissions'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t('pages.permissions.title')}
          </button>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={selectedTab === 'roles' ? t('pages.roles.searchPlaceholder') : selectedTab === 'permissions' ? t('pages.permissions.searchPlaceholder') : t('pages.operators.searchPlaceholder')}
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
              {selectedTab === 'roles' ? (
                <button
                  onClick={handleOpenRoleModal}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('pages.roles.addRole')}</span>
                </button>
              ) : selectedTab === 'permissions' ? (
                <button
                  onClick={handleOpenPermissionModal}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('pages.permissions.addPermission')}</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Roles Table */}
        {selectedTab === 'roles' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {fetching ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                <span className="ml-3 text-gray-600">{t('pages.roles.loadingRoles')}</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('pages.roles.role')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('common.code')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('common.description')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('pages.roles.permissions')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('common.createdAt')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('common.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRoles.map((role) => (
                      <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                              <Shield className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="text-sm font-medium text-gray-900">{role.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-mono">{role.code}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 max-w-xs truncate">{role.description || '-'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.slice(0, 3).map((perm) => (
                              <span
                                key={perm.id}
                                className="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded"
                              >
                                {perm.code}
                              </span>
                            ))}
                            {role.permissions.length > 3 && (
                              <span className="inline-flex px-2 py-1 text-xs font-medium text-gray-600">
                                +{role.permissions.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {role.createdAt ? new Date(role.createdAt).toLocaleDateString('vi-VN') : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(role.id, role.name, 'role')}
                              disabled={deletingId === role.id}
                              className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
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
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!fetching && filteredRoles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {searchQuery ? t('pages.roles.noRolesFound') : t('pages.roles.noRolesYet')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Permissions Table */}
        {selectedTab === 'permissions' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {fetching ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                <span className="ml-3 text-gray-600">{t('pages.roles.loadingPermissions')}</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('pages.permissions.title')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('common.code')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('common.description')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('common.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPermissions.map((permission) => (
                      <tr key={permission.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <Check className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-mono">{permission.code}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{permission.description || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(permission.id, permission.name, 'permission')}
                              disabled={deletingId === permission.id}
                              className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
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
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!fetching && filteredPermissions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {searchQuery ? t('common.noData') : t('common.noData')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Operator Accounts Table */}
        {selectedTab === 'operator-accounts' && (
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
                        {t('pages.roles.operatorAccount')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('common.email')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('pages.roles.role')}
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
                    {operatorAccounts
                      .filter(account =>
                        account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        account.email.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((account) => (
                        <tr key={account.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-blue-600 font-semibold">
                                  {account.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="text-sm font-medium text-gray-900">{account.username}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{account.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                              {account.role}
                            </span>
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
                              <button className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {!fetching && operatorAccounts.filter(account =>
              account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
              account.email.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {searchQuery ? t('common.noData') : t('common.noData')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Role Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">{t('pages.roles.addRole')}</h2>
              <button
                onClick={handleCloseRoleModal}
                disabled={loading}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRoleSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="role-name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.name')} {t('pages.roles.role')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="role-name"
                  name="name"
                  value={roleFormData.name}
                  onChange={handleRoleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder={t('common.enterName')}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="role-code" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.code')} {t('pages.roles.role')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="role-code"
                  name="code"
                  value={roleFormData.code}
                  onChange={handleRoleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed font-mono"
                  placeholder={t('common.enterName')}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="role-description" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.description')}
                </label>
                <textarea
                  id="role-description"
                  name="description"
                  value={roleFormData.description}
                  onChange={handleRoleInputChange}
                  disabled={loading}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder={t('common.description')}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('pages.roles.permissions')} <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
                  {permissions.map((permission) => (
                    <label
                      key={permission.id}
                      className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={roleFormData.permissions.includes(permission.id)}
                        onChange={() => handlePermissionToggle(permission.id)}
                        disabled={loading}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                        <div className="text-xs text-gray-500 font-mono">{permission.code}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseRoleModal}
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
                  <span>{loading ? t('common.creating') : t('pages.roles.createRole')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Permission Modal */}
      {isPermissionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('pages.permissions.addPermission')}</h2>
              <button
                onClick={handleClosePermissionModal}
                disabled={loading}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePermissionSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="permission-name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.name')} {t('pages.permissions.title')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="permission-name"
                  name="name"
                  value={permissionFormData.name}
                  onChange={handlePermissionInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder={t('common.enterName')}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="permission-code" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.code')} {t('pages.permissions.title')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="permission-code"
                  name="code"
                  value={permissionFormData.code}
                  onChange={handlePermissionInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed font-mono"
                  placeholder={t('common.enterName')}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="permission-description" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.description')}
                </label>
                <textarea
                  id="permission-description"
                  name="description"
                  value={permissionFormData.description}
                  onChange={handlePermissionInputChange}
                  disabled={loading}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder={t('common.description')}
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClosePermissionModal}
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
                  <span>{loading ? t('common.creating') : t('pages.permissions.createPermission')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {t('common.confirmDelete')} {itemToDelete.type === 'role' ? t('pages.roles.role') : t('pages.permissions.title')}
              </h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {t('common.deleteConfirmMessage').replace('this item', `${itemToDelete.type === 'role' ? t('pages.roles.role') : t('pages.permissions.title')} "${itemToDelete.name}"`)}
              </p>
              <p className="text-sm text-red-600">{t('common.deleteConfirmMessage').split('?')[1] || t('common.deleteConfirmMessage')}</p>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleDeleteCancel}
                disabled={deletingId === itemToDelete.id}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deletingId === itemToDelete.id}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deletingId === itemToDelete.id && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{deletingId === itemToDelete.id ? t('common.deleting') : t('common.delete')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePermissionManagement;

