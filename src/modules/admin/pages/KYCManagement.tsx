import { useState, useEffect } from 'react';
import { Search, Filter, X, Loader2, Eye, Trash2, FileText, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLanguage } from '../../../contexts/LanguageContext';
import { documentService } from '../../../services/documentService';
import {
  DocumentResponseDto,
  DocumentStatus,
  DocumentType,
  VerifyDocumentRequestDto
} from '../../../types/api';

const KYCManagement = () => {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState<DocumentResponseDto[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentResponseDto | null>(null);
  const [documentToDelete, setDocumentToDelete] = useState<{ id: string; type: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBatchDeleteModalOpen, setIsBatchDeleteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | ''>('');
  const [verifyFormData, setVerifyFormData] = useState<VerifyDocumentRequestDto>({
    status: 'VERIFIED',
    rejectionReason: '',
  });

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments(1);
  }, [statusFilter]);

  const fetchDocuments = async (page: number) => {
    setFetching(true);
    try {
      const response = await documentService.getDocuments(
        page,
        pageSize,
        undefined,
        statusFilter || undefined
      );
      setDocuments(response.data || []);
      setCurrentPage(response.page || page);
      setTotalItems(response.total || 0);
      setSelectedIds([]); // Reset selection on fetch
    } catch (error: any) {
      toast.error(error.message || t('common.error'));
    } finally {
      setFetching(false);
    }
  };

  const handleViewClick = (document: DocumentResponseDto) => {
    setSelectedDocument(document);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedDocument(null);
  };

  const handleVerifyClick = (document: DocumentResponseDto) => {
    setSelectedDocument(document);
    setVerifyFormData({
      status: 'VERIFIED',
      rejectionReason: '',
    });
    setIsVerifyModalOpen(true);
  };

  const handleCloseVerifyModal = () => {
    setIsVerifyModalOpen(false);
    setSelectedDocument(null);
    setVerifyFormData({
      status: 'VERIFIED',
      rejectionReason: '',
    });
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDocument) return;

    if (verifyFormData.status === 'REJECTED' && !verifyFormData.rejectionReason?.trim()) {
      toast.error('Vui lòng nhập lý do từ chối');
      return;
    }

    setLoading(true);
    setVerifyingId(selectedDocument.id);
    try {
      await documentService.verifyDocument(selectedDocument.id, verifyFormData);
      toast.success(verifyFormData.status === 'VERIFIED' ? 'Xác thực tài liệu thành công' : 'Từ chối tài liệu thành công');
      handleCloseVerifyModal();
      await fetchDocuments(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Xác thực tài liệu thất bại');
    } finally {
      setLoading(false);
      setVerifyingId(null);
    }
  };

  const handleDeleteClick = (documentId: string, documentType: string) => {
    setDocumentToDelete({ id: documentId, type: documentType });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!documentToDelete) return;

    setDeletingId(documentToDelete.id);
    try {
      await documentService.deleteDocument(documentToDelete.id);
      toast.success('Xóa tài liệu thành công');
      setIsDeleteModalOpen(false);
      setDocumentToDelete(null);
      await fetchDocuments(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Xóa tài liệu thất bại');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredDocuments.map(doc => doc.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBatchDelete = async () => {
    if (selectedIds.length === 0) return;

    setLoading(true);
    try {
      await documentService.deleteDocuments(selectedIds);
      toast.success('Xóa nhiều tài liệu thành công');
      setIsBatchDeleteModalOpen(false);
      setSelectedIds([]);
      await fetchDocuments(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Xóa nhiều tài liệu thất bại');
    } finally {
      setLoading(false);
    }
  };

  // Filter documents based on search query
  const filteredDocuments = documents.filter(doc => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      doc.type.toLowerCase().includes(query) ||
      doc.userId.toLowerCase().includes(query) ||
      doc.description?.toLowerCase().includes(query) ||
      doc.id.toLowerCase().includes(query)
    );
  });

  // Get status badge
  const getStatusBadge = (status: DocumentStatus) => {
    const statusConfig = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Chờ xử lý' },
      VERIFIED: { color: 'bg-green-100 text-green-800', icon: CheckCircle2, label: 'Đã xác thực' },
      REJECTED: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Từ chối' },
      EXPIRED: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle, label: 'Hết hạn' },
    };
    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  // Get document type label
  const getDocumentTypeLabel = (type: DocumentType) => {
    const labels: Record<DocumentType, string> = {
      ID_CARD: 'CMND/CCCD',
      PASSPORT: 'Hộ chiếu',
      DRIVER_LICENSE: 'Bằng lái xe',
      OTHER: 'Khác',
    };
    return labels[type] || type;
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Quản lý KYC</h1>
        <p className="text-gray-500 text-sm">Quản lý tài liệu xác thực danh tính (KYC) của người dùng</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo loại, user ID, mô tả..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DocumentStatus | '')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="PENDING">Chờ xử lý</option>
            <option value="VERIFIED">Đã xác thực</option>
            <option value="REJECTED">Từ chối</option>
            <option value="EXPIRED">Hết hạn</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            {t('common.filter')}
          </button>
          {selectedIds.length > 0 && (
            <button
              onClick={() => setIsBatchDeleteModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t('common.deleteSelected') || 'Xóa đã chọn'} ({selectedIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                    onChange={handleSelectAll}
                    checked={filteredDocuments.length > 0 && selectedIds.length === filteredDocuments.length}
                    ref={el => {
                      if (el) el.indeterminate = selectedIds.length > 0 && selectedIds.length < filteredDocuments.length;
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Loại tài liệu</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày tạo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày xác thực</th>
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
              ) : filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    {searchQuery || statusFilter ? 'Không tìm thấy tài liệu nào' : 'Chưa có tài liệu nào'}
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((document) => (
                  <tr key={document.id} className={`hover:bg-gray-50 ${selectedIds.includes(document.id) ? 'bg-purple-50' : ''}`}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        checked={selectedIds.includes(document.id)}
                        onChange={() => toggleSelect(document.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{document.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900">{getDocumentTypeLabel(document.type)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(document.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{document.userId.slice(0, 8)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(document.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {document.verifiedAt ? (
                        new Date(document.verifiedAt).toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewClick(document)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded"
                          title={t('common.view') || 'Xem chi tiết'}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {document.status === 'PENDING' && (
                          <button
                            onClick={() => handleVerifyClick(document)}
                            disabled={verifyingId === document.id}
                            className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Xác thực"
                          >
                            {verifyingId === document.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4" />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteClick(document.id, getDocumentTypeLabel(document.type))}
                          disabled={deletingId === document.id}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title={t('common.delete')}
                        >
                          {deletingId === document.id ? (
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
              Hiển thị {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} của {totalItems} tài liệu
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchDocuments(currentPage - 1)}
                disabled={currentPage === 1 || fetching}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                Trang {currentPage} / {Math.ceil(totalItems / pageSize)}
              </span>
              <button
                onClick={() => fetchDocuments(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalItems / pageSize) || fetching}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Document Modal */}
      {isViewModalOpen && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Chi tiết Tài liệu KYC</h2>
              <button
                onClick={handleCloseViewModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">ID</label>
                  <p className="text-sm text-gray-900 font-mono">#{selectedDocument.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Loại tài liệu</label>
                  <p className="text-sm text-gray-900">{getDocumentTypeLabel(selectedDocument.type)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Trạng thái</label>
                  <div>{getStatusBadge(selectedDocument.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">User ID</label>
                  <p className="text-sm text-gray-900 font-mono">#{selectedDocument.userId}</p>
                </div>
                {selectedDocument.description && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-500 mb-2">Mô tả</label>
                    <p className="text-sm text-gray-900">{selectedDocument.description}</p>
                  </div>
                )}
                {selectedDocument.rejectionReason && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-red-500 mb-2">Lý do từ chối</label>
                    <p className="text-sm text-red-900">{selectedDocument.rejectionReason}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Ngày tạo</label>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedDocument.createdAt).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {selectedDocument.verifiedAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Ngày xác thực</label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedDocument.verifiedAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </div>
              {selectedDocument.fileUrl && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-500 mb-2">Tài liệu</label>
                  <a
                    href={selectedDocument.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 underline flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Xem tài liệu
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Verify Document Modal */}
      {isVerifyModalOpen && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Xác thực Tài liệu</h2>
              <button
                onClick={handleCloseVerifyModal}
                disabled={loading}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleVerifySubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại tài liệu
                </label>
                <p className="text-sm text-gray-900">{getDocumentTypeLabel(selectedDocument.type)}</p>
              </div>

              <div className="mb-4">
                <label htmlFor="verify-status" className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                  id="verify-status"
                  value={verifyFormData.status}
                  onChange={(e) => setVerifyFormData(prev => ({ ...prev, status: e.target.value as 'VERIFIED' | 'REJECTED' }))}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="VERIFIED">Xác thực</option>
                  <option value="REJECTED">Từ chối</option>
                </select>
              </div>

              {verifyFormData.status === 'REJECTED' && (
                <div className="mb-4">
                  <label htmlFor="rejection-reason" className="block text-sm font-medium text-gray-700 mb-2">
                    Lý do từ chối <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="rejection-reason"
                    value={verifyFormData.rejectionReason || ''}
                    onChange={(e) => setVerifyFormData(prev => ({ ...prev, rejectionReason: e.target.value }))}
                    required={verifyFormData.status === 'REJECTED'}
                    disabled={loading}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Nhập lý do từ chối..."
                  />
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseVerifyModal}
                  disabled={loading}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${verifyFormData.status === 'VERIFIED'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                    }`}
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>
                    {verifyFormData.status === 'VERIFIED' ? 'Xác thực' : 'Từ chối'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && documentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('common.delete')} Tài liệu</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {t('common.deleteConfirmMessage')?.replace('this item', `tài liệu "${documentToDelete.type}"`) || `Bạn có chắc chắn muốn xóa tài liệu "${documentToDelete.type}"?`}
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
                disabled={deletingId === documentToDelete.id}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deletingId === documentToDelete.id}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deletingId === documentToDelete.id && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{deletingId === documentToDelete.id ? t('common.deleting') : t('common.delete')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch Delete Confirmation Modal */}
      {isBatchDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{t('common.deleteMultiple') || 'Xóa nhiều tài liệu'}</h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Bạn có chắc chắn muốn xóa <strong>{selectedIds.length}</strong> tài liệu KYC đã chọn?
              </p>
              <div className="max-h-32 overflow-y-auto mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {documents
                    .filter(doc => selectedIds.includes(doc.id))
                    .map(doc => (
                      <li key={doc.id} className="truncate">{getDocumentTypeLabel(doc.type)} (#{doc.id.slice(0, 8)})</li>
                    ))
                  }
                </ul>
              </div>
              <p className="text-sm text-red-600">
                {t('common.deleteWarning') || 'Hành động này không thể hoàn tác.'}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsBatchDeleteModalOpen(false)}
                disabled={loading}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleBatchDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{loading ? t('common.deleting') : t('common.delete')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCManagement;


