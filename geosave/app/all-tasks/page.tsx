import { getEvents } from "@/src/lib/events";
import AllTasksClient from "@/src/components/AllTasksClient";

export default async function AllTasksPage() {
  "use server";
  const eventsData = await getEvents();

  return <AllTasksClient events={eventsData} />;
}
