import insta1 from "../assets/insta1.png";
import insta2 from "../assets/logo.png";
import insta3 from "../assets/insta3a.png";
import insta4 from "../assets/insta4a.png";

export default function Instagram() {
  return (
    <section className="instagram">
      <h2>Latest from Instagram</h2>

      <div className="insta-grid">
        <div className="insta-img">
          <img src={insta1} alt="Bridal makeup 1" />
        </div>

        <div className="insta-img">
          <img src={insta2} alt="Bridal makeup 2" />
        </div>

        <div className="insta-img">
          <img src={insta3} alt="Bridal makeup 3" />
        </div>

        <div className="insta-img">
          <img src={insta4} alt="Bridal makeup 4" />
        </div>
      </div>
    </section>
  );
}