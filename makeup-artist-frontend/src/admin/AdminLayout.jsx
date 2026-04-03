import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="admin-wrapper">

      {/* ✅ NAVBAR */}
      <div className="admin-navbar">
        <h2 className="admin-title">Anita Admin</h2>

        <div className="admin-nav-links">
          <Link
            to="/admin/dashboard"
            className={`admin-link ${
              location.pathname === "/admin/dashboard" ? "active" : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/bookings"
            className={`admin-link ${
              location.pathname === "/admin/bookings" ? "active" : ""
            }`}
          >
            Bookings
          </Link>

          <Link
            to="/admin/services"
            className={`admin-link ${
              location.pathname === "/admin/services" ? "active" : ""
            }`}
          >
            Services
          </Link>

          <Link
            to="/admin/portfolio"
            className={`admin-link ${
              location.pathname === "/admin/portfolio" ? "active" : ""
            }`}
          >
            Portfolio
          </Link>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* ✅ MAIN CONTENT */}
      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
}