import { Wallet, CreditCard, Building2, Plus, Settings } from 'lucide-react';

const WalletPayment = () => {
  const paymentMethods = [
    { id: 1, name: 'Vietcombank', type: 'bank', status: 'active', dailyLimit: 500000000, monthlyLimit: 15000000000 },
    { id: 2, name: 'Techcombank', type: 'bank', status: 'active', dailyLimit: 500000000, monthlyLimit: 15000000000 },
    { id: 3, name: 'MoMo', type: 'ewallet', status: 'active', dailyLimit: 20000000, monthlyLimit: 500000000 },
    { id: 4, name: 'ZaloPay', type: 'ewallet', status: 'active', dailyLimit: 20000000, monthlyLimit: 500000000 },
    { id: 5, name: 'VNPay', type: 'gateway', status: 'inactive', dailyLimit: 100000000, monthlyLimit: 5000000000 },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Ví & Thanh toán</h1>
          <p className="text-gray-500 text-sm">Quản lý phương thức thanh toán và hạn mức</p>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="w-4 h-4" />
          Thêm phương thức
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng phương thức</p>
              <p className="text-2xl font-bold text-gray-800">{paymentMethods.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Đang hoạt động</p>
              <p className="text-2xl font-bold text-green-600">{paymentMethods.filter(p => p.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng hạn mức/ngày</p>
              <p className="text-2xl font-bold text-gray-800">1.2T VNĐ</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Loại</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hạn mức/ngày</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hạn mức/tháng</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentMethods.map((method) => (
                <tr key={method.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{method.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {method.type === 'bank' ? 'Ngân hàng' : method.type === 'ewallet' ? 'Ví điện tử' : 'Cổng thanh toán'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      method.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {method.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {method.dailyLimit.toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {method.monthlyLimit.toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                    <button className="text-purple-600 hover:text-purple-800 p-2 hover:bg-purple-50 rounded-lg">
                      <Settings className="w-4 h-4" />
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

export default WalletPayment;

