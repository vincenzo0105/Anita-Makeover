import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Protected({ children }) {

  const token = localStorage.getItem("token");

  // No token
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  try {

    const decoded = jwtDecode(token);

    // Token expired
    if (decoded.exp * 1000 < Date.now()) {

      localStorage.removeItem("token");

      return <Navigate to="/admin/login" replace />;
    }

  } catch (error) {

    console.error("Invalid token:", error);

    localStorage.removeItem("token");

    return <Navigate to="/admin/login" replace />;
  }

  return children;
}