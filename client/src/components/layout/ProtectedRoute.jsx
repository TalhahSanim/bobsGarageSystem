// File -> client/src/components/layout/ProtectedRoute.jsx
// Sends the guest to login  and non-admins away from admin pages
// usage -> <ProtectedRoute><MyFavourites /></ProtectedRoute>
// <ProtectedRoute adminOnly><AddService /></ProtectedRoute>
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ProtectedRoute component -> Takes in the page (children) and whether its admin only
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuth, isAdmin, status } = useAuth();

  // Still checking for saved token : wait instead of redirecting
  if (status === "loading") {
    return (
      <p className="flex items-center gap-3 text-muted">
        <span className="spinner" aria-hidden="true"></span> Validating Your
        Login
      </p>
    );
  }
  // Not logged in -> go to login page
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  // Logged in but page meant for admin only
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Allowed -> Display Page
  return children;
};

export default ProtectedRoute;
