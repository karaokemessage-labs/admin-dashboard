import { FileText, Search, Filter, Download, User, Settings, Shield, Key } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const AuditLogs = () => {
  const { t } = useLanguage();
  const logs = [
    { id: 1, user: 'admin001', action: 'login', resource: 'System', ip: '192.168.1.100', timestamp: '2024-05-20 14:30:25', status: 'success' },
    { id: 2, user: 'admin002', action: 'update_player', resource: 'player001', ip: '192.168.1.101', timestamp: '2024-05-20 14:25:10', status: 'success' },
    { id: 3, user: 'admin001', action: 'create_promotion', resource: 'Promo Summer 2024', ip: '192.168.1.100', timestamp: '2024-05-20 14:20:05', status: 'success' },
    { id: 4, user: 'admin003', action: 'delete_game', resource: 'Game ID: 123', ip: '192.168.1.102', timestamp: '2024-05-20 14:15:30', status: 'failed' },
    { id: 5, user: 'admin001', action: 'change_settings', resource: 'System Settings', ip: '192.168.1.100', timestamp: '2024-05-20 14:10:15', status: 'success' },
    { id: 6, user: 'admin002', action: 'view_sensitive_data', resource: 'Financial Reports', ip: '192.168.1.101', timestamp: '2024-05-20 14:05:00', status: 'success' },
  ];

  const getActionIcon = (action: string) => {
    if (action.includes('login') || action.includes('logout')) {
      return <Key className="w-4 h-4 text-blue-600" />;
    }
    if (action.includes('settings') || action.includes('update')) {
      return <Settings className="w-4 h-4 text-purple-600" />;
    }
    if (action.includes('view') || action.includes('sensitive')) {
      return <Shield className="w-4 h-4 text-orange-600" />;
    }
    return <FileText className="w-4 h-4 text-gray-600" />;
  };

  const getActionColor = (action: string) => {
    if (action.includes('delete') || action.includes('remove')) {
      return 'text-red-600 bg-red-50';
    }
    if (action.includes('create') || action.includes('add')) {
      return 'text-green-600 bg-green-50';
    }
    if (action.includes('update') || action.includes('modify')) {
      return 'text-blue-600 bg-blue-50';
    }
    return 'text-gray-600 bg-gray-50';
  };

  const getActionText = (action: string) => {
    const actionMap: { [key: string]: string } = {
      'login': 'pages.auditLogs.login',
      'logout': 'pages.auditLogs.logout',
      'update_player': 'pages.auditLogs.updatePlayer',
      'create_promotion': 'pages.auditLogs.createPromotion',
      'delete_game': 'pages.auditLogs.deleteGame',
      'change_settings': 'pages.auditLogs.changeSettings',
      'view_sensitive_data': 'pages.auditLogs.viewSensitiveData',
    };
    const translationKey = actionMap[action];
    return translationKey ? t(translationKey) : action;
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('pages.auditLogs.title')}</h1>
          <p className="text-gray-500 text-sm">{t('pages.auditLogs.description')}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Download className="w-4 h-4" />
          {t('pages.auditLogs.exportLogs')}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('pages.auditLogs.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            {t('common.filter')}
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.auditLogs.time')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.auditLogs.user')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.auditLogs.action')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.auditLogs.resource')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.auditLogs.ipAddress')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.status')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{log.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getActionIcon(log.action)}
                      <span className={`inline-flex px-2.5 py-0.5 rounded text-xs font-medium ${getActionColor(log.action)}`}>
                        {getActionText(log.action)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md">{log.resource}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{log.ip}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.status === 'success' ? t('common.success') : t('common.error')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;

