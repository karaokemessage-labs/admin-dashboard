import { AlertTriangle, Bell, CheckCircle2, XCircle } from 'lucide-react';

const Alerts = () => {
  const alerts = [
    { id: 1, type: 'warning', title: 'Hệ thống load cao', message: 'CPU usage đạt 85%', time: '14:30:25', read: false },
    { id: 2, type: 'error', title: 'Payment gateway timeout', message: 'Không thể kết nối đến payment gateway', time: '13:15:10', read: false },
    { id: 3, type: 'info', title: 'Backup hoàn tất', message: 'Database backup đã hoàn thành thành công', time: '12:00:05', read: true },
    { id: 4, type: 'warning', title: 'Rate limit gần đạt', message: 'API rate limit đạt 90%', time: '11:45:30', read: true },
    { id: 5, type: 'success', title: 'Deployment thành công', message: 'Version 2.1.0 đã được deploy', time: '10:20:15', read: true },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAlertBgColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Cảnh báo & Alerts</h1>
        <p className="text-gray-500 text-sm">Quản lý và theo dõi các cảnh báo hệ thống</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng cảnh báo</p>
              <p className="text-2xl font-bold text-gray-800">{alerts.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Chưa đọc</p>
              <p className="text-2xl font-bold text-yellow-600">
                {alerts.filter(a => !a.read).length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Lỗi</p>
              <p className="text-2xl font-bold text-red-600">
                {alerts.filter(a => a.type === 'error').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Cảnh báo</p>
              <p className="text-2xl font-bold text-orange-600">
                {alerts.filter(a => a.type === 'warning').length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-lg shadow-sm border p-4 ${getAlertBgColor(alert.type)} ${
              !alert.read ? 'ring-2 ring-purple-200' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-semibold ${
                    !alert.read ? 'text-gray-900' : 'text-gray-700'
                  }`}>
                    {alert.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{alert.time}</span>
                    {!alert.read && (
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;

