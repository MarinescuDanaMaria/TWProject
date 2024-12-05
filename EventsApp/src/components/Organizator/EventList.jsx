import React, { useEffect, useState } from "react";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch evenimente din backend
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8081/organizer/events");
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events); // Presupunem că backend-ul returnează evenimentele în `data.events`
        } else {
          console.error("Eroare la obținerea evenimentelor");
        }
      } catch (error) {
        console.error("Eroare la conectarea cu backend-ul:", error);
      }
    };

    fetchEvents();
  }, []); // Se execută o singură dată la montarea componentului

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Event List</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li
              key={event.id}
              className="mb-4 border p-4 rounded-md shadow-sm bg-gray-50"
            >
              <h3 className="font-semibold text-lg">{event.name}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Status:</strong> {event.status}
              </p>
              <p>
                <strong>Start Time:</strong>{" "}
                {new Date(event.startTime).toLocaleString()}
              </p>
              {event.endTime && (
                <p>
                  <strong>End Time:</strong>{" "}
                  {new Date(event.endTime).toLocaleString()}
                </p>
              )}
              <p>
                <strong>Group ID:</strong> {event.idGroup}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">Nu există evenimente disponibile.</p>
      )}
    </div>
  );
}

export default EventList;
