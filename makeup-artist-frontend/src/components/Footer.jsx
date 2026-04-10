import { Link } from "react-router-dom";

import logo from "../assets/logo.png"; // Update path if needed

export default function Footer() {
  return (
    <footer className="footer">
      
      {/* Brand Section with Logo */}
      <div className="footer-section">
        <div className="brand-container">
          <img
            src={logo}
            alt="Anita's Makeover Logo"
            className="footer-logo"
          />
          <h3>ANITA'S MAKEOVER BY ANITA KUMAVAT</h3>
        </div>
        <p>
          Providing luxury makeup services across the metropolitan
          area for bridal and editorial occasions.
        </p>
      </div>

      {/* Contact Section */}
      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>Kalyan West</p>
        <p>+91 8369394088</p>
        <p>anitakumavat24@gmail.com</p>
      </div>

      {/* Quick Links Section */}
      <div className="footer-section">
        <h4>Quick Links</h4>
        <Link className="footer-link" to="/privacy">Privacy Policy</Link>
        <Link className="footer-link" to="/terms">Terms & Conditions</Link>
        <Link className="footer-link" to="/refund-policy">Refund Policy</Link>
      </div>

    </footer>
  );
}