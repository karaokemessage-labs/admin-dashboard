import { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Play, Pause, X } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Game {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  players: number;
  revenue: number;
}

const GamesManagement = () => {
  const { t } = useLanguage();
  const [games, setGames] = useState<Game[]>([
    { id: 1, name: 'Baccarat Classic', status: 'active', players: 1234, revenue: 45678900 },
    { id: 2, name: 'Blackjack VIP', status: 'active', players: 856, revenue: 32456700 },
    { id: 3, name: 'Roulette Live', status: 'active', players: 2100, revenue: 67890100 },
    { id: 4, name: 'Dragon Tiger', status: 'inactive', players: 432, revenue: 12345600 },
    { id: 5, name: 'Slot Fortune', status: 'active', players: 3456, revenue: 89012300 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    status: 'active' as 'active' | 'inactive',
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({ name: '', status: 'active' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', status: 'active' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newGame: Game = {
      id: games.length + 1,
      name: formData.name,
      status: formData.status,
      players: 0,
      revenue: 0,
    };

    setGames([...games, newGame]);
    handleCloseModal();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('pages.games.title')}</h1>
          <p className="text-gray-500 text-sm">{t('pages.games.description')}</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('pages.games.addGame')}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('pages.games.searchPlaceholder')}
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.tables.gameName')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('common.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.tables.players')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.tables.revenue')}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('pages.tables.actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {games.map((game) => (
                <tr key={game.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{game.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{game.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      game.status === 'active' 
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

      {/* Add Game Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('pages.games.addGame')}</h2>
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
                  placeholder={t('common.enterGameName')}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.status')} <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="active">{t('common.active')}</option>
                  <option value="inactive">{t('common.paused')}</option>
                </select>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {t('pages.games.addGame')}
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

