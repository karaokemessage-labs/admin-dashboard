import { useState, useEffect } from 'react';
import { Search, Filter, X, Loader2, Edit, Trash2, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';
import { commentService } from '../../../services/commentService';
import {
  UpdateCommentRequestDto,
  CommentResponseDto
} from '../../../types/api';

const CommentsManagement = () => {
  const { t } = useLanguage();
  const [comments, setComments] = useState<CommentResponseDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<{ id: string; content: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [formData, setFormData] = useState<UpdateCommentRequestDto>({
    content: '',
  });

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments(1);
  }, []);

  const fetchComments = async (page: number) => {
    setFetching(true);
    try {
      const response = await commentService.getAllComments(page, pageSize);
      // apiClient already extracts data.data from { success, data: {...}, message }
      // So response is already: { items, total, page, limit, totalPages }
      const data = response as any;
      setComments(data?.items || []);
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
    setEditingCommentId(null);
    setFormData({
      content: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.content.trim()) {
      toast.error(t('common.pleaseFillAllFields'));
      return;
    }

    setLoading(true);
    try {
      if (isEditMode && editingCommentId) {
        // Call API to update comment
        await commentService.updateComment(editingCommentId, formData);
        toast.success(t('common.update') + ' ' + t('common.success'));
      }

      handleCloseModal();
      await fetchComments(currentPage);
    } catch (error: any) {
      toast.error(error.message || (isEditMode ? 'Cập nhật bình luận thất bại' : 'Tạo bình luận thất bại'));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteClick = (commentId: string, commentContent: string) => {
    setCommentToDelete({ id: commentId, content: commentContent });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!commentToDelete) return;

    setDeletingId(commentToDelete.id);
    try {
      await commentService.deleteComment(commentToDelete.id);
      toast.success('Xóa bình luận thành công');
      setIsDeleteModalOpen(false);
      setCommentToDelete(null);
      await fetchComments(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Xóa bình luận thất bại');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setCommentToDelete(null);
  };

  // Filter comments based on search query
  const filteredComments = comments.filter(comment => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      comment.content.toLowerCase().includes(query) ||
      comment.articleId.toLowerCase().includes(query) ||
      comment.userId.toLowerCase().includes(query)
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
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Quản lý Bình luận</h1>
        <p className="text-gray-500 text-sm">Quản lý tất cả bình luận trong hệ thống</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo nội dung, article ID hoặc user ID..."
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

      {/* Comments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nội dung</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Article ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Parent Comment</th>
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
              ) : filteredComments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    {searchQuery ? 'Không tìm thấy bình luận nào' : 'Chưa có bình luận nào'}
                  </td>
                </tr>
              ) : (
                filteredComments.map((comment) => (
                  <tr key={comment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{comment.id.slice(0, 8)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-purple-600 flex-shrink-0" />
                        <div className="text-sm text-gray-900 max-w-md">
                          {truncateContent(comment.content)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{comment.articleId.slice(0, 8)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{comment.userId.slice(0, 8)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {comment.parentId ? (
                        <span className="text-purple-600">#{comment.parentId.slice(0, 8)}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(comment.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(comment.updatedAt).toLocaleDateString('vi-VN', {
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
                            setEditingCommentId(comment.id);
                            setFormData({
                              content: comment.content,
                            });
                          }}
                          className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded"
                          title={t('common.edit')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(comment.id, comment.content)}
                          disabled={deletingId === comment.id}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title={t('common.delete')}
                        >
                          {deletingId === comment.id ? (
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
              Hiển thị {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} của {totalItems} bình luận
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchComments(currentPage - 1)}
                disabled={currentPage === 1 || fetching}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                Trang {currentPage} / {Math.ceil(totalItems / pageSize)}
              </span>
              <button
                onClick={() => fetchComments(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalItems / pageSize) || fetching}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Comment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Chỉnh sửa bình luận
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
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Nhập nội dung bình luận..."
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
      {isDeleteModalOpen && commentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('common.delete')} Bình luận</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {t('common.deleteConfirmMessage')?.replace('this item', `bình luận này`) || `Bạn có chắc chắn muốn xóa bình luận này?`}
              </p>
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-600 italic">
                  "{truncateContent(commentToDelete.content, 150)}"
                </p>
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
                disabled={deletingId === commentToDelete.id}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deletingId === commentToDelete.id}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deletingId === commentToDelete.id && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{deletingId === commentToDelete.id ? t('common.deleting') : t('common.delete')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsManagement;

