import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import bridalImg from "../assets/bride.jpg";
import eveningImg from "../assets/evening.jpg";
import lessonImg from "../assets/lesson.webp";
import partyImg from "../assets/party.jpg";
import spaImg from "../assets/hairSpa.jpg";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Bridal Package",
      price: 10000,
      image: bridalImg,
      features: [
        "Engagement",
        "Haldi",
        "Hairstyle + Extension"
      ],
      duration: "120 Minutes"
    },
    {
      title: "Evening Glam",
      price: 2500,
      image: eveningImg,
      features: [
        "Contour & Highlight",
        "Customized Eye Look",
        "Luxury Lash Application"
      ],
      duration: "60 Minutes"
    },
    {
      title: "Makeup Lesson",
      price: 4000,
      image: lessonImg,
      features: [
        "Product Consultation",
        "Technique Demonstration",
        "Step-by-Step Guide"
      ],
      duration: "90 Minutes"
    },
    {
      title: "Party Glow",
      price: 3000,
      image: partyImg,
      features: [
        "Hairstyling",
        "Lashes",
        "Basic skin prep"
      ],
      duration: "60 Minutes"
    },
    {
      title: "Hair Spa",
      price: 2000,
      image: spaImg,
      features: [
        "Hair Smoothing/Keratin",
        "Deep Conditioning",
        "Blow-dry styling"
      ],
      duration: "60 Minutes"
    }
  ];

  const handleBooking = (service) => {
    navigate("/customize", {
      state: {
        serviceName: service.title,
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
  <img src={service.image} alt={service.title} />
</div>


            <div className="service-content">
              <div className="service-title-row">
                <h3>{service.title}</h3>
                <span>From ₹{service.price}</span>
              </div>

              <ul>
                {service.features.map((feature, i) => (
                  <li key={i}>✔ {feature}</li>
                ))}
              </ul>

              <p className="duration">⏱ {service.duration}</p>

              <button
                className="primary-btn full"
                onClick={() => handleBooking(service)}
              >
                Book This Service
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
