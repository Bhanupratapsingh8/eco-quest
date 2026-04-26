import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await postData("/api/auth/login", form);

      // ❌ login failed
      if (!res || !res.success) {
        setError(res?.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ save token (VERY IMPORTANT)
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      // ✅ save user (optional but good)
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      // ✅ redirect (MAIN FIX)
      navigate("/dashboard");

    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2>Login Page ✅</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
