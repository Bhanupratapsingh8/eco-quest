import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Hook to use auth
export const useAuth = () => useContext(AuthContext);

// Backend URL
const BASE_URL = "https://eco-quest-backend-mh98.onrender.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // =========================
  // LOGIN FUNCTION (FIXED)
  // =========================
  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // ❗ If backend returns error
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user in state
      setUser(data.user);

      // Save token (if exists)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;

    } catch (error) {
      console.error("Login Error:", error);
      throw error; // important for Login.js catch block
    }
  };

  // =========================
  // LOGOUT FUNCTION
  // =========================
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // =========================
  // PROVIDER
  // =========================
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
