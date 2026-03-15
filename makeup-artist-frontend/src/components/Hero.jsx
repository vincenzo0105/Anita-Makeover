import { useNavigate } from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-overlay">
        <span className="badge">REDEFINING ELEGANCE</span>

        <h1>
          Enhancing your <br />
          <em>natural</em> radiance.
        </h1>

        <p>
          Bespoke beauty experiences tailored for high-fashion,
          weddings, and your most unforgettable moments.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/services")}
          >
            Book Your Session
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/portfolio")}
          >
            View Portfolio
          </button>
        </div>

      </div>
    </section>
  );
}