"use client";

import { useState } from "react";
import MapWrapper from "./MapWrapper";
import classes from "./AllTasksClient.module.css";
import { SendButton } from "./Button";

type Props = {
  events: any[];
};

export default function AllTasksClient({ events }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedEvent = events.find((e) => e.id === selectedId) || null;

  return (
    <div className={classes.wrapper}>
      <aside className={classes.sidebar}>
        <h2 className={classes.title}>Events</h2>

        <ul className={classes.list}>
          {events.map((event) => (
            <li key={event.id} className={classes["list-item"]}>
              <button
                className={classes.button}
                onClick={() => setSelectedId(event.id)}
              >
                {event.message.slice(0, 30)}…
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className={classes.content}>
        {selectedEvent ? (
          <>
            <h2 className={classes.h2xl}>Event {selectedEvent.id}</h2>
            <div>
              <MapWrapper
                position={[
                  Number(selectedEvent.latitude),
                  Number(selectedEvent.longitude),
                ]}
                zoom={25}
              />
              <p>
                <strong>Message:</strong> {selectedEvent.message}
              </p>
            </div>

            <p>
              <strong>Date:</strong>
              {selectedEvent.created_at.toLocaleString("de-DE")}
            </p>
          </>
        ) : (
          <p className={classes.pworking}>Выбери событие слева…</p>
        )}
      </main>
    </div>
  );
}
