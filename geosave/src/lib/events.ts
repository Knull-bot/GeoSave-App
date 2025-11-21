import { unstable_cache as nextCache } from "next/cache";
import client from "./db";

export const getEvents = async () => {
  try {
    const events = await client.query("SELECT * FROM events");
    console.log(events);
    return events;
  } catch {
    throw new Error("Something was wrong");
  }
};
