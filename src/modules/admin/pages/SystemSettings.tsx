import { useState, useEffect } from 'react';
import { Settings, Save, Bell, Shield, CreditCard, Loader2 } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { systemSettingsService } from '../../../services/systemSettingsService';
import { SystemSettingsResponseDto, UpdateSystemSettingsRequestDto } from '../../../types/api';
import { toast } from 'react-toastify';

const SystemSettings = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SystemSettingsResponseDto | null>(null);
  const [formData, setFormData] = useState<UpdateSystemSettingsRequestDto>({
    general: {},
    notifications: {},
    security: {},
    booking: {},
  });

  useEffect(() => {
    fetchSystemSettings();
  }, []);

  // Helper function to convert string/number to boolean
  const toBoolean = (value: any): boolean => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true' || value === '1';
    }
    if (typeof value === 'number') {
      return value !== 0;
    }
    return Boolean(value);
  };

  // Helper function to convert to number
  const toNumber = (value: any, defaultValue: number): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? defaultValue : parsed;
    }
    return defaultValue;
  };

  const transformSettingsFromKeyValue = (settingsArray: any[]): SystemSettingsResponseDto => {
    // Transform array of {key, value} objects to structured format
    const settingsMap: Record<string, any> = {};
    
    if (Array.isArray(settingsArray)) {
      settingsArray.forEach((setting: any) => {
        if (setting.key && setting.value !== undefined) {
          settingsMap[setting.key] = setting.value;
        }
      });
    }
    
    // Map keys to structured format with proper type conversion
    return {
      general: {
        systemName: String(settingsMap['system_name'] || settingsMap['systemName'] || 'KaKa Club Admin Portal'),
        systemDescription: String(settingsMap['system_description'] || settingsMap['systemDescription'] || 'Hệ thống quản lý karaoke club, massage và các dịch vụ giải trí'),
        defaultLanguage: String(settingsMap['default_language'] || settingsMap['defaultLanguage'] || 'vi'),
      },
      notifications: {
        emailNotification: toBoolean(settingsMap['email_notification'] ?? settingsMap['emailNotification'] ?? true),
        pushNotification: toBoolean(settingsMap['push_notification'] ?? settingsMap['pushNotification'] ?? true),
        smsAlert: toBoolean(settingsMap['sms_alert'] ?? settingsMap['smsAlert'] ?? false),
      },
      security: {
        sessionTimeout: toNumber(settingsMap['session_timeout'] ?? settingsMap['sessionTimeout'], 30),
        maxLoginAttempts: toNumber(settingsMap['max_login_attempts'] ?? settingsMap['maxLoginAttempts'], 5),
        require2FA: toBoolean(settingsMap['require_2fa'] ?? settingsMap['require2FA'] ?? false),
      },
      booking: {
        minBookingDuration: toNumber(settingsMap['min_booking_duration'] ?? settingsMap['minBookingDuration'], 60),
        maxBookingDuration: toNumber(settingsMap['max_booking_duration'] ?? settingsMap['maxBookingDuration'], 480),
        cancellationTimeBefore: toNumber(settingsMap['cancellation_time_before'] ?? settingsMap['cancellationTimeBefore'], 30),
        allowOnlineBooking: toBoolean(settingsMap['allow_online_booking'] ?? settingsMap['allowOnlineBooking'] ?? true),
      },
    };
  };

  const fetchSystemSettings = async () => {
    try {
      setLoading(true);
      const data = await systemSettingsService.getSystemSettings();
      
      console.log('System settings API response:', data);
      
      let transformedSettings: SystemSettingsResponseDto;
      
      // Check if response is already in the expected format
      if (data && data.general && data.notifications && data.security && data.booking) {
        // Ensure boolean values are properly converted
        transformedSettings = {
          general: {
            systemName: String(data.general.systemName || 'KaKa Club Admin Portal'),
            systemDescription: String(data.general.systemDescription || 'Hệ thống quản lý karaoke club, massage và các dịch vụ giải trí'),
            defaultLanguage: String(data.general.defaultLanguage || 'vi'),
          },
          notifications: {
            emailNotification: toBoolean(data.notifications.emailNotification ?? true),
            pushNotification: toBoolean(data.notifications.pushNotification ?? true),
            smsAlert: toBoolean(data.notifications.smsAlert ?? false),
          },
          security: {
            sessionTimeout: toNumber(data.security.sessionTimeout, 30),
            maxLoginAttempts: toNumber(data.security.maxLoginAttempts, 5),
            require2FA: toBoolean(data.security.require2FA ?? false),
          },
          booking: {
            minBookingDuration: toNumber(data.booking.minBookingDuration, 60),
            maxBookingDuration: toNumber(data.booking.maxBookingDuration, 480),
            cancellationTimeBefore: toNumber(data.booking.cancellationTimeBefore, 30),
            allowOnlineBooking: toBoolean(data.booking.allowOnlineBooking ?? true),
          },
        };
      } 
      // Check if response is an array of key-value pairs
      else if (Array.isArray(data)) {
        transformedSettings = transformSettingsFromKeyValue(data);
      }
      // Check if response has a data property containing array
      else if (data && Array.isArray((data as any).data)) {
        transformedSettings = transformSettingsFromKeyValue((data as any).data);
      }
      // Try to transform from any object structure
      else if (data && typeof data === 'object') {
        transformedSettings = transformSettingsFromKeyValue([data]);
      }
      // Fallback to defaults
      else {
        console.warn('Unexpected response structure, using defaults');
        transformedSettings = {
          general: {
            systemName: 'KaKa Club Admin Portal',
            systemDescription: 'Hệ thống quản lý karaoke club, massage và các dịch vụ giải trí',
            defaultLanguage: 'vi',
          },
          notifications: {
            emailNotification: true,
            pushNotification: true,
            smsAlert: false,
          },
          security: {
            sessionTimeout: 30,
            maxLoginAttempts: 5,
            require2FA: false,
          },
          booking: {
            minBookingDuration: 60,
            maxBookingDuration: 480,
            cancellationTimeBefore: 30,
            allowOnlineBooking: true,
          },
        };
      }
      
      setSettings(transformedSettings);
      // Initialize form data with fetched settings
      setFormData({
        general: {
          systemName: transformedSettings.general.systemName || '',
          systemDescription: transformedSettings.general.systemDescription || '',
          defaultLanguage: transformedSettings.general.defaultLanguage || 'vi',
        },
        notifications: {
          emailNotification: transformedSettings.notifications.emailNotification ?? true,
          pushNotification: transformedSettings.notifications.pushNotification ?? true,
          smsAlert: transformedSettings.notifications.smsAlert ?? false,
        },
        security: {
          sessionTimeout: transformedSettings.security.sessionTimeout ?? 30,
          maxLoginAttempts: transformedSettings.security.maxLoginAttempts ?? 5,
          require2FA: transformedSettings.security.require2FA ?? false,
        },
        booking: {
          minBookingDuration: transformedSettings.booking.minBookingDuration ?? 60,
          maxBookingDuration: transformedSettings.booking.maxBookingDuration ?? 480,
          cancellationTimeBefore: transformedSettings.booking.cancellationTimeBefore ?? 30,
          allowOnlineBooking: transformedSettings.booking.allowOnlineBooking ?? true,
        },
      });
    } catch (error: any) {
      console.error('Error fetching system settings:', error);
      toast.error(error.message || t('common.error') || 'Không thể tải cài đặt hệ thống');
      // Set default values if API fails
      const defaultSettings: SystemSettingsResponseDto = {
        general: {
          systemName: 'KaKa Club Admin Portal',
          systemDescription: 'Hệ thống quản lý karaoke club, massage và các dịch vụ giải trí',
          defaultLanguage: 'vi',
        },
        notifications: {
          emailNotification: true,
          pushNotification: true,
          smsAlert: false,
        },
        security: {
          sessionTimeout: 30,
          maxLoginAttempts: 5,
          require2FA: false,
        },
        booking: {
          minBookingDuration: 60,
          maxBookingDuration: 480,
          cancellationTimeBefore: 30,
          allowOnlineBooking: true,
        },
      };
      setSettings(defaultSettings);
      setFormData({
        general: defaultSettings.general,
        notifications: defaultSettings.notifications,
        security: defaultSettings.security,
        booking: defaultSettings.booking,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updatedSettings = await systemSettingsService.updateSystemSettings(formData);
      setSettings(updatedSettings);
      toast.success(t('pages.settings.saveSuccess') || 'Cài đặt đã được lưu thành công!');
    } catch (error: any) {
      toast.error(error.message || t('pages.settings.saveFailed') || 'Lưu cài đặt thất bại. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    section: keyof UpdateSystemSettingsRequestDto,
    field: string,
    value: string | number | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value,
      },
    }));
  };
  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          <span className="ml-3 text-gray-600">{t('common.loading') || 'Đang tải...'}</span>
        </div>
      </div>
    );
  }

  const currentSettings = settings || {
    general: {
      systemName: formData.general?.systemName || 'KaKa Club Admin Portal',
      systemDescription: formData.general?.systemDescription || 'Hệ thống quản lý karaoke club, massage và các dịch vụ giải trí',
      defaultLanguage: formData.general?.defaultLanguage || 'vi',
    },
    notifications: {
      emailNotification: formData.notifications?.emailNotification ?? true,
      pushNotification: formData.notifications?.pushNotification ?? true,
      smsAlert: formData.notifications?.smsAlert ?? false,
    },
    security: {
      sessionTimeout: formData.security?.sessionTimeout ?? 30,
      maxLoginAttempts: formData.security?.maxLoginAttempts ?? 5,
      require2FA: formData.security?.require2FA ?? false,
    },
    booking: {
      minBookingDuration: formData.booking?.minBookingDuration ?? 60,
      maxBookingDuration: formData.booking?.maxBookingDuration ?? 480,
      cancellationTimeBefore: formData.booking?.cancellationTimeBefore ?? 30,
      allowOnlineBooking: formData.booking?.allowOnlineBooking ?? true,
    },
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('pages.settings.title')}</h1>
        <p className="text-gray-500 text-sm">{t('pages.settings.description')}</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">{t('pages.settings.generalSettings')}</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.settings.systemName')}</label>
              <input
                type="text"
                value={formData.general?.systemName || currentSettings.general.systemName}
                onChange={(e) => handleInputChange('general', 'systemName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.settings.systemDescription')}</label>
              <textarea
                rows={3}
                value={formData.general?.systemDescription || currentSettings.general.systemDescription}
                onChange={(e) => handleInputChange('general', 'systemDescription', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.settings.defaultLanguage')}</label>
              <select
                value={formData.general?.defaultLanguage || currentSettings.general.defaultLanguage}
                onChange={(e) => handleInputChange('general', 'defaultLanguage', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">{t('pages.settings.notificationSettings')}</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{t('pages.settings.emailNotification')}</p>
                <p className="text-xs text-gray-500">{t('pages.settings.emailNotificationDesc')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.notifications?.emailNotification ?? currentSettings.notifications.emailNotification)}
                  onChange={(e) => handleInputChange('notifications', 'emailNotification', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{t('pages.settings.pushNotification')}</p>
                <p className="text-xs text-gray-500">{t('pages.settings.pushNotificationDesc')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.notifications?.pushNotification ?? currentSettings.notifications.pushNotification)}
                  onChange={(e) => handleInputChange('notifications', 'pushNotification', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{t('pages.settings.smsAlert')}</p>
                <p className="text-xs text-gray-500">{t('pages.settings.smsAlertDesc')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.notifications?.smsAlert ?? currentSettings.notifications.smsAlert)}
                  onChange={(e) => handleInputChange('notifications', 'smsAlert', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">{t('pages.settings.security')}</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.settings.sessionTimeout')}</label>
              <input
                type="number"
                value={formData.security?.sessionTimeout ?? currentSettings.security.sessionTimeout}
                onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.settings.maxLoginAttempts')}</label>
              <input
                type="number"
                value={formData.security?.maxLoginAttempts ?? currentSettings.security.maxLoginAttempts}
                onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{t('pages.settings.require2FA')}</p>
                <p className="text-xs text-gray-500">{t('pages.settings.require2FADesc')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.security?.require2FA ?? currentSettings.security.require2FA)}
                  onChange={(e) => handleInputChange('security', 'require2FA', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Booking Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-800">Cài đặt Đặt phòng</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian đặt phòng tối thiểu (phút)</label>
              <input
                type="number"
                value={formData.booking?.minBookingDuration ?? currentSettings.booking.minBookingDuration}
                onChange={(e) => handleInputChange('booking', 'minBookingDuration', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian đặt phòng tối đa (phút)</label>
              <input
                type="number"
                value={formData.booking?.maxBookingDuration ?? currentSettings.booking.maxBookingDuration}
                onChange={(e) => handleInputChange('booking', 'maxBookingDuration', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="480"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian hủy đặt phòng trước (phút)</label>
              <input
                type="number"
                value={formData.booking?.cancellationTimeBefore ?? currentSettings.booking.cancellationTimeBefore}
                onChange={(e) => handleInputChange('booking', 'cancellationTimeBefore', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="30"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Cho phép đặt phòng trực tuyến</p>
                <p className="text-xs text-gray-500">Cho phép khách hàng đặt phòng qua website/app</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.booking?.allowOnlineBooking ?? currentSettings.booking.allowOnlineBooking)}
                  onChange={(e) => handleInputChange('booking', 'allowOnlineBooking', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t('common.saving') || 'Đang lưu...'}</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{t('pages.settings.saveSettings')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;

