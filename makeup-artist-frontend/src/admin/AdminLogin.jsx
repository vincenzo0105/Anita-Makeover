import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Check token validity
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) return;

    try {

      const decoded = jwtDecode(token);

      // Token still valid
      if (decoded.exp * 1000 > Date.now()) {
        navigate("/admin/dashboard");
      }

      // Token expired
      else {
        localStorage.removeItem("token");
      }

    } catch (error) {

      localStorage.removeItem("token");
    }

  }, []);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://makeup-artist-website-9q3p.onrender.com/admin/login",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/admin/dashboard");

    } catch (err) {

      console.error(err);

      alert("Invalid credentials or server error");
    }
  };

  return (
    <div className="admin-login">

      <form className="login-card" onSubmit={handleLogin}>

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}