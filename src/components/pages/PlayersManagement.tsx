import { Search, Filter, Download, UserCheck, UserX, DollarSign } from 'lucide-react';

const PlayersManagement = () => {
  const players = [
    { id: 1, username: 'player001', email: 'player001@example.com', balance: 5000000, status: 'active', totalWagered: 15000000, registrationDate: '2024-01-15' },
    { id: 2, username: 'player002', email: 'player002@example.com', balance: 2500000, status: 'active', totalWagered: 8500000, registrationDate: '2024-02-20' },
    { id: 3, username: 'player003', email: 'player003@example.com', balance: 0, status: 'inactive', totalWagered: 3200000, registrationDate: '2024-03-10' },
    { id: 4, username: 'player004', email: 'player004@example.com', balance: 12000000, status: 'active', totalWagered: 45000000, registrationDate: '2023-12-05' },
    { id: 5, username: 'player005', email: 'player005@example.com', balance: 850000, status: 'banned', totalWagered: 5500000, registrationDate: '2024-04-01' },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Quản lý Players</h1>
          <p className="text-gray-500 text-sm">Quản lý thông tin người chơi và tài khoản</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng Players</p>
              <p className="text-2xl font-bold text-gray-800">12,456</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Players</p>
              <p className="text-2xl font-bold text-gray-800">8,234</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Inactive Players</p>
              <p className="text-2xl font-bold text-gray-800">3,122</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <UserX className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng Balance</p>
              <p className="text-2xl font-bold text-gray-800">45.2B</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
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
              placeholder="Tìm kiếm player (username, email)..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Bộ lọc
          </button>
        </div>
      </div>

      {/* Players Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tổng cược</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày đăng ký</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{player.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{player.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{player.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {player.balance.toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {player.totalWagered.toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      player.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : player.status === 'banned'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {player.status === 'active' ? 'Hoạt động' : player.status === 'banned' ? 'Đã cấm' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{player.registrationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayersManagement;

