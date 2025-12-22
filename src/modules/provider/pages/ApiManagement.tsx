import { Network, Key, Clock, CheckCircle2, Settings } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const ApiManagement = () => {
  const { t } = useLanguage();
  const apiKeys = [
    { id: 1, name: 'Game API Key', key: 'sk_live_***abc123', status: 'active', lastUsed: '2024-05-20 14:30', requests: 15234, rateLimit: '1000/min' },
    { id: 2, name: 'Payment API Key', key: 'sk_live_***xyz789', status: 'active', lastUsed: '2024-05-20 13:15', requests: 8567, rateLimit: '500/min' },
    { id: 3, name: 'Webhook Key', key: 'wh_live_***def456', status: 'active', lastUsed: '2024-05-20 12:00', requests: 4321, rateLimit: '200/min' },
    { id: 4, name: 'Test API Key', key: 'sk_test_***ghi789', status: 'inactive', lastUsed: '2024-05-19 10:20', requests: 234, rateLimit: '100/min' },
  ];

  const endpoints = [
    { method: 'GET', path: '/api/v1/games', status: 'active', calls: 45234, avgResponse: '120ms' },
    { method: 'POST', path: '/api/v1/transactions', status: 'active', calls: 12345, avgResponse: '85ms' },
    { method: 'GET', path: '/api/v1/players', status: 'active', calls: 23456, avgResponse: '95ms' },
    { method: 'POST', path: '/api/v1/webhook', status: 'active', calls: 8932, avgResponse: '45ms' },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('pages.api.title')}</h1>
        <p className="text-gray-500 text-sm">{t('pages.api.description')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pages.api.totalApiKeys')}</p>
              <p className="text-2xl font-bold text-gray-800">{apiKeys.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Key className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pages.api.activeKeys')}</p>
              <p className="text-2xl font-bold text-green-600">
                {apiKeys.filter(k => k.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pages.api.totalRequestsToday')}</p>
              <p className="text-2xl font-bold text-gray-800">89,966</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Network className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pages.api.avgResponseTime')}</p>
              <p className="text-2xl font-bold text-gray-800">86ms</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{t('pages.api.apiKeys')}</h3>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            {t('pages.api.createApiKey')}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.name')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.api.apiKey')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.api.lastUsed')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.api.requests')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.api.rateLimit')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {apiKeys.map((key) => (
                <tr key={key.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded">{key.key}</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      key.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {key.status === 'active' ? t('common.active') : t('common.inactive')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{key.lastUsed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{key.requests.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{key.rateLimit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-purple-600 hover:text-purple-800">
                      <Settings className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Endpoints Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('pages.api.apiEndpoints')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.api.method')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.api.path')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.api.callsToday')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.api.avgResponse')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {endpoints.map((endpoint, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded text-xs font-medium ${
                      endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {endpoint.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm font-mono text-gray-900">{endpoint.path}</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {endpoint.status === 'active' ? t('common.active') : t('common.inactive')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{endpoint.calls.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{endpoint.avgResponse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApiManagement;

