import { useEffect, useState } from "react";

export default function Bookings() {

  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched bookings:", data);
        setBookings(data);
      })
      .catch(err => console.log(err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      // refresh bookings
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`);
      const data = await res.json();
      setBookings(data);

    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Filter + Sort (newest first)
  const filteredBookings = bookings
    .filter(b => filter === "All" || b.status === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>

      <h1>Bookings</h1>

      {/* 🔍 Filter Buttons */}
      <div className="filter-bar">
  <button
    className={`filter-btn ${filter === "All" ? "active" : ""}`}
    onClick={() => setFilter("All")}
  >
    All
  </button>

  <button
    className={`filter-btn ${filter === "Pending" ? "active" : ""}`}
    onClick={() => setFilter("Pending")}
  >
    Pending
  </button>

  <button
    className={`filter-btn ${filter === "Confirmed" ? "active" : ""}`}
    onClick={() => setFilter("Confirmed")}
  >
    Confirmed
  </button>

  <button
    className={`filter-btn ${filter === "Cancelled" ? "active" : ""}`}
    onClick={() => setFilter("Cancelled")}
  >
    Cancelled
  </button>
</div>

      <table className="booking-table">

        <thead>
          <tr>
            <th>Client</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.length === 0 ? (
            <tr>
              <td colSpan="6">No bookings found</td>
            </tr>
          ) : (
            filteredBookings.map((b) => (
              <tr key={b._id}>
                <td>{b.name}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>

                {/* 🎨 Colored Status */}
                <td className={`status ${b.status?.toLowerCase()}`}>
                  {b.status || "Pending"}
                </td>

                <td>
                  <button
                    className="approve-btn"
                    disabled={b.status === "Confirmed"}
                    onClick={() => updateStatus(b._id, "Confirmed")}
                  >
                    Approve
                  </button>

                  <button
                    className="cancel-btn"
                    disabled={b.status === "Cancelled"}
                    onClick={() => updateStatus(b._id, "Cancelled")}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>

    </div>
  );
}