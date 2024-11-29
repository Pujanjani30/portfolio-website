import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  const decodedToken = jwtDecode(token);
  const isTokenExpired = decodedToken.exp < Date.now() / 1000;

  if (isTokenExpired) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
