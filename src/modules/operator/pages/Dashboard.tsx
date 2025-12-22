import { Home, Info } from 'lucide-react';
import { TrendingUp, Bookmark, Gem } from 'lucide-react';
import MetricCard from '../../../components/MetricCard';
import VisitSalesChart from '../../../components/VisitSalesChart';
import TrafficSourcesChart from '../../../components/TrafficSourcesChart';
import RecentTickets from '../../../components/RecentTickets';
import { useLanguage } from '../../../contexts/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-800">{t('pages.dashboard.title')}</h1>
        </div>
        <div className="flex items-center gap-2 text-purple-600 cursor-pointer hover:text-purple-700">
          <Info className="w-4 h-4" />
          <span className="text-sm font-medium">{t('pages.dashboard.overview')}</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricCard
          title={t('pages.dashboard.weeklySales')}
          value="$ 15,0000"
          change="60%"
          changeType="increase"
          gradientFrom="from-pink-500"
          gradientTo="to-orange-500"
          icon={TrendingUp}
        />
        <MetricCard
          title={t('pages.dashboard.weeklyOrders')}
          value="45,6334"
          change="10%"
          changeType="decrease"
          gradientFrom="from-blue-500"
          gradientTo="to-blue-600"
          icon={Bookmark}
        />
        <MetricCard
          title={t('pages.dashboard.visitorsOnline')}
          value="95,5741"
          change="5%"
          changeType="increase"
          gradientFrom="from-green-500"
          gradientTo="to-teal-500"
          icon={Gem}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <VisitSalesChart />
        <TrafficSourcesChart />
      </div>

      {/* Recent Tickets */}
      <RecentTickets />
    </div>
  );
};

export default Dashboard;

