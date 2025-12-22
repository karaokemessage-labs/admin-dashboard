import { useState, useEffect } from 'react';
import { Copy, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';

interface RecoveryCodesModalProps {
  onComplete: () => void;
  recoveryCodes?: string;
}

const RecoveryCodesModal = ({ onComplete, recoveryCodes: initialRecoveryCodes }: RecoveryCodesModalProps) => {
  const [loading, setLoading] = useState(!initialRecoveryCodes);
  const [recoveryCodes, setRecoveryCodes] = useState<string>(initialRecoveryCodes || '');
  const [confirmed, setConfirmed] = useState(false);
  const [finishing, setFinishing] = useState(false);

  useEffect(() => {
    // If recovery codes are not provided, fetch them
    if (!initialRecoveryCodes) {
      const fetchRecoveryCodes = async () => {
        setLoading(true);
        try {
          const response = await authService.getRecoveryCodes();
          console.log('Recovery codes response:', response);
          
          // Handle different response structures
          // API returns: { success: true, message: "...", data: ["code string"] }
          let codes = '';
          
          // Priority 1: Try data as array (most common format from API)
          if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            // If array contains strings, take first element or join them
            if (typeof response.data[0] === 'string') {
              codes = response.data[0];
            } else {
              codes = response.data.join(' ');
            }
          }
          // Priority 2: Try data.recoveryCodes (string)
          else if (response.data?.recoveryCodes && typeof response.data.recoveryCodes === 'string') {
            codes = response.data.recoveryCodes;
          }
          // Priority 3: Try data.codes (array)
          else if (response.data?.codes && Array.isArray(response.data.codes)) {
            codes = response.data.codes.join(' ');
          }
          // Priority 4: Try recoveryCodes (string) at top level
          else if (response.recoveryCodes && typeof response.recoveryCodes === 'string') {
            codes = response.recoveryCodes;
          }
          // Priority 5: Try codes (array) at top level
          else if (response.codes && Array.isArray(response.codes)) {
            codes = response.codes.join(' ');
          }
          // Priority 6: Try data as string
          else if (response.data && typeof response.data === 'string') {
            codes = response.data;
          }
          
          console.log('Parsed recovery codes:', codes);
          
          if (codes && codes.trim()) {
            setRecoveryCodes(codes.trim());
          } else {
            console.warn('No recovery codes found in response:', response);
            toast.error('Không tìm thấy recovery codes trong phản hồi từ server.');
          }
        } catch (error: any) {
          console.error('Error fetching recovery codes:', error);
          toast.error(error.message || 'Không thể tải recovery codes. Vui lòng thử lại.');
        } finally {
          setLoading(false);
        }
      };

      fetchRecoveryCodes();
    }
  }, [initialRecoveryCodes]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(recoveryCodes);
      toast.success('Đã sao chép recovery codes vào clipboard.');
    } catch (error) {
      toast.error('Không thể sao chép. Vui lòng thử lại.');
    }
  };

  const handleFinish = () => {
    if (!confirmed) {
      toast.error('Vui lòng xác nhận đã lưu recovery codes.');
      return;
    }
    setFinishing(true);
    // Show success message before completing
    toast.success('Thiết lập thành công! 2FA đã được kích hoạt cho tài khoản của bạn.', {
      autoClose: 3000,
    });
    // Small delay for UX
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-[#1e3a8a] flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e3a8a] max-w-2xl w-full">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-8 uppercase">
          SAVE YOUR RECOVERY CODES
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : (
          <>
            {/* Recovery Code Field */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 bg-white rounded-lg p-4 border border-gray-300">
                  <p className="text-gray-800 font-mono text-sm break-all whitespace-pre-wrap">
                    {recoveryCodes || 'No recovery codes available'}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors border border-gray-300"
                  title="Copy recovery codes"
                  disabled={!recoveryCodes}
                >
                  <Copy className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Instructions */}
              <div className="space-y-2 mb-6">
                <p className="text-white text-sm">
                  Use this backup codes if you lose access to your Authenticator app or email
                </p>
                <p className="text-white text-sm">
                  Store them somewhere safe. You won't be able to view them again
                </p>
              </div>
            </div>

            {/* Confirmation Prompt */}
            <div className="text-center mb-6">
              <p className="text-white text-sm mb-4">
                You must confirm that you have saved your recovery codes before finish setup
              </p>
              
              {/* Checkbox */}
              <label className="flex items-center justify-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-white text-sm">I have saved my recovery codes</span>
              </label>
            </div>

            {/* Finish Setup Button */}
            <div className="flex justify-center">
              <button
                onClick={handleFinish}
                disabled={!confirmed || finishing}
                className="px-8 py-3 bg-gray-200 text-[#1e3a8a] rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 uppercase"
              >
                {finishing && <Loader2 className="w-4 h-4 animate-spin" />}
                FINISH SETUP
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecoveryCodesModal;

