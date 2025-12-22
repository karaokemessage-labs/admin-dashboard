import { Users, DollarSign, Activity, Target } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const { t } = useLanguage();
  const performanceData = [
    { date: '01/05', players: 1200, revenue: 45000000, sessions: 3500 },
    { date: '02/05', players: 1350, revenue: 52000000, sessions: 3800 },
    { date: '03/05', players: 1280, revenue: 48000000, sessions: 3650 },
    { date: '04/05', players: 1450, revenue: 58000000, sessions: 4200 },
    { date: '05/05', players: 1520, revenue: 62000000, sessions: 4500 },
  ];

  const conversionData = [
    { name: t('pages.analytics.registration'), value: 35, color: '#8b5cf6' },
    { name: t('pages.analytics.firstDeposit'), value: 25, color: '#10b981' },
    { name: t('pages.analytics.playGame'), value: 40, color: '#3b82f6' },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('menu.analytics')}</h1>
        <p className="text-gray-500 text-sm">{t('pages.analytics.description')}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">{t('pages.analytics.activeUsers')}</p>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">1,520</p>
          <p className="text-xs text-green-600 mt-1">{t('pages.analytics.comparedToYesterday').replace('%', '5.2%')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">{t('pages.analytics.revenuePerDay')}</p>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">62M VNĐ</p>
          <p className="text-xs text-green-600 mt-1">{t('pages.analytics.comparedToYesterday').replace('%', '8.7%')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">{t('pages.analytics.sessions')}</p>
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">4,500</p>
          <p className="text-xs text-green-600 mt-1">{t('pages.analytics.comparedToYesterday').replace('%', '6.8%')}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">{t('pages.analytics.conversionRate')}</p>
            <Target className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">3.2%</p>
          <p className="text-xs text-green-600 mt-1">{t('pages.analytics.comparedToYesterday').replace('%', '0.3%')}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('pages.analytics.performanceLast5Days')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }} 
              />
              <Area type="monotone" dataKey="players" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name={t('pages.tables.players')} />
              <Area type="monotone" dataKey="sessions" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name={t('pages.analytics.sessions')} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('pages.analytics.conversionRateChart')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {conversionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {conversionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('pages.analytics.revenueTrend')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }} 
            />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name={t('pages.reports.revenue') + ' (VNĐ)'} dot={{ fill: '#10b981' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;

