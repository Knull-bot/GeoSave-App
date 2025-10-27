"use client";

import { sendLocation } from "@/actions/sendLocation";

export default function Button({ children }) {
  async function handleClick() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      sendLocation(latitude, longitude);
    });
  }

  return <button onClick={handleClick}>{children}</button>;
}
