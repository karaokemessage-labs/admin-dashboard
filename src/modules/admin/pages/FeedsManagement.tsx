import { useState, useEffect } from 'react';
import { Search, Filter, Plus, X, Loader2, Edit, Trash2, Rss } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';
import { feedService } from '../../../services/feedService';
import {
  CreateFeedRequestDto,
  UpdateFeedRequestDto,
  FeedResponseDto
} from '../../../types/api';

const FeedsManagement = () => {
  const { t } = useLanguage();
  const [feeds, setFeeds] = useState<FeedResponseDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingFeedId, setEditingFeedId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [feedToDelete, setFeedToDelete] = useState<{ id: string; title: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [formData, setFormData] = useState<CreateFeedRequestDto>({
    title: '',
    content: '',
    imageUrl: '',
    tags: [],
    published: false,
  });
  const [tagInput, setTagInput] = useState<string>('');

  // Fetch feeds on component mount
  useEffect(() => {
    fetchFeeds(1);
  }, []);

  const fetchFeeds = async (page: number) => {
    setFetching(true);
    try {
      const response = await feedService.getFeeds(page, pageSize);
      // apiClient already extracts data.data from { success, data: {...}, message }
      // So response is already: { items, total, page, limit, totalPages }
      const data = response as any;
      setFeeds(data?.items || []);
      setCurrentPage(data?.page || page);
      setTotalItems(data?.total || 0);
    } catch (error: any) {
      toast.error(error.message || t('common.error'));
    } finally {
      setFetching(false);
    }
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingFeedId(null);
    setIsModalOpen(true);
    setFormData({
      title: '',
      content: '',
      imageUrl: '',
      tags: [],
      published: false,
    });
    setTagInput('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingFeedId(null);
    setFormData({
      title: '',
      content: '',
      imageUrl: '',
      tags: [],
      published: false,
    });
    setTagInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error(t('common.pleaseFillAllFields'));
      return;
    }

    setLoading(true);
    try {
      if (isEditMode && editingFeedId) {
        // Call API to update feed
        const updateData: UpdateFeedRequestDto = {
          title: formData.title,
          content: formData.content,
          imageUrl: formData.imageUrl || undefined,
          tags: formData.tags && formData.tags.length > 0 ? formData.tags : undefined,
          published: formData.published,
        };
        await feedService.updateFeed(editingFeedId, updateData);
        toast.success(t('common.update') + ' ' + t('common.success'));
      } else {
        // Call API to create feed
        await feedService.createFeed({
          title: formData.title,
          content: formData.content,
          imageUrl: formData.imageUrl || undefined,
          tags: formData.tags && formData.tags.length > 0 ? formData.tags : undefined,
          published: formData.published,
        });
        toast.success('Tạo feed thành công');
      }

      handleCloseModal();
      await fetchFeeds(currentPage);
    } catch (error: any) {
      toast.error(error.message || (isEditMode ? 'Cập nhật feed thất bại' : 'Tạo feed thất bại'));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || [],
    }));
  };

  const handleDeleteClick = (feedId: string, feedTitle: string) => {
    setFeedToDelete({ id: feedId, title: feedTitle });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!feedToDelete) return;

    setDeletingId(feedToDelete.id);
    try {
      await feedService.deleteFeed(feedToDelete.id);
      toast.success('Xóa feed thành công');
      setIsDeleteModalOpen(false);
      setFeedToDelete(null);
      await fetchFeeds(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Xóa feed thất bại');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setFeedToDelete(null);
  };

  // Filter feeds based on search query
  const filteredFeeds = feeds.filter(feed => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      feed.title.toLowerCase().includes(query) ||
      feed.content.toLowerCase().includes(query) ||
      feed.tags.some(tag => tag.toLowerCase().includes(query)) ||
      feed.id.toLowerCase().includes(query)
    );
  });

  // Truncate content for display
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Quản lý Feeds</h1>
        <p className="text-gray-500 text-sm">Quản lý các feeds trong hệ thống</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tiêu đề, nội dung, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tạo Feed
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            {t('common.filter')}
          </button>
        </div>
      </div>

      {/* Feeds Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tiêu đề</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nội dung</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Views/Likes</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày tạo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fetching ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
                    <p className="mt-2 text-gray-600">{t('common.loadingData')}</p>
                  </td>
                </tr>
              ) : filteredFeeds.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    {searchQuery ? 'Không tìm thấy feed nào' : 'Chưa có feed nào'}
                  </td>
                </tr>
              ) : (
                filteredFeeds.map((feed) => (
                  <tr key={feed.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{feed.id.slice(0, 8)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Rss className="w-4 h-4 text-purple-600" />
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{feed.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-md">
                        {truncateContent(feed.content)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {feed.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            {tag}
                          </span>
                        ))}
                        {feed.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                            +{feed.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${feed.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                        }`}>
                        {feed.published ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <span>{feed.views} views</span>
                        <span>•</span>
                        <span>{feed.likes} likes</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(feed.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsModalOpen(true);
                            setIsEditMode(true);
                            setEditingFeedId(feed.id);
                            setFormData({
                              title: feed.title,
                              content: feed.content,
                              imageUrl: feed.imageUrl || '',
                              tags: feed.tags || [],
                              published: feed.published,
                            });
                          }}
                          className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded"
                          title={t('common.edit')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(feed.id, feed.title)}
                          disabled={deletingId === feed.id}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title={t('common.delete')}
                        >
                          {deletingId === feed.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalItems > pageSize && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Hiển thị {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} của {totalItems} feeds
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchFeeds(currentPage - 1)}
                disabled={currentPage === 1 || fetching}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                Trang {currentPage} / {Math.ceil(totalItems / pageSize)}
              </span>
              <button
                onClick={() => fetchFeeds(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalItems / pageSize) || fetching}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Feed Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditMode ? 'Chỉnh sửa Feed' : 'Tạo Feed mới'}
              </h2>
              <button
                onClick={handleCloseModal}
                disabled={loading}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập tiêu đề feed..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập nội dung feed..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  URL Hình ảnh
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    disabled={loading}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Nhập tag và nhấn Enter..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    disabled={loading || !tagInput.trim()}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Thêm
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        disabled={loading}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleCheckboxChange}
                    disabled={loading}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Xuất bản ngay</span>
                </label>
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
                  <span>
                    {loading
                      ? isEditMode
                        ? t('common.updating')
                        : t('common.creating')
                      : isEditMode
                        ? t('common.update')
                        : 'Tạo Feed'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && feedToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('common.delete')} Feed</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {t('common.deleteConfirmMessage')?.replace('this item', `feed "${feedToDelete.title}"`) || `Bạn có chắc chắn muốn xóa feed "${feedToDelete.title}"?`}
              </p>
              <p className="text-sm text-red-600">
                {t('common.deleteWarning') || 'Hành động này không thể hoàn tác.'}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleDeleteCancel}
                disabled={deletingId === feedToDelete.id}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deletingId === feedToDelete.id}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deletingId === feedToDelete.id && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{deletingId === feedToDelete.id ? t('common.deleting') : t('common.delete')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedsManagement;

