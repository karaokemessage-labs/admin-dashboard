import { useState, useEffect } from 'react';
import { User, Mail, Phone, Save, Edit2, X, Camera, Shield, Loader2, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { authService, UserMeResponse } from '../../../services/authService';

const MyProfile = () => {
  const { t } = useLanguage();
  const { user, fetchUserInfo } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [profileData, setProfileData] = useState<UserMeResponse | null>(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [formData, setFormData] = useState({
    name: user?.displayName || user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    username: user?.username || '',
  });

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfile = async () => {
      setFetching(true);
      try {
        const userData = await authService.getMe();
        setProfileData(userData);

        // Update form data with API response
        const data = userData.data || userData;
        setFormData({
          name: data.displayName || data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          username: data.username || '',
        });
      } catch (error: any) {
        toast.error(error.message || 'Không thể tải thông tin profile. Vui lòng thử lại.');
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.name || !formData.name.trim()) {
      toast.error('Tên không được để trống');
      return;
    }

    if (!formData.email || !formData.email.trim()) {
      toast.error('Email không được để trống');
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
      // Call API to update profile
      await authService.updateProfile({
        name: formData.name,
        displayName: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        username: formData.username || undefined,
      });

      // Refresh profile data
      const userData = await authService.getMe();
      setProfileData(userData);

      // Update form data with API response
      const data = userData.data || userData;
      setFormData({
        name: data.displayName || data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        username: data.username || '',
      });

      // Update AuthContext user info
      await fetchUserInfo();

      toast.success(t('common.update') + ' ' + t('common.success'));
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data from latest profile data or user context
    const data = profileData?.data || profileData;
    setFormData({
      name: data?.displayName || data?.name || user?.displayName || user?.name || '',
      email: data?.email || user?.email || '',
      phone: data?.phone || user?.phone || '',
      username: data?.username || user?.username || '',
    });
    setIsEditing(false);
  };

  const getUserInitials = () => {
    const data = profileData?.data || profileData;
    const displayName = data?.displayName || data?.name || user?.displayName || user?.name || user?.username || '';
    if (displayName) {
      const parts = displayName.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return displayName.substring(0, 2).toUpperCase();
    }
    const email = data?.email || user?.email;
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  const getDisplayName = () => {
    const data = profileData?.data || profileData;
    return data?.displayName || data?.name || user?.displayName || user?.name || user?.username || 'User';
  };

  const getEmail = () => {
    const data = profileData?.data || profileData;
    return data?.email || user?.email || '';
  };

  // const getRole = () => {
  //   const data = profileData?.data || profileData;
  //   // Check role from data.role or data.roles array
  //   if (data?.role) {
  //     return data.role;
  //   }
  //   if (data?.roles && data.roles.length > 0) {
  //     return data.roles[0].name;
  //   }
  //   return user?.role || '';
  // };

  const getStatus = () => {
    const data = profileData?.data || profileData;
    return data?.status || 'ACTIVE';
  };

  const get2FAStatus = () => {
    const data = profileData?.data || profileData;
    return data?.twoFaEnabled || false;
  };

  const get2FAConfigs = () => {
    const data = profileData?.data || profileData;
    return data?.twoFactorConfigs || [];
  };

  if (fetching) {
    return (
      <div className="flex-1 bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải thông tin profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('header.myProfile')}</h1>
        <p className="text-gray-500 text-sm">{t('pages.profile.description')}</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-semibold bg-gradient-to-br from-purple-400 to-purple-500"
              >
                {getUserInitials()}
              </div>
              {isEditing && (
                <button
                  className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors"
                  title={t('pages.profile.changePhoto')}
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {getDisplayName()}
              </h2>
              <p className="text-gray-500 mb-2">{getEmail()}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                  {t('header.adminPortal')}
                </span>
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatus() === 'ACTIVE'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {getStatus()}
                </span>
              </div>
            </div>
            <div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  {t('common.editAction')}
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    {t('common.cancel')}
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {t('common.save')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">{t('pages.profile.personalInfo')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('common.name')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                    }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('common.email')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                    }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.username')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                    }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.phone')}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                    }`}
                />
              </div>
            </div>

            {/* Additional Info - Read Only */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="relative">
                <div className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatus() === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {getStatus()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
              <div className="relative">
                <div className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600 font-mono">
                  {(profileData?.data || profileData)?.id || user?.id || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Account Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Created At</label>
                <div className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600">
                  {(() => {
                    const data = profileData?.data || profileData;
                    const createdAt = data?.createdAt;
                    if (!createdAt) return 'N/A';
                    // Handle both timestamp (number) and ISO string
                    const date = typeof createdAt === 'number'
                      ? new Date(createdAt * 1000)
                      : new Date(createdAt);
                    return date.toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                  })()}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
                <div className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600">
                  {(() => {
                    const data = profileData?.data || profileData;
                    const updatedAt = data?.updatedAt;
                    if (!updatedAt) return 'N/A';
                    // Handle both timestamp (number) and ISO string
                    const date = typeof updatedAt === 'number'
                      ? new Date(updatedAt * 1000)
                      : new Date(updatedAt);
                    return date.toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">{t('pages.profile.accountSecurity')}</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{t('pages.profile.changePassword')}</p>
                <p className="text-sm text-gray-500">{t('pages.profile.changePasswordDesc')}</p>
              </div>
              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                {t('common.editAction')}
              </button>
            </div>

            {/* Two-Factor Authentication Status */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-gray-900">{t('pages.profile.twoFactorAuth')}</p>
                  <p className="text-sm text-gray-500">{t('pages.profile.twoFactorAuthDesc')}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${get2FAStatus()
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {get2FAStatus() ? 'Enabled' : 'Disabled'}
                </span>
              </div>

              {/* 2FA Configs */}
              {get2FAConfigs().length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">2FA Methods:</p>
                  {get2FAConfigs().map((config: any) => (
                    <div key={config.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          {config.type === 'TOTP' ? 'Authenticator App' : 'Email OTP'}
                        </p>
                        {config.type === 'EMAIL' && config.email && (
                          <p className="text-sm text-gray-500">{config.email}</p>
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${config.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        {config.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
              <button
                onClick={() => {
                  setShowChangePasswordModal(false);
                  setPasswordForm({ oldPassword: '', newPassword: '' });
                }}
                className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                disabled={changingPassword}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6">
              <div className="space-y-4">
                {/* Old Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      value={passwordForm.oldPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                      disabled={changingPassword}
                      className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      disabled={changingPassword}
                      className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowChangePasswordModal(false);
                  setPasswordForm({ oldPassword: '', newPassword: '' });
                }}
                disabled={changingPassword}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  // Validation
                  if (!passwordForm.oldPassword || !passwordForm.newPassword) {
                    toast.error('Vui lòng điền đầy đủ thông tin.');
                    return;
                  }

                  if (passwordForm.newPassword.length < 8) {
                    toast.error('Mật khẩu mới phải có ít nhất 8 ký tự.');
                    return;
                  }

                  setChangingPassword(true);
                  try {
                    await authService.changePassword({
                      oldPassword: passwordForm.oldPassword,
                      newPassword: passwordForm.newPassword,
                    });
                    toast.success('Đổi mật khẩu thành công.');
                    setShowChangePasswordModal(false);
                    setPasswordForm({ oldPassword: '', newPassword: '' });
                  } catch (error: any) {
                    toast.error(error.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại.');
                  } finally {
                    setChangingPassword(false);
                  }
                }}
                disabled={changingPassword}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
              >
                {changingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
                {changingPassword ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;





