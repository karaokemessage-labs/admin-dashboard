import { Settings, Save, Bell, Shield, CreditCard } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const SystemSettings = () => {
  const { t } = useLanguage();
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
                defaultValue="Game Provider Platform"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.settings.systemDescription')}</label>
              <textarea
                rows={3}
                defaultValue="Hệ thống quản lý game cá cược"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.settings.defaultLanguage')}</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Tiếng Việt</option>
                <option>English</option>
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
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{t('pages.settings.pushNotification')}</p>
                <p className="text-xs text-gray-500">{t('pages.settings.pushNotificationDesc')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{t('pages.settings.smsAlert')}</p>
                <p className="text-xs text-gray-500">{t('pages.settings.smsAlertDesc')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
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
                defaultValue={30}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.settings.maxLoginAttempts')}</label>
              <input
                type="number"
                defaultValue={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{t('pages.settings.require2FA')}</p>
                <p className="text-xs text-gray-500">{t('pages.settings.require2FADesc')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-800">{t('pages.settings.paymentSettings')}</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.settings.minDepositLimit')}</label>
              <input
                type="number"
                defaultValue={100000}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.settings.minWithdrawLimit')}</label>
              <input
                type="number"
                defaultValue={50000}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.settings.withdrawProcessingTime')}</label>
              <input
                type="number"
                defaultValue={24}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            <Save className="w-4 h-4" />
            {t('pages.settings.saveSettings')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;

