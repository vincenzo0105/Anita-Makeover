import { useEffect, useState } from "react";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.log(err));
  }, []);

  // 📅 Today's date
  const today = new Date().toISOString().split("T")[0];

  // 🔢 Calculations
  const todaysBookings = bookings.filter(b => b.date === today);

  const upcomingBookings = bookings.filter(
    b => new Date(b.date) > new Date()
  );

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.totalAmount || 0),
    0
  );

  return (
    <div>

      <h1>Admin Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Today's Bookings</h3>
          <p>{todaysBookings.length}</p>
        </div>

        <div className="stat-card">
          <h3>Upcoming Bookings</h3>
          <p>{upcomingBookings.length}</p>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>

      </div>

    </div>
  );
}