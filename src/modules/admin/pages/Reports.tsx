import { BarChart3, Download, TrendingUp, DollarSign } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const { t } = useLanguage();
  const revenueData = [
    { month: 'Tháng 1', revenue: 1200000000, profit: 450000000 },
    { month: 'Tháng 2', revenue: 1500000000, profit: 580000000 },
    { month: 'Tháng 3', revenue: 1800000000, profit: 720000000 },
    { month: 'Tháng 4', revenue: 1650000000, profit: 650000000 },
    { month: 'Tháng 5', revenue: 2000000000, profit: 800000000 },
  ];

  const gameStats = [
    { game: 'Baccarat', players: 4500, revenue: 850000000, wagered: 3500000000 },
    { game: 'Blackjack', players: 3200, revenue: 620000000, wagered: 2800000000 },
    { game: 'Roulette', players: 2800, revenue: 480000000, wagered: 2200000000 },
    { game: 'Slots', players: 5600, revenue: 920000000, wagered: 4200000000 },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('menu.reports')}</h1>
          <p className="text-gray-500 text-sm">{t('pages.reports.description')}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Download className="w-4 h-4" />
          {t('pages.reports.exportPdf')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pages.reports.monthlyRevenue')}</p>
              <p className="text-2xl font-bold text-gray-800">2.0B VNĐ</p>
              <p className="text-xs text-green-600 mt-1">{t('pages.reports.comparedToLastMonth').replace('%', '12%')}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pages.reports.profit')}</p>
              <p className="text-2xl font-bold text-gray-800">800M VNĐ</p>
              <p className="text-xs text-green-600 mt-1">{t('pages.reports.comparedToLastMonth').replace('%', '15%')}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pages.tables.totalWagered')}</p>
              <p className="text-2xl font-bold text-gray-800">12.7B VNĐ</p>
              <p className="text-xs text-green-600 mt-1">{t('pages.reports.comparedToLastMonth').replace('%', '8%')}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pages.reports.winRate')}</p>
              <p className="text-2xl font-bold text-gray-800">6.3%</p>
              <p className="text-xs text-green-600 mt-1">{t('pages.reports.comparedToLastMonth').replace('%', '0.5%')}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('pages.reports.revenueByMonth')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} name={t('pages.reports.revenue') + ' (VNĐ)'} />
            <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} name={t('pages.reports.profit') + ' (VNĐ)'} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Game Statistics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('menu.reports')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.tables.game')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.tables.players')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.tables.wagered')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.tables.revenue')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gameStats.map((stat, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stat.game}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{stat.players.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {stat.wagered.toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {stat.revenue.toLocaleString('vi-VN')} VNĐ
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

export default Reports;

