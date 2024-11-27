import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Redirect to login if no token is available
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
