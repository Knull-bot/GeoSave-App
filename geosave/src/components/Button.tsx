"use client";

import classes from "./Button.module.css";

type SendButtonProps = {
  userId: number | null;
};

export function SendButton({ userId }: SendButtonProps) {
  async function handleClick() {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );
      const { latitude, longitude } = position.coords;
      await fetch("/api/send-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude, userId }),
      });
    } catch {
      throw new Error("Failed to send location");
    }
  }

  return <button className={classes.button} onClick={handleClick}></button>;
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
      Logout
    </button>
  );
}
