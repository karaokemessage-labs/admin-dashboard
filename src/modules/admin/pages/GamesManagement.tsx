import { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Play, Pause, X, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';
import { clubService, CreateClubRequest } from '../../../services/clubService';
import RichTextEditor from '../../../components/RichTextEditor';
const GamesManagement = () => {
  const { t } = useLanguage();
  const [games] = useState([
    { id: 1, name: 'Karaoke VIP 201', type: 'karaoke', status: 'active', bookings: 234, revenue: 45678900 },
    { id: 2, name: 'Massage Spa 301', type: 'massage', status: 'active', bookings: 156, revenue: 32456700 },
    { id: 3, name: 'Club VIP Lounge', type: 'club', status: 'active', bookings: 89, revenue: 67890100 },
    { id: 4, name: 'Karaoke Standard 102', type: 'karaoke', status: 'inactive', bookings: 32, revenue: 12345600 },
    { id: 5, name: 'Massage Premium 401', type: 'massage', status: 'active', bookings: 245, revenue: 89012300 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateClubRequest>({
    name: 'Karaoke VIP 201',
    type: 'KARAOKE',
    address: '123 Main Street, Ho Chi Minh City',
    phone: '+84901234567',
    email: 'contact@kaka.club',
    description: 'Premium karaoke club with modern facilities',
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({
      name: 'Karaoke VIP 201',
      type: 'KARAOKE',
      address: '123 Main Street, Ho Chi Minh City',
      phone: '+84901234567',
      email: 'contact@kaka.club',
      description: 'Premium karaoke club with modern facilities',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: 'Karaoke VIP 201',
      type: 'KARAOKE',
      address: '123 Main Street, Ho Chi Minh City',
      phone: '+84901234567',
      email: 'contact@kaka.club',
      description: 'Premium karaoke club with modern facilities',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim() || !formData.type.trim() || !formData.address.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast.error(t('common.pleaseFillAllFields'));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Email không hợp lệ');
      return;
    }

    setLoading(true);
    try {
      await clubService.createClub({
        name: formData.name,
        type: formData.type,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        description: formData.description,
      });

      toast.success(t('pages.games.createSuccess') || 'Tạo Club thành công');
      handleCloseModal();
      // TODO: Refresh list after create
    } catch (error: any) {
      toast.error(error.message || t('pages.games.createFailed') || 'Tạo Club thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('pages.games.venueManagement')}</h1>
          <p className="text-gray-500 text-sm">{t('pages.games.description')}</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('pages.games.addVenue')}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('pages.games.searchVenuePlaceholder')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            {t('common.filter')}
          </button>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.tables.id')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.games.venueName')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.games.bookingsCount')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.games.revenue')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.games.actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {games.map((game) => (
                <tr key={game.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{game.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-900">{game.name}</div>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${game.type === 'karaoke' ? 'bg-pink-100 text-pink-800' :
                          game.type === 'massage' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                        }`}>
                        {game.type === 'karaoke' ? t('pages.games.venueTypeKaraoke') : game.type === 'massage' ? t('pages.games.venueTypeMassage') : t('pages.games.venueTypeClub')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${game.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                      {game.status === 'active' ? (
                        <>
                          <Play className="w-3 h-3" />
                          {t('common.active')}
                        </>
                      ) : (
                        <>
                          <Pause className="w-3 h-3" />
                          {t('common.paused')}
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{game.bookings.toLocaleString()}</td>
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

      {/* Add Game Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('pages.games.addVenue')}</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.name')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={t('pages.games.enterVenueName')}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('pages.games.venueType')} <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="KARAOKE">{t('pages.games.venueTypeKaraoke')}</option>
                  <option value="MASSAGE">{t('pages.games.venueTypeMassage')}</option>
                  <option value="CLUB">{t('pages.games.venueTypeClub')}</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập địa chỉ..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập số điện thoại..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập email..."
                />
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <RichTextEditor
                  value={formData.description || ''}
                  onChange={(value) => setFormData({ ...formData, description: value })}
                  placeholder="Nhập mô tả (tùy chọn)..."
                  disabled={loading}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={loading}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{loading ? t('common.creating') : t('pages.games.addVenue')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesManagement;

