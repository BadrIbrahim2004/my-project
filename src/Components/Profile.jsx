import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#111",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}>
      <div
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}>
        {/* صورة بروفايل افتراضية */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff0000, #0000ff)",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            fontWeight: "bold",
            color: "#fff",
          }}>
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h2 style={{ marginBottom: "20px" }}>👤 {user.name}</h2>

        <p style={{ marginBottom: "10px", fontSize: "16px" }}>
          <strong>Email:</strong> {user.email}
        </p>

        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #ff0000, #0000ff)",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onClick={() => navigate("/")}>
          ⬅️ Back to Home
        </button>
      </div>
    </div>
  );
}
