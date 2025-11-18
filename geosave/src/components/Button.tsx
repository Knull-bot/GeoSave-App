"use client";

type ButtonProps = {
  children: React.ReactNode;
};

export function SendButton({ children }: ButtonProps) {
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

  return <button onClick={handleClick}>{children}</button>;
}
