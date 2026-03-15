import { useState } from "react";

export default function PortfolioManager() {

  const [images, setImages] = useState([]);

  const handleUpload = (e) => {

    const file = URL.createObjectURL(e.target.files[0]);

    setImages([...images, file]);
  };

  return (
    <div>

      <h1>Portfolio Manager</h1>

      <input type="file" onChange={handleUpload} />

      <div className="portfolio-grid">

        {images.map((img, index) => (
          <img key={index} src={img} alt="portfolio" />
        ))}

      </div>

    </div>
  );
}