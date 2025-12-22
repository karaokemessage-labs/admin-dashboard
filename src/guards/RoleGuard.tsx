import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

/**
 * RoleGuard - Protect routes/components based on user role
 * @param allowedRoles - Array of roles that can access this route
 * @param fallbackPath - Path to redirect if user doesn't have permission (default: /dashboard)
 */
const RoleGuard = ({ children, allowedRoles, fallbackPath = '/dashboard' }: RoleGuardProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.role || !allowedRoles.includes(user.role)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;







