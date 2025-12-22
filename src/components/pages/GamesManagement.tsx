import { Search, Filter, Plus, MoreVertical, Play, Pause } from 'lucide-react';

const GamesManagement = () => {
  const games = [
    { id: 1, name: 'Baccarat Classic', provider: 'Evolution', status: 'active', players: 1234, revenue: 45678900 },
    { id: 2, name: 'Blackjack VIP', provider: 'Evolution', status: 'active', players: 856, revenue: 32456700 },
    { id: 3, name: 'Roulette Live', provider: 'Ezugi', status: 'active', players: 2100, revenue: 67890100 },
    { id: 4, name: 'Dragon Tiger', provider: 'Asia Gaming', status: 'inactive', players: 432, revenue: 12345600 },
    { id: 5, name: 'Slot Fortune', provider: 'Pragmatic Play', status: 'active', players: 3456, revenue: 89012300 },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Quản lý Games</h1>
          <p className="text-gray-500 text-sm">Quản lý và theo dõi các game trong hệ thống</p>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="w-4 h-4" />
          Thêm Game
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm game..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Bộ lọc
          </button>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên Game</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Số Players</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Doanh thu</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {games.map((game) => (
                <tr key={game.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{game.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{game.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{game.provider}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      game.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {game.status === 'active' ? (
                        <>
                          <Play className="w-3 h-3" />
                          Hoạt động
                        </>
                      ) : (
                        <>
                          <Pause className="w-3 h-3" />
                          Tạm dừng
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{game.players.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {game.revenue.toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-purple-600 hover:text-purple-800">
                      <MoreVertical className="w-5 h-5" />
                    </button>
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

export default GamesManagement;

