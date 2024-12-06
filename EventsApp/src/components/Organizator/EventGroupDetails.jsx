import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CustomEventCard from "../customComponents/customEventCard";

const EventGroupDetails = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funcția de încărcare a evenimentelor
  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:8081/organizer/group/${id}/events`);

      if (!response.ok) {
        throw new Error("Nu am reușit să obținem evenimentele");
      }

      const data = await response.json();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Apelăm funcția de obținere a evenimentelor la montarea componentei și după fiecare modificare
  useEffect(() => {
    fetchEvents();
  }, [id]);

  // Funcția de ștergere a unui eveniment
  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8081/organizer/event/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Nu s-a putut șterge evenimentul");
      }

      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error(error);
      alert("A apărut o eroare la ștergerea evenimentului");
    }
  };

  // Funcția de actualizare a unui eveniment (se apelează după ce este salvat)
  const handleEventUpdate = (updatedEvent) => {
    // După actualizare, refacem lista de evenimente
    fetchEvents();
  };

  if (loading) return <div>Se încarcă...</div>;
  if (error) return <div>Eroare: {error}</div>;

  return (
    <div>
      <h1>Detalii Grup de Evenimente</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {events.length > 0 ? (
          events.map((event) => (
            <CustomEventCard
              key={event.id}
              event={event}
              onDelete={handleDelete}
              onUpdate={handleEventUpdate} // Trimite funcția de actualizare
            />
          ))
        ) : (
          <p>Nu există evenimente pentru acest grup.</p>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to={`/organizer/add-event/${id}`}
          className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Adaugă Eveniment
        </Link>
      </div>
    </div>
  );
};

export default EventGroupDetails;
