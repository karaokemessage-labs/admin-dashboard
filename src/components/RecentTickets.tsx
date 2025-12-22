import { useLanguage } from '../contexts/LanguageContext';

const RecentTickets = () => {
  const { t } = useLanguage();
  
  const tickets = [
    {
      assignee: {
        name: 'David Grey',
        avatar: 'DG',
      },
      subject: 'Fund is not recieved',
      status: t('pages.dashboard.done'),
      statusColor: 'bg-green-100 text-green-800',
      lastUpdate: 'Dec 5, 2017',
      trackingId: 'WD-12345',
    },
    // Add more sample data as needed
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{t('pages.dashboard.recentTickets')}</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{t('pages.dashboard.assignee')}</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{t('pages.dashboard.subject')}</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{t('common.status')}</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{t('pages.dashboard.lastUpdate')}</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{t('pages.dashboard.trackingId')}</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                      {ticket.assignee.avatar}
                    </div>
                    <span className="text-sm text-gray-700">{ticket.assignee.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">{ticket.subject}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${ticket.statusColor}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{ticket.lastUpdate}</td>
                <td className="py-3 px-4 text-sm text-gray-600 font-mono">{ticket.trackingId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTickets;

