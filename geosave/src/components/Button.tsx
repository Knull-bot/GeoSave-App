"use client";

import classes from "./Button.module.css";
import { useState } from "react";

type SendButtonProps = {
  userId: number | null;
};

export function SendButton({ userId }: SendButtonProps) {
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  async function handleClick() {
    setMessage(null);
    setError(false);
    setLoading(true);
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );
      const { latitude, longitude } = position.coords;
      await fetch("/api/send-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude, userId }),
      });
      setMessage("Standort erfolgreich gesendet");
    } catch {
      setError(true);
      setMessage("Fehler beim Senden des Standorts");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className={classes.button}
        onClick={handleClick}
        disabled={loading}
      ></button>
      {message && (
        <div className={classes.overlay}>
          <div className={classes.modal}>
            <p className={error ? classes.error : classes.success}>{message}</p>
            <button onClick={() => setMessage(null)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}

export function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/";
  }

  return (
    <button className={classes.btn} onClick={handleLogout}>
      Abmelden
    </button>
  );
}
