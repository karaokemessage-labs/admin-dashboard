import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Setup2FA from './Setup2FA';

const Login = () => {
  const { isAuthenticated, mustSetup2fa, setMustSetup2fa, fetchUserInfo, register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState('admin@kara.club');
  const [password, setPassword] = useState('be12345678@Ab');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !mustSetup2fa) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, mustSetup2fa, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Cho phép login với bất kỳ thông tin nào - không cần validation
      // Set user mặc định với role provider
      const providerUser = {
        id: 'provider-admin',
        email: usernameOrEmail || 'admin@kara.club',
        name: 'Admin Karaoke',
        displayName: 'Admin Karaoke',
        role: 'provider' as const,
        username: usernameOrEmail || 'admin',
      };

      // Lưu vào localStorage
      localStorage.setItem('user', JSON.stringify(providerUser));
      localStorage.setItem('accessToken', 'demo-token-provider');
      localStorage.setItem('token', 'demo-token-provider');
      localStorage.setItem('isAuthenticated', 'true');

      // Set user trong AuthContext
      register({
        name: 'Admin Karaoke',
        email: usernameOrEmail || 'admin@kara.club',
        phone: '',
        password: '',
        role: 'provider',
      });

      toast.success('Đăng nhập thành công!');
      
      // Reload page để AuthContext nhận user mới với role provider
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
    } catch (err: any) {
      // Fallback - vẫn cho phép vào dashboard với role provider
      const providerUser = {
        id: 'provider-admin',
        email: usernameOrEmail || 'admin@kara.club',
        name: 'Admin Karaoke',
        displayName: 'Admin Karaoke',
        role: 'provider' as const,
        username: usernameOrEmail || 'admin',
      };
      localStorage.setItem('user', JSON.stringify(providerUser));
      localStorage.setItem('accessToken', 'demo-token-provider');
      localStorage.setItem('token', 'demo-token-provider');
      localStorage.setItem('isAuthenticated', 'true');
      
      toast.success('Đăng nhập thành công!');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  const handle2FAComplete = async () => {
    // After 2FA setup is complete (including recovery codes saved), fetch user info and complete the login process
    try {
      // Token should already be in localStorage from Setup2FA/Verify2FA
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      if (!token) {
        toast.error('Không tìm thấy access token. Vui lòng đăng nhập lại.');
        return;
      }
      
      // Fetch user info using the token
      await fetchUserInfo();
      setMustSetup2fa(false);
      
      // Navigate to dashboard - success message is already shown in RecoveryCodesModal
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      toast.error(error.message || 'Không thể lấy thông tin người dùng. Vui lòng thử lại.');
    }
  };

  const handle2FACancel = () => {
    // Cancel 2FA setup - logout user
    setMustSetup2fa(false);
    // Clear token and redirect to login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    toast.info('Thiết lập 2FA đã bị hủy. Vui lòng đăng nhập lại.');
  };

  return (
    <>
      {mustSetup2fa && (
        <Setup2FA onComplete={handle2FAComplete} onCancel={handle2FACancel} />
      )}
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-8 py-8 bg-gradient-to-r from-purple-600 to-blue-600">
          <h1 className="text-2xl font-bold text-white text-center">Admin Karaoke</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('common.emailOrUsername')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder={t('common.emailOrUsername')}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {t('common.password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              {t('common.forgotPassword')}
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? t('common.loggingIn') : t('common.login')}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;

