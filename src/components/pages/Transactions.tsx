import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const Transactions = () => {
  const transactions = [
    { id: 'TXN001', player: 'player001', type: 'deposit', amount: 5000000, status: 'completed', method: 'Bank Transfer', date: '2024-05-20 14:30' },
    { id: 'TXN002', player: 'player002', type: 'withdraw', amount: 2000000, status: 'pending', method: 'Bank Transfer', date: '2024-05-20 13:15' },
    { id: 'TXN003', player: 'player004', type: 'deposit', amount: 10000000, status: 'completed', method: 'E-Wallet', date: '2024-05-20 12:00' },
    { id: 'TXN004', player: 'player001', type: 'bet', amount: 500000, status: 'completed', method: 'Game', date: '2024-05-20 11:45' },
    { id: 'TXN005', player: 'player003', type: 'withdraw', amount: 1500000, status: 'rejected', method: 'Bank Transfer', date: '2024-05-20 10:20' },
  ];

  const getTransactionIcon = (type: string) => {
    if (type === 'deposit' || type === 'win') {
      return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
    }
    return <ArrowUpRight className="w-4 h-4 text-red-600" />;
  };

  const getTransactionColor = (type: string) => {
    if (type === 'deposit' || type === 'win') {
      return 'text-green-600';
    }
    return 'text-red-600';
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Giao dịch</h1>
          <p className="text-gray-500 text-sm">Theo dõi và quản lý tất cả giao dịch trong hệ thống</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Download className="w-4 h-4" />
          Xuất báo cáo
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng giao dịch hôm nay</p>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng nạp</p>
              <p className="text-2xl font-bold text-green-600">25.5B VNĐ</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng rút</p>
              <p className="text-2xl font-bold text-red-600">18.2B VNĐ</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Đang chờ xử lý</p>
              <p className="text-2xl font-bold text-yellow-600">45</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm giao dịch (ID, Player)..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Bộ lọc
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mã GD</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Player</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Loại</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Số tiền</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phương thức</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thời gian</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{txn.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.player}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(txn.type)}
                      <span className={`text-sm font-medium ${getTransactionColor(txn.type)}`}>
                        {txn.type === 'deposit' ? 'Nạp' : txn.type === 'withdraw' ? 'Rút' : 'Cược'}
                      </span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getTransactionColor(txn.type)}`}>
                    {txn.amount.toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{txn.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      txn.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : txn.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {txn.status === 'completed' ? 'Hoàn thành' : txn.status === 'pending' ? 'Chờ xử lý' : 'Từ chối'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

