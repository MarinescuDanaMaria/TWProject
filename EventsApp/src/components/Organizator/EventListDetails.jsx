import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ParticipantsTable from "./ParticipantsTable";

const EventDetails = () => {
  const { idGroup, idEvent } = useParams();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/organizer/group/${idGroup}/event/${idEvent}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        const data = await response.json();
        setEvent(data);

        const participantsResponse = await fetch(
          `http://localhost:8081/organizer/event/${idEvent}/participants`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!participantsResponse.ok) {
          throw new Error("Failed to fetch participants");
        }

        const participantsData = await participantsResponse.json();
        setParticipants(participantsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [idGroup, idEvent]);

  const handleExportCSV = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/organizer/event/${idEvent}/participants/csv`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.headers.get("content-type")?.includes("application/json")) {
        const data = await response.json();
        if (data.error) {
          alert(data.error);
          return;
        } else if (data.message) {
          alert(data.message);
          return;
        }
      }

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `participants_event_${idEvent}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        throw new Error("Failed to export CSV");
      }
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Failed to export CSV.");
    }
  };

  const handleExportPDF = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/organizer/event/${idEvent}/participants/pdf`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.headers.get("content-type")?.includes("application/json")) {
        const data = await response.json();
        if (data.error) {
          alert(data.error);
          return;
        } else if (data.message) {
          alert(data.message); 
          return;
        }
      }

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `participants_event_${idEvent}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        throw new Error("Failed to export PDF");
      }
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Nume Eveniment: <span className="text-yellow-500">{event.name}</span>
      </h1>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold text-gray-800">Descriere:</span>{" "}
        {event.description}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold text-gray-800">Status:</span>{" "}
        <span
          className={`${
            event.status === "OPEN" ? "text-green-600" : "text-blue-600"
          } font-medium`}
        >
          {event.status}
        </span>
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold text-gray-800">Începe:</span>{" "}
        {new Date(event.startTime).toLocaleString()}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold text-gray-800">Se termină:</span>{" "}
        {new Date(event.endTime).toLocaleString()}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <span className="font-semibold text-gray-800">
          Text Generat Automat:
        </span>{" "}
        {event.autoGeneratedText}
      </p>

      {event.qrCodeImageUrl && (
        <div className="mb-6 text-center">
          <img
            src={`http://localhost:8081${event.qrCodeImageUrl}`}
            alt="QR Code"
            className="inline-block w-40 h-40 object-cover rounded-lg border border-gray-300 shadow-sm"
          />
        </div>
      )}

      {participants.length > 0 && (
        <div className="flex flex-col items-center">
          <ParticipantsTable eventId={idEvent} />
        </div>
      )}

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleExportCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Export CSV
        </button>
        <button
          onClick={handleExportPDF}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
