const { Participant, Event, User } = require("../models");

exports.addParticipant = async (req, res) => {
  try {
    console.log("User din req:", req.user);
    const userId = req.user.userId;
    const { eventId } = req.params; // ID-ul utilizatorului din token-ul autentificat
    console.log("Cererea a ajuns la addParticipant.");
    console.log("Event ID:", req.params.eventId);
    console.log("User ID:", req.user.userId);
    // Verificăm dacă evenimentul există
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: "Evenimentul nu a fost găsit!" });
    }

    // Verificăm dacă utilizatorul este deja participant
    const existingParticipant = await Participant.findOne({
      where: { event_id: eventId, user_id: userId },
    });

    if (existingParticipant) {
      return res.status(200).json({
        message: "Deja participant la acest eveniment!",
        isParticipant: true,
      });
    }

    // Adăugăm utilizatorul la eveniment cu `confirmed` setat la `false`
    const participant = await Participant.create({
      event_id: eventId,
      user_id: userId,
      confirmed: false,
    });

    res
      .status(201)
      .json({ message: "Participant adăugat cu succes!", participant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare la adăugarea participantului." });
  }
};
exports.isParticipant = async (req, res) => {
    try {
      const userId = req.user.userId; // ID-ul utilizatorului extras din token
      const { eventId } = req.params; // ID-ul evenimentului din parametrii rutei
  
      // Caută dacă utilizatorul este deja participant
      const participant = await Participant.findOne({
        where: { event_id: eventId, user_id: userId },
      });
  
      // Returnează răspunsul cu starea `isParticipant`
      res.status(200).json({ isParticipant: !!participant });
    } catch (error) {
      console.error("Eroare la verificarea participării:", error);
      res.status(500).json({ error: "Eroare la verificarea participării." });
    }
  };
  exports.confirmParticipant = async (req, res) => {
    try {
      const { eventId } = req.params; // Extract the event ID from the URL
      const { qrData } = req.body; // Extract the QR code data from the request body
      const userId = req.user.userId; // Extract the user ID from the authenticated user
  
      console.log("QR Data:", qrData);
      console.log("Event ID:", eventId);
      console.log("User ID:", userId);
  
      // Validate that the QR data matches the event ID
      if (qrData !== eventId) {
        return res.status(400).json({ error: "Invalid QR Code for this event." });
      }
  
      // Check if the event exists
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found." });
      }
  
      // Check if the user is already a participant
      const participant = await Participant.findOne({
        where: { event_id: eventId, user_id: userId },
      });
  
      if (!participant) {
        return res.status(404).json({
          error: "You are not a participant of this event.",
        });
      }
  
      // Confirm the participation
      participant.confirmed = true;
      participant.confirmed_at = new Date();
      await participant.save();
  
      res.status(200).json({
        message: "Participation confirmed successfully!",
        participant,
      });
    } catch (error) {
      console.error("Error confirming participation:", error);
      res.status(500).json({ error: "An error occurred while confirming participation." });
    }
  };