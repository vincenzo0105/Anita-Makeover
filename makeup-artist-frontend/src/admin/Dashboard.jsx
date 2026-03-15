export default function Dashboard() {
  return (
    <div>

      <h1>Admin Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Today's Bookings</h3>
          <p>5</p>
        </div>

        <div className="stat-card">
          <h3>Upcoming Bookings</h3>
          <p>12</p>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹18,000</p>
        </div>

      </div>

    </div>
  );
}