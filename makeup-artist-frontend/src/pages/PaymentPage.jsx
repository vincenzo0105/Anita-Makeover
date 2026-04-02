import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch booking details
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(b => b._id === id);
        setBooking(found);
      })
      .catch(err => console.error("Error fetching booking:", err));
  }, [id]);

  const handlePayment = async () => {
    if (!booking) {
      alert("Booking not loaded ❌");
      return;
    }

    setLoading(true);

    try {
      const paymentRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: booking.totalAmount,
          customerName: booking.name,
          customerEmail: booking.email,
          customerPhone: booking.phone,
          bookingId: id
        }),
      });

      if (!paymentRes.ok) {
        throw new Error(`Payment creation failed: ${paymentRes.status}`);
      }

      const paymentData = await paymentRes.json();
      console.log("✅ Payment session created:", paymentData);

      // Check if Cashfree SDK is loaded
      if (!window.Cashfree) {
        alert("Cashfree SDK not loaded ❌");
        return;
      }

      // Check if payment_session_id exists
      if (!paymentData.payment_session_id) {
        console.error("❌ No payment_session_id in response:", paymentData);
        alert("Failed to create payment session ❌");
        return;
      }

      // Initiate payment
      window.Cashfree.checkout({
        paymentSessionId: paymentData.payment_session_id,
        redirectTarget: "_self"
      });

    } catch (error) {
      console.error("❌ Payment error:", error);
      alert(`Payment error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Complete Your Payment</h1>

      {booking ? (
        <>
          <p><strong>{booking.service}</strong></p>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>₹{booking.totalAmount}</p>

          <button 
            onClick={handlePayment}
            disabled={loading}
            style={{ 
              padding: "12px 30px", 
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Processing..." : "Pay Now 💳"}
          </button>
        </>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
}