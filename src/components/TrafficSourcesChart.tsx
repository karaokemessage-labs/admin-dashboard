import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TrafficSourcesChart = () => {
  const { t } = useLanguage();
  
  const data = [
    { name: t('pages.dashboard.searchEngines'), value: 30, color: '#60a5fa' },
    { name: t('pages.dashboard.directClick'), value: 30, color: '#34d399' },
    { name: t('pages.dashboard.bookmarksClick'), value: 40, color: '#fbbf24' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{t('pages.dashboard.trafficSources')}</h3>
      
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
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
      
      <div className="mt-6 space-y-2">
        {data.map((item, index) => (
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
      
      <button className="absolute bottom-4 right-4 p-2 hover:bg-gray-100 rounded-lg">
        <Settings className="w-5 h-5 text-purple-600" />
      </button>
    </div>
  );
};

export default TrafficSourcesChart;

