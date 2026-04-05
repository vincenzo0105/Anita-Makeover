import { useEffect, useState } from "react";

export default function Bookings() {

  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`)
      .then(res => res.json())
      .then(data => setBookings(data))
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

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`);
      const data = await res.json();
      setBookings(data);

    } catch (err) {
      console.log(err);
    }
  };

  // ✅ WHATSAPP APPROVAL
  const sendApprovalWhatsApp = (booking) => {
    const phone = booking.phone?.replace(/\D/g, "");

    const message = `Hi ${booking.name},

Your booking for ${booking.service} is confirmed! 🎉

📅 Date: ${booking.date}
⏰ Time: ${booking.time}

💰 Amount: ₹${booking.totalAmount}

Please complete your payment:
UPI ID: omk145593@okaxis

Thank you 💄`;

    window.open(
      `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // ❌ WHATSAPP REJECT
  const sendRejectWhatsApp = (booking) => {
    const phone = booking.phone?.replace(/\D/g, "");

    const message = `Hi ${booking.name},

We regret to inform you that your booking for ${booking.service} on ${booking.date} at ${booking.time} could not be confirmed.

Please try another slot.

Thank you 💄`;

    window.open(
      `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const filteredBookings = bookings
    .filter(b => filter === "All" || b.status === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>

      <h1>Bookings</h1>

      {/* FILTER */}
      <div className="filter-bar">
        {["All", "Pending", "Approved", "Cancelled", "Paid"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="booking-table">

          <thead>
            <tr>
              <th>Client</th>
              <th>Service</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="8">No bookings found</td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr
                  key={b._id}
                  onClick={() => setSelectedBooking(b)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{b.name}</td>
                  <td>{b.service}</td>
                  <td>{b.phone || "-"}</td>
                  <td>{b.email || "-"}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>

                  <td className={`status ${b.status?.toLowerCase()}`}>
                    {b.status || "Pending"}
                  </td>

                  <td>

                    {/* APPROVE */}
                    <button
                      className="approve-btn"
                      disabled={b.status === "Approved" || b.status === "Paid"}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(b._id, "Approved");
                        sendApprovalWhatsApp(b);
                      }}
                    >
                      Approve
                    </button>

                    {/* CANCEL */}
                    <button
                      className="cancel-btn"
                      disabled={b.status === "Cancelled"}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(b._id, "Cancelled");
                        sendRejectWhatsApp(b);
                      }}
                    >
                      Cancel
                    </button>

                    {/* MARK AS PAID */}
                    {b.status === "Approved" && (
                      <label className="switch" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          onChange={() => updateStatus(b._id, "Paid")}
                        />
                        <span className="slider"></span>
                      </label>
                    )}

                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <h2>Booking Details</h2>

            <p><strong>Name:</strong> {selectedBooking.name}</p>
            <p><strong>Service:</strong> {selectedBooking.service}</p>

            <div className="modal-section">
              <strong>Add-ons:</strong>
              {selectedBooking.addOns?.length > 0 ? (
                <ul>
                  {selectedBooking.addOns.map((addon, i) => (
                    <li key={i}>{addon}</li>
                  ))}
                </ul>
              ) : (
                <p>No add-ons</p>
              )}
            </div>

            <p><strong>Phone:</strong> {selectedBooking.phone}</p>

           <div className="action-buttons">
  {selectedBooking.phone && (
    <a
      href={`tel:${selectedBooking.phone}`}
      className="call-btn"
      onClick={(e) => e.stopPropagation()}
    >
      📞 Call Client
    </a>
  )}

  {selectedBooking.phone && (
    <button
      className="whatsapp-btn"
      onClick={(e) => {
        e.stopPropagation();
        sendApprovalWhatsApp(selectedBooking);
      }}
    >
      💬 Send WhatsApp
    </button>
  )}
</div>
            <p><strong>Email:</strong> {selectedBooking.email}</p>
            <p><strong>Address:</strong> {selectedBooking.address || "-"}</p>
            <p><strong>City:</strong> {selectedBooking.city || "-"}</p>

            <p><strong>Date:</strong> {selectedBooking.date}</p>
            <p><strong>Time:</strong> {selectedBooking.time}</p>

            <p className="modal-total">
              <strong>Total Amount:</strong> ₹{selectedBooking.totalAmount}
            </p>

            <p><strong>Status:</strong> {selectedBooking.status}</p>

            {/* MODAL PAID TOGGLE */}
            {selectedBooking.status === "Approved" && (
              <div style={{ marginTop: "10px" }}>
                <strong>Mark as Paid:</strong>
                <label className="switch" style={{ marginLeft: "10px" }}>
                  <input
                    type="checkbox"
                    onChange={() => {
                      updateStatus(selectedBooking._id, "Paid");
                      setSelectedBooking({ ...selectedBooking, status: "Paid" });
                    }}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            )}

            <button
              className="close-btn"
              onClick={() => setSelectedBooking(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}