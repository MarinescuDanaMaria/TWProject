import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Importă `useNavigate`

function WebEventDetails() {
  const { id } = useParams(); // Preluăm id-ul din URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Folosește `useNavigate` pentru redirecționare
  const isLoggedIn = localStorage.getItem("authToken"); // Verifică dacă utilizatorul este logat (de exemplu, căutăm token-ul în `localStorage`)

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8081/event-web/${id}`); // Apelează API-ul pentru detalii
        if (!response.ok) {
          throw new Error("Failed to fetch event details.");
        }
        const eventData = await response.json();
        setEvent(eventData); // Setează datele evenimentului
      } catch (error) {
        setError(error.message); // Setează mesajul de eroare
      } finally {
        setLoading(false); // Finalizează încărcarea
      }
    };

    fetchEventDetails(); // Apelează funcția pentru a obține detaliile
  }, [id]);

  // Verifică dacă utilizatorul este logat
  const handleJoinEvent = () => {
    if (!isLoggedIn) {
      // Dacă nu este logat, redirecționează la pagina de login
      navigate("/login");  // Asigură-te că ai ruta pentru login configurată
    } else {
      // Codul pentru a participa la eveniment (ex: trimite un request API pentru participare)
      console.log("User is logged in. Participating in the event...");
      // Aici poți adăuga logica pentru a adăuga utilizatorul la eveniment
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{event.name}</h1>
      <p className="text-lg mb-4">{event.description}</p>
      <p className="text-sm text-gray-500">Start: {new Date(event.startTime).toLocaleString()}</p>
      <p className="text-sm text-gray-500">End: {new Date(event.endTime).toLocaleString()}</p>
      <p
        className={`mt-2 font-semibold ${event.status === "OPEN" ? "text-green-500" : "text-red-500"}`}
      >
        Status: {event.status}
      </p>
      <button 
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
        onClick={handleJoinEvent}
      >
        {isLoggedIn ? "Join Event" : "Log in to Participate"}
      </button>
    </div>
  );
}

export default WebEventDetails;
