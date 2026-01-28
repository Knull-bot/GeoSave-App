import { getEvents } from "@/src/lib/events";
import AllTasksClient from "@/src/components/AllTasksClient";

export default async function AllTasksPage() {
  const events = await getEvents();

  return <AllTasksClient events={events} />;
}
