const handleBooking = async () => {

  // ❗ prevent fake "Service"
  if (!serviceName || serviceName === "Service") {
    alert("Please select a service again.");
    navigate("/services");
    return;
  }

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
    email,
    totalAmount: finalAmount
  };

  console.log("FINAL BOOKING DATA:", bookingData);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData) // ✅ THIS WAS MISSING
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Booking failed ❌");
      return;
    }

    console.log("Saved:", data);

    setShowPopup(true); // ✅ only on success

  } catch (err) {
    console.error(err);
    alert("Error saving booking ❌");
  }
};