import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const data = [
  { month: 'JAN', CHN: 4000, USA: 2400, UK: 2400 },
  { month: 'FEB', CHN: 3000, USA: 1398, UK: 2210 },
  { month: 'MAR', CHN: 2000, USA: 9800, UK: 2290 },
  { month: 'APR', CHN: 2780, USA: 3908, UK: 2000 },
  { month: 'MAY', CHN: 1890, USA: 4800, UK: 2181 },
  { month: 'JUN', CHN: 2390, USA: 3800, UK: 2500 },
  { month: 'JUL', CHN: 3490, USA: 4300, UK: 2100 },
  { month: 'AUG', CHN: 4000, USA: 2400, UK: 2400 },
];

const VisitSalesChart = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{t('pages.dashboard.visitAndSalesStatistics')}</h3>
      
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
          <span className="text-sm text-gray-600">CHN</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-600">USA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">UK</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
          <Bar dataKey="CHN" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="USA" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="UK" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitSalesChart;

