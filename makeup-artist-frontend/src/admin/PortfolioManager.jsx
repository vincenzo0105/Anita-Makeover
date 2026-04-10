import { useEffect, useState } from "react";
import axios from "axios";
import getImageUrl from "../utils/getImageUrl";
export default function PortfolioManager() {
  const [images, setImages] = useState([]);

  // Fetch all images on load
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/portfolio`);
      setImages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Upload image
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/portfolio`,
        formData
      );

      setImages([...images, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete image
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/portfolio/${id}`);
      setImages(images.filter((img) => img._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
   <div className="portfolio-container">
  <h1>Portfolio Manager</h1>

  {/* Upload Section */}
  <div className="upload-box">
    <input type="file" onChange={handleUpload} />
    <p>Upload new portfolio image</p>
  </div>

  {/* Grid */}
  <div className="portfolio-grid">
    {images.map((img) => (
      <div key={img._id} className="portfolio-card">
        <img
              src={getImageUrl(img.image)} // ✅ Handles Cloudinary + local images
              alt="portfolio"
              className="portfolio-image"
              onError={(e) => {
                console.error("Image failed to load:", img.image);
                e.target.src = "/placeholder.png"; // Optional fallback
              }}
            />

        <button
          className="delete-btn"
          onClick={() => handleDelete(img._id)}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
</div>
  );
}