import { Activity, Server, Users, AlertCircle, CheckCircle2 } from 'lucide-react';

const Monitoring = () => {
  const systemStatus = [
    { service: 'Game Server', status: 'online', uptime: '99.9%', latency: '12ms', players: 1520 },
    { service: 'Payment Gateway', status: 'online', uptime: '99.8%', latency: '8ms', players: 0 },
    { service: 'Database', status: 'online', uptime: '99.9%', latency: '3ms', players: 0 },
    { service: 'API Gateway', status: 'online', uptime: '99.7%', latency: '15ms', players: 0 },
    { service: 'Notification Service', status: 'warning', uptime: '98.5%', latency: '25ms', players: 0 },
  ];

  const recentEvents = [
    { time: '14:30:25', service: 'Game Server', event: 'High load detected', type: 'warning' },
    { time: '14:25:10', service: 'Database', event: 'Backup completed', type: 'success' },
    { time: '14:20:05', service: 'Payment Gateway', event: 'Transaction processed', type: 'info' },
    { time: '14:15:30', service: 'API Gateway', event: 'Rate limit warning', type: 'warning' },
    { time: '14:10:15', service: 'Game Server', event: 'New player joined', type: 'info' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Monitoring</h1>
        <p className="text-gray-500 text-sm">Giám sát trạng thái và hiệu suất hệ thống</p>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng Services</p>
              <p className="text-2xl font-bold text-gray-800">{systemStatus.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Server className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Online</p>
              <p className="text-2xl font-bold text-green-600">
                {systemStatus.filter(s => s.status === 'online').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg Uptime</p>
              <p className="text-2xl font-bold text-gray-800">99.6%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Players</p>
              <p className="text-2xl font-bold text-gray-800">
                {systemStatus.find(s => s.service === 'Game Server')?.players || 0}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* System Status Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Trạng thái hệ thống</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Uptime</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Latency</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Players</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {systemStatus.map((service, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{service.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                      {service.status === 'online' ? 'Online' : service.status === 'warning' ? 'Warning' : 'Offline'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{service.uptime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{service.latency}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{service.players > 0 ? service.players.toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sự kiện gần đây</h3>
        <div className="space-y-3">
          {recentEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0">
                {getEventIcon(event.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{event.service}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{event.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{event.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Monitoring;

