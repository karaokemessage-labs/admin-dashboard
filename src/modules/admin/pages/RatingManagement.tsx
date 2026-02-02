import { useState, useEffect } from 'react';
import { Search, Filter, X, Loader2, Edit, Trash2, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ratingService } from '../../../services/ratingService';
import {
  UpdateRatingRequestDto,
  RatingResponseDto
} from '../../../types/api';

const RatingManagement = () => {
  const { t } = useLanguage();
  const [ratings, setRatings] = useState<RatingResponseDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRatingId, setEditingRatingId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [ratingToDelete, setRatingToDelete] = useState<{ id: string; rating: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [formData, setFormData] = useState<UpdateRatingRequestDto>({
    rating: undefined,
    comment: '',
  });

  // Fetch ratings on component mount
  useEffect(() => {
    fetchRatings(1);
  }, []);

  const fetchRatings = async (page: number) => {
    setFetching(true);
    try {
      const response = await ratingService.getAllRatings(page, pageSize);
      // apiClient already extracts data.data from { success, data: {...}, message }
      // So response is already: { items, total, page, limit, totalPages }
      const data = response as any;
      setRatings(data?.items || []);
      setCurrentPage(data?.page || page);
      setTotalItems(data?.total || 0);
    } catch (error: any) {
      toast.error(error.message || t('common.error'));
    } finally {
      setFetching(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingRatingId(null);
    setFormData({
      rating: undefined,
      comment: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate rating if provided
    if (formData.rating !== undefined && (formData.rating < 1 || formData.rating > 5)) {
      toast.error('Đánh giá phải từ 1 đến 5 sao');
      return;
    }

    setLoading(true);
    try {
      if (isEditMode && editingRatingId) {
        // Call API to update rating
        const updateData: UpdateRatingRequestDto = {};
        if (formData.rating !== undefined) {
          updateData.rating = formData.rating;
        }
        if (formData.comment !== undefined) {
          updateData.comment = formData.comment;
        }
        await ratingService.updateRating(editingRatingId, updateData);
        toast.success(t('common.update') + ' ' + t('common.success'));
      }

      handleCloseModal();
      await fetchRatings(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Cập nhật đánh giá thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  const handleDeleteClick = (ratingId: string, ratingValue: number) => {
    setRatingToDelete({ id: ratingId, rating: ratingValue });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!ratingToDelete) return;

    setDeletingId(ratingToDelete.id);
    try {
      await ratingService.deleteRating(ratingToDelete.id);
      toast.success('Xóa đánh giá thành công');
      setIsDeleteModalOpen(false);
      setRatingToDelete(null);
      await fetchRatings(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Xóa đánh giá thất bại');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setRatingToDelete(null);
  };

  // Filter ratings based on search query
  const filteredRatings = ratings.filter(rating => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      rating.comment?.toLowerCase().includes(query) ||
      rating.articleId.toLowerCase().includes(query) ||
      rating.userId.toLowerCase().includes(query) ||
      rating.rating.toString().includes(query)
    );
  });

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
              }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  // Truncate comment for display
  const truncateComment = (comment: string | null, maxLength: number = 50) => {
    if (!comment) return '—';
    if (comment.length <= maxLength) return comment;
    return comment.substring(0, maxLength) + '...';
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Quản lý Đánh giá</h1>
        <p className="text-gray-500 text-sm">Quản lý tất cả đánh giá trong hệ thống</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo comment, article ID, user ID hoặc số sao..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            {t('common.filter')}
          </button>
        </div>
      </div>

      {/* Ratings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Đánh giá</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Article ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày tạo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày cập nhật</th>
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
              ) : filteredRatings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    {searchQuery ? 'Không tìm thấy đánh giá nào' : 'Chưa có đánh giá nào'}
                  </td>
                </tr>
              ) : (
                filteredRatings.map((rating) => (
                  <tr key={rating.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{rating.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStars(rating.rating)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-md">
                        {truncateComment(rating.comment)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{rating.articleId.slice(0, 8)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{rating.userId.slice(0, 8)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(rating.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(rating.updatedAt).toLocaleDateString('vi-VN', {
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
                            setEditingRatingId(rating.id);
                            setFormData({
                              rating: rating.rating,
                              comment: rating.comment || '',
                            });
                          }}
                          className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded"
                          title={t('common.edit')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(rating.id, rating.rating)}
                          disabled={deletingId === rating.id}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title={t('common.delete')}
                        >
                          {deletingId === rating.id ? (
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
              Hiển thị {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} của {totalItems} đánh giá
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchRatings(currentPage - 1)}
                disabled={currentPage === 1 || fetching}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                Trang {currentPage} / {Math.ceil(totalItems / pageSize)}
              </span>
              <button
                onClick={() => fetchRatings(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalItems / pageSize) || fetching}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Rating Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Chỉnh sửa đánh giá
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
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Số sao (1-5) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  value={formData.rating || ''}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập số sao từ 1 đến 5"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment || ''}
                  onChange={handleInputChange}
                  disabled={loading}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập comment (tùy chọn)..."
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
                  <span>
                    {loading
                      ? t('common.updating')
                      : t('common.update')}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && ratingToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('common.delete')} Đánh giá</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {t('common.deleteConfirmMessage')?.replace('this item', `đánh giá ${renderStars(ratingToDelete.rating)}`) || `Bạn có chắc chắn muốn xóa đánh giá này?`}
              </p>
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(ratingToDelete.rating)}
                </div>
              </div>
              <p className="text-sm text-red-600">
                {t('common.deleteWarning') || 'Hành động này không thể hoàn tác.'}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleDeleteCancel}
                disabled={deletingId === ratingToDelete.id}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deletingId === ratingToDelete.id}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deletingId === ratingToDelete.id && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{deletingId === ratingToDelete.id ? t('common.deleting') : t('common.delete')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingManagement;



