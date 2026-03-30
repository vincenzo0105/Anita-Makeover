import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Redirect if user refreshes or opens directly
  useEffect(() => {
    if (!location.state) {
      navigate("/services");
    }
  }, [location, navigate]);

  const serviceName = location.state?.serviceName || "Service";
  const basePrice = location.state?.basePrice || 0;
  const selectedAddons = location.state?.selectedAddons || [];
  const total = location.state?.total || 0;
  const selectedDate = location.state?.selectedDate || "";
  const selectedTime = location.state?.selectedTime || "";
  const name = location.state?.name || "";
const phone = location.state?.phone || "";
const address = location.state?.address || "";
const city = location.state?.city || "";
const message = location.state?.message || "";
const email = location.state?.email || "";

  const serviceFee = Math.round(total * 0.05);
  const finalAmount = total + serviceFee;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const handleBooking = async () => {
  const bookingData = {
    service: serviceName,
    addOns: selectedAddons.map(a => a.name),
    name,
    phone,
    address,
    city,
    date: selectedDate,
    time: selectedTime,
    message,
    email
  };

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    });

    const data = await res.json();
    console.log("Saved:", data);

    alert("Booking successful ✅");

    // optional: redirect after booking
    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Error saving booking ❌");
  }
};

  return (
    <>
      <Navbar />

      <section className="details-container">

        <h1>Confirm Your Glam Session</h1>
        <p className="step-label">Step 3 of 3: Finalize</p>

        {/* BOOKING SUMMARY */}
        <div className="details-card">
          <h3>Booking Summary</h3>

          <div className="summary-row">
            <span>{serviceName}</span>
            <span>₹{basePrice}</span>
          </div>

          {selectedAddons.map((addon) => (
            <div key={addon.id} className="summary-row">
              <span>{addon.name}</span>
              <span>₹{addon.price}</span>
            </div>
          ))}

          {/* ✅ Show Date */}
          {selectedDate && (
            <div className="summary-row">
              <span>Date</span>
              <span>{selectedDate}</span>
            </div>
          )}

          {/* ✅ Show Time */}
          {selectedTime && (
            <div className="summary-row">
              <span>Time</span>
              <span>{selectedTime}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="summary-row">
            <span>Service Fee (5%)</span>
            <span>₹{serviceFee}</span>
          </div>

          <div className="summary-total">
            <span>Total Payable</span>
            <span>₹{finalAmount}</span>
          </div>
        </div>

        {/* PAYMENT SECTION */}
        <div className="details-card">
          <h3>Payment Method</h3>

          <div className="payment-tabs">
            <button
              className={paymentMethod === "card" ? "active" : ""}
              onClick={() => setPaymentMethod("card")}
            >
              Card
            </button>

            <button
              className={paymentMethod === "upi" ? "active" : ""}
              onClick={() => setPaymentMethod("upi")}
            >
              UPI
            </button>

            <button
              className={paymentMethod === "cash" ? "active" : ""}
              onClick={() => setPaymentMethod("cash")}
            >
              Cash
            </button>
          </div>

          {paymentMethod === "card" && (
            <div className="payment-form">
              <input placeholder="Cardholder Name" />
              <input placeholder="Card Number" />
              <div className="form-row">
                <input placeholder="MM/YY" />
                <input placeholder="CVC" />
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="payment-form">
              <input placeholder="Enter UPI ID" />
            </div>
          )}

          {paymentMethod === "cash" && (
            <p>Pay at the time of appointment.</p>
          )}

          <button className="primary-btn full" onClick={handleBooking}>
  Complete Booking →
</button>
        </div>

      </section>
    </>
  );
}
