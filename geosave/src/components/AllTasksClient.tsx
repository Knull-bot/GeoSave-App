"use client";

import { useState, useEffect } from "react";
import MapWrapper from "./MapWrapper";
import classes from "./AllTasksClient.module.css";
import { supabase } from "../lib/supabaseClient";

type Event = {
  id: number;
  latitude: number;
  longitude: number;
  created_at: string;
  message: string;
  username?: string;
};

export default function AllTasksClient() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        console.error("Error fetching events:", error);
        return;
      }
      setEvents(data ?? []);
    };
    fetchEvents();

    const channel = supabase.channel("events_changes", {
      config: { private: false },
    });

    const handleInsert = (msg: any) => {
      const newEvent: Event = msg.payload?.new ?? msg.new ?? msg.record ?? msg;
      if (!newEvent?.id) return;
      setEvents((prev) => [
        newEvent,
        ...prev.filter((e) => e.id !== newEvent.id),
      ]);
    };

    const handleUpdate = (msg: any) => {
      const updatedEvent: Event =
        msg.payload?.new ?? msg.new ?? msg.record ?? msg;
      if (!updatedEvent?.id) return;
      setEvents((prev) =>
        prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)),
      );
    };

    const handleDelete = (msg: any) => {
      const deletedEvent: Event = msg.payload?.old ?? msg.old ?? msg;
      if (!deletedEvent?.id) return;
      setEvents((prev) => prev.filter((e) => e.id !== deletedEvent.id));
    };

    channel.on("broadcast", { event: "INSERT" }, handleInsert);
    channel.on("broadcast", { event: "UPDATE" }, handleUpdate);
    channel.on("broadcast", { event: "DELETE" }, handleDelete);

    channel.subscribe((status, err) => {
      if (status === "SUBSCRIBED")
        console.log("Realtime subscribed to events_changes");
      if (err) console.error("Subscribe error", err);
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const itemsPerPage = 5;

  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const selectedEvent = sortedEvents.find((e) => e.id === selectedId) || null;

  return (
    <div className={classes.wrapper}>
      <aside className={classes.sidebar}>
        <h2 className={classes.title}>Unfälle</h2>

        <ul className={classes.list}>
          {currentEvents.map((event) => (
            <li key={event.id} className={classes["list-item"]}>
              <button
                className={classes.button}
                onClick={() => setSelectedId(event.id)}
              >
                {event.username}
                {" - "}
                {new Date(event.created_at).toLocaleString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
            ),
          )}
        </div>
      </aside>

      <main className={classes.content}>
        {selectedEvent ? (
          <>
            <h2 className={classes.h2xl}>Unfall # {selectedEvent.id}</h2>
            <div>
              <MapWrapper
                position={[
                  Number(selectedEvent.latitude),
                  Number(selectedEvent.longitude),
                ]}
                zoom={25}
              />
              <p>
                <strong>Nachricht:</strong> {selectedEvent.message}
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
          <p className={classes.pworking}>Wähle ein Ereignis links aus...</p>
        )}
      </main>
    </div>
  );
}
