"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const cookie = document.cookie
        .split(";")
        .find((row) => row.trim().startsWith("cookiesAccepted="));
      if (cookie) {
        setTimeout(() => setAccepted(cookie.split("=")[1] === "true"), 0);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof document !== "undefined") {
      document.cookie = "cookiesAccepted=true; path=/; max-age=31536000"; // 1 год
      setAccepted(true);
    }
  };

  const handleAclaim = () => {
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#222",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        zIndex: 1,
      }}
    >
      <span>
        Wir verwenden Cookies, um die Benutzererfahrung zu verbessern. Stimmen
        Sie der Verwendung von Cookies zu?
      </span>
      <button onClick={handleAccept} style={{ marginLeft: "1rem" }}>
        Accept
      </button>
      <button onClick={handleAclaim} style={{ marginLeft: "1rem" }}>
        Aclaim
      </button>
    </div>
  );
}
