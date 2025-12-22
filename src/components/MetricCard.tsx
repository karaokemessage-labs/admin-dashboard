import { LucideIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  gradientFrom: string;
  gradientTo: string;
  icon: LucideIcon;
}

const MetricCard = ({ title, value, change, changeType, gradientFrom, gradientTo, icon: Icon }: MetricCardProps) => {
  const { t } = useLanguage();

  return (
    <div className={`relative overflow-hidden rounded-xl text-white p-6 bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white -mr-12 -mb-12"></div>
        <div className="absolute top-1/2 right-0 w-20 h-20 rounded-full bg-white -mr-10"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm opacity-90 mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="p-3 bg-white/20 rounded-lg">
            <Icon className="w-6 h-6" />
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <span className={`text-sm ${changeType === 'increase' ? '' : ''}`}>
            {changeType === 'increase' ? t('pages.dashboard.increased') : t('pages.dashboard.decreased')} by {change}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;

