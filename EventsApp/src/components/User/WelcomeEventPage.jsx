import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WelcomeEventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
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
  if (event.status === "SCHEDULED") {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-3xl p-10 bg-white shadow-2xl rounded-lg">
          <img
            src="http://localhost:8081/images/events_web.png"
            alt="Event Picture"
            className="mx-auto mb-10 w-64 h-64 object-contain"
          />
          <h1 className="text-6xl font-extrabold mb-8 text-gray-800">
            Event is scheduled
          </h1>
          <p className="text-2xl text-gray-600">Stay tuned for updates!</p>
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-3xl p-10 bg-white shadow-2xl rounded-lg">
        <img
          src="http://localhost:8081/images/events_web.png"
          alt="Event Picture"
          className="mx-auto mb-10 w-64 h-64 object-contain"
        />
        <h1 className="text-6xl font-extrabold mb-8 text-gray-800">
          WELCOME TO {event.name}
        </h1>

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
