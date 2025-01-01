import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WelcomeEventPage() {
  const { id } = useParams(); // Extract event ID from the route
  const [event, setEvent] = useState(null); // Store event details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Handle errors

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Fetch event details
        const response = await fetch(`http://localhost:8081/event-web/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            "Failed to fetch event details. You may not have access."
          );
        }

        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (

    <div className="h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center max-w-3xl p-10 bg-white shadow-2xl rounded-lg">
      {/* Larger Image */}
      <img
        src="http://localhost:8081/images/events_web.png"
        alt="Event Picture"
        className="mx-auto mb-10 w-64 h-64 object-contain" // Increased width and height
      />
  
      {/* Welcome Text */}
      <h1 className="text-6xl font-extrabold mb-8 text-gray-800">WELCOME TO {event.name}</h1>
  
      {/* Event End Time */}
      <p className="text-2xl mb-6 text-gray-600">
        The event will end at:{" "}
        <span className="font-bold text-gray-900">
          {new Date(event.endTime).toLocaleString()}
        </span>
      </p>
    </div>
  </div>
  
  );
}

export default WelcomeEventPage;
