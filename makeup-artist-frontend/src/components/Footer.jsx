import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="footer">
      
      <div>
        <h3>ARTISTRY BY ANITA KUMAVAT</h3>
        <p>
          Providing luxury makeup services across the metropolitan
          area for bridal and editorial occasions.
        </p>
      </div>

      <div>
        <p>Kalyan West</p>
        <p>+91 8369394088</p>
        <p>anitakumavat24@gmail.com</p>
      </div>

      {/* 👇 NEW LINKS SECTION */}
      <div>
        <h4>Quick Links</h4>
        <p><Link to="/contact">Contact</Link></p>
        <p><Link to="/terms">Terms & Conditions</Link></p>
        <p><Link to="/refund-policy">Refund Policy</Link></p>
      </div>

    </footer>
  );
}