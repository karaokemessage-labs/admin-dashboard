import { Shield, AlertTriangle, UserX, Lock, Eye } from 'lucide-react';

const RiskManagement = () => {
  const riskAlerts = [
    { id: 1, player: 'player001', type: 'suspicious_activity', severity: 'high', description: 'Nhiều giao dịch lớn trong thời gian ngắn', status: 'pending', date: '2024-05-20 14:30' },
    { id: 2, player: 'player005', type: 'fraud_detected', severity: 'critical', description: 'Phát hiện hành vi gian lận', status: 'investigating', date: '2024-05-20 13:15' },
    { id: 3, player: 'player012', type: 'unusual_pattern', severity: 'medium', description: 'Mẫu cược bất thường', status: 'resolved', date: '2024-05-20 12:00' },
    { id: 4, player: 'player023', type: 'account_compromise', severity: 'high', description: 'Nghi ngờ tài khoản bị xâm nhập', status: 'pending', date: '2024-05-20 11:45' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'investigating':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'suspicious_activity':
        return 'Hoạt động đáng ngờ';
      case 'fraud_detected':
        return 'Gian lận';
      case 'unusual_pattern':
        return 'Mẫu bất thường';
      case 'account_compromise':
        return 'Tài khoản bị xâm nhập';
      default:
        return type;
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Quản lý rủi ro</h1>
        <p className="text-gray-500 text-sm">Phát hiện và xử lý các rủi ro bảo mật</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng cảnh báo</p>
              <p className="text-2xl font-bold text-gray-800">{riskAlerts.length}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Đang chờ xử lý</p>
              <p className="text-2xl font-bold text-yellow-600">
                {riskAlerts.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Đang điều tra</p>
              <p className="text-2xl font-bold text-blue-600">
                {riskAlerts.filter(a => a.status === 'investigating').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tài khoản bị khóa</p>
              <p className="text-2xl font-bold text-red-600">12</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Risk Alerts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Player</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Loại</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mức độ</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mô tả</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thời gian</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {riskAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.player}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{getTypeText(alert.type)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity === 'critical' ? 'Nghiêm trọng' : alert.severity === 'high' ? 'Cao' : 'Trung bình'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md">{alert.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status === 'pending' ? 'Chờ xử lý' : alert.status === 'investigating' ? 'Đang điều tra' : 'Đã xử lý'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{alert.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
                        <Lock className="w-4 h-4" />
                      </button>
                    </div>
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

export default RiskManagement;

