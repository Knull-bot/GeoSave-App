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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const selectedEvent = sortedEvents.find((e) => e.id === selectedId) || null;

  return (
    <div className={classes.wrapper}>
      <aside className={classes.sidebar}>
        <h2 className={classes.title}>Events</h2>

        <ul className={classes.list}>
          {currentEvents.map((event) => (
            <li key={event.id} className={classes["list-item"]}>
              <button
                className={classes.button}
                onClick={() => setSelectedId(event.id)}
              >
                {event.message.slice(0, 30)}
              </button>
            </li>
          ))}
        </ul>
        <div className={classes.pagination}>
          {Array.from(
            { length: Math.ceil(events.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={i + 1 === currentPage ? classes.activePage : ""}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
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
              {new Date(selectedEvent.created_at).toLocaleString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </>
        ) : (
          <p className={classes.pworking}>Выбери событие слева…</p>
        )}
      </main>
    </div>
  );
}
