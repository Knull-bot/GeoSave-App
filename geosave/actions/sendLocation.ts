"use server";

async function sendLocation(latitude: number, langitude: number) {
  await fetch("http://localhost:5050/get-location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ latitude, langitude }),
  });
}

export { sendLocation };
