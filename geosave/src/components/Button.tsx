"use client";

import classes from "./Button.module.css";

export function SendButton() {
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
        body: JSON.stringify({ latitude, longitude }),
      });
    } catch {
      throw new Error("Failed to send location");
    }
  }

  return <button className={classes.button} onClick={handleClick}></button>;
}
