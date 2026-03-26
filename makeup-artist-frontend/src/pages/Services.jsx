import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import bridalImg from "../assets/bride.jpg";
import eveningImg from "../assets/evening.jpg";
import lessonImg from "../assets/lesson.webp";
import partyImg from "../assets/party.jpg";
import spaImg from "../assets/hairSpa.jpg";

export default function Services() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/services")
    .then(res => res.json())
    .then(data => {

      const formatted = data.map((s) => ({
  title: s.name,
  name: s.name,
  price: s.price,
  image: s.image, // ✅ from backend

  features: s.features || [
    "Premium Products",
    "Expert Techniques",
    "Professional Finish"
  ],

  duration: s.duration || "60 Minutes",
  description: s.description || "",
  available: s.available
}));

      setServices(formatted);
    })
    .catch(err => console.log(err));
}, []);

  const handleBooking = (service) => {
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
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-img">
 <img
  src={
    service.image
      ? `http://localhost:5000/uploads/${service.image}`
      : "/placeholder.jpg"
  }
  alt={service.name}
/>
</div>


            <div className="service-content">
              <div className="service-title-row">
  <h3>{service.title}</h3>
  <span>From ₹{service.price}</span>
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
             <button
  className="primary-btn full"
  disabled={!service.available}
  onClick={() => handleBooking(service)}
>
  {service.available ? "Book This Service" : "Unavailable"}
</button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}