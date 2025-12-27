import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: never; // Deprecated - no longer needed
  fallbackPath?: string;
}

/**
 * RoleGuard - Protect routes/components based on authentication
 * Since this is an admin-only portal, we only check authentication
 * @param fallbackPath - Path to redirect if not authenticated (default: /login)
 */
const RoleGuard = ({ children, fallbackPath = '/login' }: RoleGuardProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;







