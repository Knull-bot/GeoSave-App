import { getEvents } from "@/src/lib/events";
import AllTasksClient from "@/src/components/AllTasksClient";

export default async function AllTasksPage() {
  const eventsData = await getEvents();
  const events = eventsData.rows;

  return <AllTasksClient events={events} />;
}
