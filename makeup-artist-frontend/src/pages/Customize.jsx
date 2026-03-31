import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Customize() {
  const location = useLocation();
  const navigate = useNavigate();

  const serviceName = location.state?.serviceName || "Selected Service";
  const basePrice = location.state?.basePrice || 0;

  const addonOptions = [
    { id: 1, name: "Lash Upgrade", price: 200 },
    { id: 2, name: "Airbrush Finish", price: 300 },
    { id: 3, name: "Travel to Venue", price: 200 }
  ];

  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const toggleAddon = (addon) => {
    const exists = selectedAddons.find((item) => item.id === addon.id);

    if (exists) {
      setSelectedAddons(
        selectedAddons.filter((item) => item.id !== addon.id)
      );
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const total =
    basePrice +
    selectedAddons.reduce((sum, addon) => sum + addon.price, 0);

  // ✅ VALIDATION FUNCTION
  const handleContinue = () => {
    if (
      !name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !address.trim() ||
      !city.trim() ||
      !selectedDate ||
      !selectedTime
    ) {
      alert("Please fill all required fields ⚠️");
      return;
    }

    // 📱 Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be exactly 10 digits 📱");
      return;
    }

    // 📧 Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address 📧");
      return;
    }

    navigate("/details", {
      state: {
        serviceName,
        basePrice,
        selectedAddons,
        total,
        selectedDate,
        selectedTime,
        name,
        phone,
        address,
        city,
        message,
        email
      }
    });
  };

  return (
    <>
      <Navbar />

      <section className="customize-container">
        
        {/* LEFT */}
        <div className="customize-left">
          <h1>Customize Your Experience</h1>

          <h3 className="section-title">Service Add-ons</h3>

          {addonOptions.map((addon) => {
            const isSelected = selectedAddons.some(
              (item) => item.id === addon.id
            );

            return (
              <label
                key={addon.id}
                className={`addon-card ${isSelected ? "selected" : ""}`}
              >
                <div className="addon-left">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleAddon(addon)}
                  />
                  <span>{addon.name}</span>
                </div>
                <span className="addon-price">+₹{addon.price}</span>
              </label>
            );
          })}

          {/* DATE & TIME */}
          <div className="booking-section">
            <h3 className="section-title">Select Date & Time</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Select Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Select Time</label>
                <input
                  type="time"
                  required
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* CLIENT INFO */}
          <div className="client-info">
            <h3 className="section-title">Who are we glamming?</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  required
                  maxLength="10"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPhone(value);
                  }}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label>Full Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input type="text" placeholder="Maharashtra" />
              </div>
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input type="text" placeholder="400001" />
            </div>

            <div className="form-group full-width">
              <label>Special Notes (Optional)</label>
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="customize-right">
          <div className="summary-box">
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

            {selectedDate && (
              <div className="summary-row">
                <span>Date</span>
                <span>{selectedDate}</span>
              </div>
            )}

            {selectedTime && (
              <div className="summary-row">
                <span>Time</span>
                <span>{selectedTime}</span>
              </div>
            )}

            <div className="summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className="primary-btn full"
              onClick={handleContinue}
            >
              Continue to Details →
            </button>
          </div>

          {/* ✅ SUPPORT BOX RESTORED */}
          <div className="summary-support">
            <h4>Any questions?</h4>
            <p>
              Call us at <strong>+91 8369394088</strong>
              <br />
              <span className="whatsapp-note">(WhatsApp calls only)</span>
            </p>

            <a
              href="https://wa.me/918369394088"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              💬 Chat with us
            </a>
          </div>
        </div>

      </section>
    </>
  );
}