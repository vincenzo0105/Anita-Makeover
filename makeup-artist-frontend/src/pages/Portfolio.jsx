import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import getImageUrl from "../utils/getImageUrl";
export default function Portfolio() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/portfolio`)
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, []);

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
        {images.map((item) => (
          <div key={item._id} className="portfolio-item">
           <img
  src={getImageUrl(item.image)}
  alt="Portfolio"
  className="w-full h-64 object-cover rounded-lg"
/>
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