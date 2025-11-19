import { SendButton } from "@/src/components/Button";

import { getEvents } from "../lib/events";
import MapWrapper from "@/src/components/MapWrapper";

export default async function Home() {
  const events = await getEvents();
  console.log(events.rows[0]);

  return (
    <main>
      <div>
        <h1>Send location</h1>
        <SendButton>Pin Location</SendButton>
      </div>
      <div>
        <h3>Your location:</h3>
        {events.rows[0] && (
          <div>
            <MapWrapper
              position={[events.rows[0].latitude, events.rows[0].longitude]}
              zoom={25}
            />
            <p>{events.rows[0].message}</p>
          </div>
        )}
        {!events.rows[0] && <p>There is no situasions</p>}
      </div>
    </main>
  );
}
