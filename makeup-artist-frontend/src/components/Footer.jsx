import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="footer">
      
      {/* Brand Section */}
      <div className="footer-section">
        <h3>ANITA'S MAKEOVER BY ANITA KUMAVAT</h3>
        <p>
          Providing luxury makeup services across the metropolitan
          area for bridal and editorial occasions.
        </p>
      </div>

      {/* Contact Section */}
      <div className="footer-section">
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