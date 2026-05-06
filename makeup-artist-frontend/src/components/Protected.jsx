import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Protected({ children }) {

  const token = localStorage.getItem("token");

  // No token
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  try {

    // Decode token
    const decoded = jwtDecode(token);

    // Check expiry
    if (decoded.exp * 1000 < Date.now()) {

      // Remove expired token
      localStorage.removeItem("token");

      return <Navigate to="/admin/login" replace />;
    }

  } catch (error) {

    // Invalid token
    localStorage.removeItem("token");

    return <Navigate to="/admin/login" replace />;
  }

  return children;
}