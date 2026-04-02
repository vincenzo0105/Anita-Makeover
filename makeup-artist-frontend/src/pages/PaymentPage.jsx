import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  // 🔹 Fetch booking details
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(b => b._id === id);
        setBooking(found);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handlePayment = async () => {
    if (!booking) return;

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: booking.totalAmount || 1000, // ⚠️ adjust later
        customerName: booking.name,
        customerEmail: booking.email,
        customerPhone: booking.phone,
        bookingId: id
      }),
    });

  const data = await res.json();
console.log("Cashfree response:", data);

// 👇 use session id instead of payment_link
if (data.payment_session_id) {
  window.Cashfree.checkout({
    paymentSessionId: data.payment_session_id,
    redirectTarget: "_self"
  });
} else {
  alert("Payment session not received ❌");
}
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Complete Your Payment</h1>

      {booking ? (
        <>
          <p>{booking.service}</p>
          <p>₹{booking.totalAmount}</p>

          <button onClick={handlePayment}>
            Pay Now 💳
          </button>
        </>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
}