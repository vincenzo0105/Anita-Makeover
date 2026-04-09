import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import getImageUrl from "../utils/getImageUrl";
export default function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/services`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((s) => ({
          title: s.name,
          name: s.name,
          price: s.price,
          image: s.image,

          features: s.features?.length
            ? s.features
            : [
                "Premium Products",
                "Expert Techniques",
                "Professional Finish"
              ],

          duration: s.duration || "60 Minutes",
          description: s.description || "No description available",
          available: s.available ?? true
        }));

        setServices(formatted);
      })
      .catch(err => {
        console.error("Error fetching services:", err);
        alert("Failed to load services ❌");
      });
  }, []);

  const handleBooking = (service) => {
    // 🧠 Strong validation
    if (!service?.name || !service?.price) {
      console.error("Invalid service:", service);
      alert("Something went wrong with this service ⚠️");
      return;
    }

    navigate("/customize", {
      state: {
        serviceName: service.name,
        basePrice: service.price
      }
    });
  };

  return (
    <>
      <Navbar />

      <section className="services-header">
        <h1>Services & Pricing</h1>
        <p>
          Elevating your natural beauty with premium products and expert techniques.
          Find the perfect package for your next special moment.
        </p>
      </section>

      <section className="services-grid">
        {services.length === 0 ? (
          <p style={{ textAlign: "center" }}>No services available</p>
        ) : (
          services.map((service, index) => (
            <div key={index} className="service-card">
              
              {/* 🖼 Image */}
              <div className="service-img">
              {service.image && (
  <div>
    <label className="font-medium">Current Image</label>
    <img
      src={getImageUrl(service.image)}
      alt="Current Service"
      className="w-40 h-40 object-cover rounded-lg border mt-2"
    />
  </div>
)}
              </div>

              {/* 📦 Content */}
              <div className="service-content">
                <div className="service-title-row">
                  <h3>{service.title}</h3>
                  <span>₹{service.price}</span>
                </div>

                <p className="service-desc">
                  {service.description}
                </p>

                <ul>
                  {service.features.map((feature, i) => (
                    <li key={i}>✔ {feature}</li>
                  ))}
                </ul>

                <p className="duration">⏱ {service.duration}</p>

                {!service.available && (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    Out of Service
                  </p>
                )}

                {/* 🚀 Button */}
                <button
                  className="primary-btn full"
                  disabled={!service.available}
                  onClick={() => handleBooking(service)}
                >
                  {service.available ? "Book This Service" : "Unavailable"}
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}