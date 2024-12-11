import React, { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState([]);  // State pentru a păstra datele
  const [loading, setLoading] = useState(true);  // State pentru a gestiona starea de încărcare

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8081/event-groups/grouped-by-organizer"); // Apelul API
        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }
        const result = await response.json();
        setData(result);  // Setează datele obținute de la API
      } catch (error) {
        console.error("Error fetching events:", error);  // Log error dacă apare o problemă
      } finally {
        setLoading(false);  // Schimbă starea de încărcare la false după ce datele sunt obținute
      }
    };

    fetchEvents(); // Apelul funcției pentru a obține datele
  }, []);  // `[]` asigură că funcția este apelată o singură dată, la montarea componentei

  // If loading, display loading message
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;  // Mesaj de încărcare
  }

  // If data is empty or not an array, show no events message
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-center py-10">No events available.</div>;  // Mesaj dacă nu sunt date disponibile
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Events by Organizer</h1>
      {data.map((userData, index) => {
        const userKey = userData.user.id || `user-${index}`; // Fallback pentru id-ul utilizatorului
        return (
          <div key={userKey} className="mb-8">
            {/* Afișăm numele organizatorului */}
            <h2 className="text-xl font-semibold text-blue-600 mb-4">{userData.user.first_name} {userData.user.last_name}</h2>
            {/* Iterăm prin grupurile de evenimente */}
            {userData.eventGroups.map((eventGroup, groupIndex) => {
              const groupKey = eventGroup.id || `eventGroup-${groupIndex}`;  // Fallback pentru id-ul grupului
              return (
                <div key={groupKey} className="mb-6">
                  <h3 className="text-lg font-semibold">{eventGroup.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Verificăm dacă există evenimente înainte de a le itera */}
                    {Array.isArray(eventGroup.events) && eventGroup.events.length > 0 ? (
                      eventGroup.events.map((event, eventIndex) => {
                        const eventKey = event.id || `event-${eventIndex}`; // Fallback pentru id-ul evenimentului
                        return (
                          <div key={eventKey} className="bg-white shadow-md rounded-lg p-4">
                            <h4 className="text-lg font-bold">{event.name}</h4>
                            <p className="text-gray-600">{event.description}</p>
                            <p className="text-sm text-gray-500">
                              Start: {new Date(event.startTime).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              End: {new Date(event.endTime).toLocaleString()}
                            </p>
                            <p
                              className={`mt-2 font-semibold ${event.status === "OPEN" ? "text-green-500" : "text-red-500"}`}
                            >
                              {event.status}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-gray-500">No events available for this group.</div>  // Mesaj pentru grupuri fără evenimente
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
