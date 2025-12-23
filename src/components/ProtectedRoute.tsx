interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Authentication is disabled, always render children
  return <>{children}</>;
};

export default ProtectedRoute;