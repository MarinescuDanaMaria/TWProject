import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DetailsEvent() {
  const { id } = useParams();  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8081/event/${id}`);

        if (!response.ok) {
          throw new Error("Nu am putut încărca evenimentul!");
        }

        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <div>Se încarcă...</div>;
  }

  if (error) {
    return <div>Erroare: {error}</div>;
  }

  if (!event) {
    return <div>Evenimentul nu a fost găsit!</div>;
  }

  return (
    <div className="event-details">
      <h2>{event.name}</h2>
      <p><strong>Descriere:</strong> {event.description}</p>
      <p><strong>Data de început:</strong> {new Date(event.startTime).toLocaleString()}</p>
      <p><strong>Data de sfârșit:</strong> {new Date(event.endTime).toLocaleString()}</p>
      <p><strong>Status:</strong> {event.status}</p>
    </div>
  );
}

export default DetailsEvent;
