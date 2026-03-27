import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/admin/login",
      {
        email: email.trim(),
        password: password.trim(),
      }
    );

    localStorage.setItem("token", res.data.token);

    navigate("/admin/dashboard");

  } catch (err) {
    alert("Invalid credentials");
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

        <button type="submit">Login</button>

      </form>

    </div>
  );
}