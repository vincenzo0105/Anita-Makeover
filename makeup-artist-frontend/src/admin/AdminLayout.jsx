import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="admin-container">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Anita Admin</h2>

        <nav>
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/bookings">Bookings</Link></li>
            <li><Link to="/admin/services">Services</Link></li>
            <li><Link to="/admin/portfolio">Portfolio</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
}