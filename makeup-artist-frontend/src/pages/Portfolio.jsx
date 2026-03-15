import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import img1 from "../assets/make1.jpeg";
import img2 from "../assets/mamta.jpeg";
import img3 from "../assets/insta4a.png";
import img4 from "../assets/certificate.jpeg";
import img5 from "../assets/make4.jpeg";
import img6 from "../assets/make5.jpeg";

export default function Portfolio() {

  const navigate = useNavigate();

  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <>
      <Navbar />

      <section className="portfolio-header">
        <h1>Portfolio Gallery</h1>
        <p>
          A curated collection of professional makeup artistry,
          ranging from delicate bridal glows to bold editorial statements.
        </p>
      </section>

      <div className="portfolio-grid">
        {images.map((img, index) => (
          <div key={index} className="portfolio-item">
            <img src={img} alt="Makeup work" />
          </div>
        ))}
      </div>

      <section className="portfolio-cta">
        <h2>Meet the Artist Behind the Magic</h2>
        <p>
          Discover the passion, creativity, and experience that bring every look to life.
        </p>

        <div>
          <button
            className="primary-btn"
            onClick={() => navigate("/about")}
          >
            Know the Artist
          </button>
        </div>
      </section>
    </>
  );
}