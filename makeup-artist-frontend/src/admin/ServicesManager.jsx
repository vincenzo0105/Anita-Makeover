import { useEffect, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";
export default function ServicesManage() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
    duration: "",
    available: true
  });

  const fetchServices = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/services`);
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const updateService = async (id, updatedData) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });

    fetchServices();
  };

  const addService = async () => {
  const formData = new FormData();

  formData.append("name", newService.name);
  formData.append("price", newService.price);
  formData.append("description", newService.description);
  formData.append("duration", newService.duration);
  formData.append("available", newService.available);
  formData.append("features", newService.features);
  formData.append("image", newService.image);

  await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/services`, {
    method: "POST",
    body: formData
  });

  fetchServices();
};

 return (
  <div>

    <h1>Services</h1>

   <div className="add-service-card">

  <h3>Add New Service</h3>

  <div className="form-grid">

    <input
      placeholder="Service Name"
      onChange={(e) =>
        setNewService({ ...newService, name: e.target.value })
      }
    />

    <input
      type="number"
      placeholder="Price (₹)"
      onChange={(e) =>
        setNewService({ ...newService, price: e.target.value })
      }
    />

    <input
      placeholder="Duration (e.g. 60 mins)"
      onChange={(e) =>
        setNewService({ ...newService, duration: e.target.value })
      }
    />

    <input
      placeholder="Features (comma separated)"
      onChange={(e) =>
        setNewService({ ...newService, features: e.target.value })
      }
    />

    <textarea
      placeholder="Description"
      onChange={(e) =>
        setNewService({ ...newService, description: e.target.value })
      }
      className="full-width"
    />

    <input
      type="file"
      onChange={(e) =>
        setNewService({ ...newService, image: e.target.files[0] })
      }
      className="full-width"
    />

  </div>

  <div className="form-actions">

    <label className="checkbox">
      <input
        type="checkbox"
        checked={newService.available}
        onChange={(e) =>
          setNewService({ ...newService, available: e.target.checked })
        }
      />
      Available
    </label>

    <button className="add-btn" onClick={addService}>
      + Add Service
    </button>

  </div>

</div>

    {/* 🔁 EXISTING SERVICES */}
    {services.map((s) => (
      <div key={s._id} className="service-card-admin">

        <h3>Edit Service</h3>

        <div className="form-grid">

          <div>
            <label>Name</label>
            <input
              value={s.name}
              onChange={(e) =>
                updateService(s._id, { name: e.target.value })
              }
            />
          </div>

          <div>
            <label>Price</label>
            <input
              type="number"
              value={s.price}
              onChange={(e) =>
                updateService(s._id, { price: e.target.value })
              }
            />
          </div>

          <div>
            <label>Duration</label>
            <input
              value={s.duration || ""}
              onChange={(e) =>
                updateService(s._id, { duration: e.target.value })
              }
            />
          </div>

          <div>
            <label>Features</label>
            <input
              value={(s.features || []).join(",")}
              onChange={(e) =>
                updateService(s._id, {
                  features: e.target.value.split(",")
                })
              }
            />
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <label>Description</label>
            <textarea
              value={s.description || ""}
              onChange={(e) =>
                updateService(s._id, { description: e.target.value })
              }
            />
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <label>Current Image</label>
            {s.image ? (
  <img
    src={getImageUrl(s.image)}
    alt="Current Service"
    style={{
      width: "120px",
      height: "120px",
      objectFit: "cover",
      borderRadius: "8px",
      border: "1px solid #ddd",
      marginTop: "10px",
    }}
  />
) : (
  <p style={{ color: "#888" }}>No image available</p>
)}
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <label>Change Image</label>
            <input
              type="file"
              onChange={(e) => {
                const formData = new FormData();
                formData.append("image", e.target.files[0]);

                fetch(`${import.meta.env.VITE_API_BASE_URL}/api/services/${s._id}`, {
                  method: "PUT",
                  body: formData
                }).then(fetchServices);
              }}
            />
          </div>

        </div>

        <div className="service-actions">

          <label>
            <input
              type="checkbox"
              checked={s.available}
              onChange={(e) =>
                updateService(s._id, { available: e.target.checked })
              }
            />
            Available
          </label>

          <button
  className="delete-service-btn"
  style={{
    background: "red",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }}
  onClick={async () => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/services/${s._id}`, {
      method: "DELETE"
    });
    fetchServices();
  }}
>
  Delete
</button>

        </div>

      </div>
    ))}

  </div>
);
}