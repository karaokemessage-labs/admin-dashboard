import { Gift, Plus, Calendar, Users, Percent } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const PromotionsBonus = () => {
  const { t } = useLanguage();
  const promotions = [
    { id: 1, name: 'Khuyến mãi chào mừng', type: 'first_deposit', bonus: '100%', maxBonus: 5000000, status: 'active', participants: 1234, startDate: '2024-01-01', endDate: '2024-12-31' },
    { id: 2, name: 'Nạp thẻ ngày cuối tuần', type: 'deposit', bonus: '50%', maxBonus: 3000000, status: 'active', participants: 856, startDate: '2024-05-01', endDate: '2024-05-31' },
    { id: 3, name: 'Cashback hàng tuần', type: 'cashback', bonus: '10%', maxBonus: 2000000, status: 'active', participants: 2100, startDate: '2024-01-01', endDate: '2024-12-31' },
    { id: 4, name: 'Giải đấu slot', type: 'tournament', bonus: '100M VNĐ', maxBonus: 100000000, status: 'upcoming', participants: 0, startDate: '2024-06-01', endDate: '2024-06-30' },
    { id: 5, name: 'Hoàn tiền VIP', type: 'rebate', bonus: '15%', maxBonus: 5000000, status: 'expired', participants: 432, startDate: '2024-04-01', endDate: '2024-04-30' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return t('pages.promotions.ongoing');
      case 'upcoming':
        return t('pages.promotions.upcoming');
      case 'expired':
        return t('pages.promotions.expired');
      default:
        return status;
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('pages.promotions.title')}</h1>
          <p className="text-gray-500 text-sm">{t('pages.promotions.description')}</p>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="w-4 h-4" />
          {t('pages.promotions.createPromotion')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pages.promotions.totalPrograms')}</p>
              <p className="text-2xl font-bold text-gray-800">{promotions.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Gift className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pages.promotions.ongoing')}</p>
              <p className="text-2xl font-bold text-green-600">{promotions.filter(p => p.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pages.promotions.totalParticipants')}</p>
              <p className="text-2xl font-bold text-gray-800">
                {promotions.reduce((sum, p) => sum + p.participants, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pages.promotions.totalBonusAwarded')}</p>
              <p className="text-2xl font-bold text-gray-800">2.5B VNĐ</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Percent className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Promotions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.promotions.programName')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.tables.type')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.promotions.bonus')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.promotions.maxBonus')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.promotions.participants')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.tables.time')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.status')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {promotions.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{promo.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {promo.type === 'first_deposit' ? t('pages.promotions.firstDeposit') : promo.type === 'deposit' ? t('pages.promotions.deposit') : promo.type === 'cashback' ? t('pages.promotions.cashback') : promo.type === 'tournament' ? t('pages.promotions.tournament') : t('pages.promotions.rebate')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{promo.bonus}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {promo.maxBonus.toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{promo.participants.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div>{promo.startDate}</div>
                    <div className="text-xs text-gray-400">{t('pages.promotions.to')} {promo.endDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(promo.status)}`}>
                      {getStatusText(promo.status)}
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

export default PromotionsBonus;

