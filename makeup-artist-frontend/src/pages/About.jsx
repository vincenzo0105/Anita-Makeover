import Navbar from "../components/Navbar";
import aboutImg from "../assets/anita4.jpeg";
import { useNavigate } from "react-router-dom";


export default function About() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="about-hero">
       <div className="about-image">
  <img src={aboutImg} alt="Makeup Artist" />
</div>


        <div className="about-content">
          <p className="vision-label">Meet the Artist</p>

          <h1>
            Anita
            <span> Kumavat</span>
          </h1>

          <p className="about-description">
           An experienced makeup artist dedicated to creating timeless, elegant looks that highlight individual features while ensuring comfort, confidence, and long-lasting perfection.
          </p>

          <div className="about-badges">
            <div className="badge">Certified Master</div>
            <div className="badge">Makeup Artist</div>
          </div>

           <button
            className="primary-btn"
            onClick={() => navigate("/portfolio")}
          >
            View My Work
          </button>
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section className="about-journey">
        <h2>From Brush Strokes to Bridal Perfection</h2>

        <p>
         I am a professional makeup artist dedicated to enhancing natural beauty through personalized and elegant makeup looks. With a strong focus on skin preparation, hygiene, and detail, I create makeup that feels comfortable, looks flawless, and lasts throughout the day. My services include bridal makeup, party and event makeup, photoshoots, and professional makeup applications, all tailored to suit individual features, skin types, and occasions. Using high-quality, professional products and modern techniques, I aim to make every client feel confident, beautiful, and camera-ready for their special moments.
        </p>

        
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="about-testimonials">
        <h2>What Clients Say</h2>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>
              "I never felt more beautiful than on my wedding day. She understood
              exactly the 'natural but elevated' look I wanted and it lasted all night."
            </p>
            <h4>Rekha Gupta</h4>
          </div>

          <div className="testimonial-card">
            <p>
              "Her professionalism is unmatched. We worked together on a magazine
              shoot and her speed and attention to detail were incredible."
            </p>
            <h4>Mamta Kumavat</h4>
          </div>

          <div className="testimonial-card">
            <p>
              "I booked a private lesson and it changed how I look at my daily
              routine. She taught me how to work with my features."
            </p>
            <h4>Kinjal</h4>
          </div>
        </div>
      </section>

      {/* SOCIAL SECTION */}
      <section className="about-social">
        <h3>Stay Connected</h3>

        <div className="social-links">
          <a
            href="https://instagram.com/ak_makeover_and_hair_artist"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>

          <a
            href="https://pinterest.com/YOUR_PINTEREST_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pinterest
          </a>

          <a
            href="https://wa.me/918369394088"
            target="_blank"
            rel="noopener noreferrer"
          >
            Whatsapp
          </a>
        </div>
      </section>
    </>
  );
}
