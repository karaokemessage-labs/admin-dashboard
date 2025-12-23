import { useLanguage } from '../contexts/LanguageContext';

const RecentTickets = () => {
  const { t } = useLanguage();
  
  const tickets = [
    {
      assignee: {
        name: 'Phòng VIP 201',
        avatar: 'VIP',
      },
      subject: 'Đặt phòng Karaoke - 2 giờ',
      status: t('pages.dashboard.done'),
      statusColor: 'bg-green-100 text-green-800',
      lastUpdate: 'Hôm nay, 20:30',
      trackingId: 'BK-12345',
    },
    {
      assignee: {
        name: 'Phòng Massage 301',
        avatar: 'MS',
      },
      subject: 'Đặt phòng Massage - 90 phút',
      status: 'Đang sử dụng',
      statusColor: 'bg-blue-100 text-blue-800',
      lastUpdate: 'Hôm nay, 19:15',
      trackingId: 'BK-12346',
    },
    {
      assignee: {
        name: 'Club VIP',
        avatar: 'CL',
      },
      subject: 'Đặt bàn Club - 4 người',
      status: 'Đã xác nhận',
      statusColor: 'bg-purple-100 text-purple-800',
      lastUpdate: 'Hôm nay, 18:00',
      trackingId: 'BK-12347',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Đặt phòng gần đây</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Phòng/Dịch vụ</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Mô tả</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{t('common.status')}</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Thời gian</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Mã đặt</th>
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

