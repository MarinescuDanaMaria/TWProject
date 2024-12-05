import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EventGroupDetails = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
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

    fetchEvents(); 
  }, [id]);

  if (loading) return <div>Se încarcă...</div>;
  if (error) return <div>Eroare: {error}</div>;

  return (
    <div>
      <h1>Detalii Grup de Evenimente</h1>

      <div>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <Link to={`/event/${event.id}`}>{event.name}</Link>
              </li>
            ))}
          </ul>
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
