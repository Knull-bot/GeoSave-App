import { getEvents } from "@/src/lib/events";
import AllTasksClient from "@/src/components/AllTasksClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AllTasksPage() {
  "use server";

  const eventsDataLast = await getEvents();

  return <AllTasksClient events={eventsDataLast} />;
}
