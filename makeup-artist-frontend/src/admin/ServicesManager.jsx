import { useState } from "react";

export default function ServicesManager() {

  const [services, setServices] = useState([
    { id: 1, name: "Bridal Makeup", price: 250 },
    { id: 2, name: "Evening Glam", price: 120 }
  ]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addService = () => {

    const newService = {
      id: Date.now(),
      name,
      price
    };

    setServices([...services, newService]);
    setName("");
    setPrice("");
  };

  return (
    <div>

      <h1>Manage Services</h1>

      <div className="service-form">
        <input
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={addService}>Add Service</button>
      </div>

      <ul className="service-list">
        {services.map((s) => (
          <li key={s.id}>
            {s.name} - ${s.price}
          </li>
        ))}
      </ul>

    </div>
  );
}