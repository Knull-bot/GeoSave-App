"use server";

async function sendLocation(latitude, longitude) {
  console.log("Location sent:", { latitude, longitude });
}

export { sendLocation };
