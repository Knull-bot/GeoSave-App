import client from "./db";

export const getEvents = async () => {
  try {
    const events = await client.query(
      "SELECT e.id, e.latitude, e.longitude, e.created_at, e.message, u.username FROM events e LEFT JOIN users u ON e.user_id = u.id;"
    );
    console.log(events);
    return events;
  } catch {
    throw new Error("Something went wrong");
  }
};
