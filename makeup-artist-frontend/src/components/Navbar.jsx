import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {

  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <nav className="navbar">

        <div className="logo">
          <NavLink to="/" className="logo-link">
            <img src={logo} alt="Anita Artistry Logo" className="logo-img" />
            <span>Anita's Makeover</span>
          </NavLink>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/portfolio" className="nav-link">
              Portfolio
            </NavLink>
          </li>

          <li>
            <NavLink to="/services" className="nav-link">
              Services
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </li>
        </ul>

        <button
          className="book-btn"
          onClick={() => setShowPopup(true)}
        >
          Book a Consultation
        </button>

      </nav>


      {/* Popup */}
      {showPopup && (
        <div className="call-popup-overlay">

          <div className="call-popup">

            <h2>Call us to clarify your doubts.</h2>

            <p>You can call us directly on WhatsApp.</p>

            <p className="call-number">
              📞 +91 8369394088
            </p>

           <div className="popup-buttons">

  <a
    href="https://wa.me/918369394088"
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-call-btn"
  >
    Call on WhatsApp
  </a>

  <button
    className="close-popup"
    onClick={() => setShowPopup(false)}
  >
    Close
  </button>

</div>

          </div>

        </div>
      )}

    </>
  );
}