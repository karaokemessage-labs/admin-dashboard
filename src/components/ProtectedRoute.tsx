import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute - Chỉ kiểm tra đã đăng nhập hay chưa
 * Không kiểm tra role - Backend xử lý phân quyền
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  // Chỉ kiểm tra đã đăng nhập - không kiểm tra role
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Đã đăng nhập -> Cho phép truy cập tất cả routes
  return <>{children}</>;
};

export default ProtectedRoute;