import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute — wraps a page and ensures the logged-in user
 * has the correct role before rendering it.
 *
 * Usage:
 *   <Route path="/admin/dashboard" element={
 *     <ProtectedRoute role="admin"><AdminDashboardOverview /></ProtectedRoute>
 *   } />
 *
 * Props:
 *   role  — required role string ('customer' | 'admin' | 'shopowner' | 'delivery')
 *   children — the page component to render if authorised
 */
const ProtectedRoute = ({ role, children }) => {
  let user = null;
  try {
    const stored = localStorage.getItem('bn_user');
    if (stored) user = JSON.parse(stored);
  } catch {
    user = null;
  }

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Wrong role → redirect to their actual dashboard
  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return children;
};

export default ProtectedRoute;
