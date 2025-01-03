const { Participant, Event, User } = require("../models");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");

exports.addParticipant = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { eventId } = req.params; 
 
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: "Evenimentul nu a fost găsit!" });
    }

    const existingParticipant = await Participant.findOne({
      where: { event_id: eventId, user_id: userId },
    });

    if (existingParticipant) {
      return res.status(200).json({
        message: "Deja participant la acest eveniment!",
        isParticipant: true,
      });
    }

    const participant = await Participant.create({
      event_id: eventId,
      user_id: userId,
      confirmed: false,
    });

    res.status(200)
      .json({ message: "Participant adăugat cu succes!", participant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare la adăugarea participantului." });
  }
};

exports.isParticipant = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { eventId } = req.params; 

    const participant = await Participant.findOne({
      where: { event_id: eventId, user_id: userId },
    });

    res.status(200).json({
      isParticipant: !!participant,
      isConfirmedParticipant: participant ? !!participant.confirmed : false,
    });
  } catch (error) {
    console.error("Eroare la verificarea participării:", error);
    res.status(500).json({ error: "Eroare la verificarea participării." });
  }
};

exports.confirmParticipant = async (req, res) => {
  try {
    const { eventId } = req.params; 
    const { qrData } = req.body; 
    const userId = req.user.userId; 

    if (qrData !== eventId) {
      return res.status(400).json({ error: "Invalid QR Code for this event." });
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    const participant = await Participant.findOne({
      where: { event_id: eventId, user_id: userId },
    });

    if (!participant) {
      return res.status(404).json({
        error: "You are not a participant of this event.",
      });
    }

    participant.confirmed = true;
    participant.confirmed_at = new Date();
    await participant.save();

    res.status(200).json({
      message: "Participation confirmed successfully!",
      participant,
    });
  } catch (error) {
    console.error("Error confirming participation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while confirming participation." });
  }
};

exports.getParticipantsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const participants = await Participant.findAll({
      where: { event_id: eventId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "first_name", "last_name"], 
        },
      ],
    });

    if (!participants.length) {
      return res
        .status(200)
        .json({ message: "Nu există participanți la acest eveniment." });
    }

    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: "Eroare la obținerea participanților." });
  }
};

exports.exportParticipantsCSV = async (req, res) => {
  try {
    const { eventId } = req.params;

    const participants = await Participant.findAll({
      where: { event_id: eventId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "first_name", "last_name"],
        },
      ],
    });

    if (!participants.length) {
      return res
        .status(200)
        .json({ message: "Nu există participanți la acest eveniment." });
    }

    const csvData = participants.map((p) => ({
      ID: p.user.id,
      Email: p.user.email,
      Name: `${p.user.first_name} ${p.user.last_name}`,
      Confirmed: p.confirmed ? "Yes" : "No",
      "Confirmation Date": p.confirmed_at || "Not Confirmed",
    }));

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(csvData);

    res.header("Content-Type", "text/csv");
    res.attachment(`participants_event_${eventId}.csv`);
    res.status(200).send(csv);
  } catch (error) {
    console.error("Eroare la exportarea CSV:", error);
    res
      .status(500)
      .json({ error: "Eroare la exportarea participanților în CSV." });
  }
};

exports.exportParticipantsPDF = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId, {
      attributes: ["name", "description", "startTime", "endTime"],
    });

    if (!event) {
      return res.status(404).json({ error: "Evenimentul nu a fost găsit." });
    }

    const participants = await Participant.findAll({
      where: { event_id: eventId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "first_name", "last_name"],
        },
      ],
    });

    if (!participants.length) {
      return res
        .status(200)
        .json({ message: "Nu există participanți la acest eveniment." });
    }

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=participants_event_${event.name.replace(
        /\s+/g,
        "_"
      )}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(18).text(`Event: ${event.name}`, { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Description: ${event.description}`);
    doc.text(`Start Time: ${new Date(event.startTime).toLocaleString()}`);
    doc.text(`End Time: ${new Date(event.endTime).toLocaleString()}`);
    doc.moveDown();

    doc.fontSize(16).text("Participants:", { underline: true });
    doc.moveDown();

    participants.forEach((p, index) => {
      doc
        .fontSize(12)
        .text(
          `${index + 1}. ${p.user.first_name} ${p.user.last_name} | Email: ${
            p.user.email
          } | Confirmed: ${p.confirmed ? "Yes" : "No"} | Confirmation Date: ${
            p.confirmed_at || "Not Confirmed"
          }`
        );
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error("Eroare la exportarea PDF:", error);
    res
      .status(500)
      .json({ error: "Eroare la exportarea participanților în PDF." });
  }
};

exports.exportGroupParticipantsCSV = async (req, res) => {
  try {
    const { groupId } = req.params;

    const events = await Event.findAll({
      where: { idGroup: groupId },
      attributes: ["id", "name"], 
    });

    if (!events.length) {
      return res.json({ error: "Nu există evenimente în acest grup." });
    }

    const eventIds = events.map((event) => event.id);

    const participants = await Participant.findAll({
      where: { event_id: eventIds },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "first_name", "last_name"],
        },
        {
          model: Event,
          as: "event",
          attributes: ["name"], 
        },
      ],
    });

    if (!participants.length) {
      return res.json({ error: "Nu există participanți în acest grup." });
    }

    const csvData = participants.map((p) => ({
      ID: p.user.id,
      Email: p.user.email,
      Name: `${p.user.first_name} ${p.user.last_name}`,
      Event: p.event.name,
      Confirmed: p.confirmed ? "Yes" : "No",
      "Confirmation Date": p.confirmed_at || "Not Confirmed",
    }));

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(csvData);

    res.header("Content-Type", "text/csv");
    res.attachment(`group_${groupId}_participants.csv`);
    res.status(200).send(csv);
  } catch (error) {
    console.error("Eroare la exportarea CSV pentru grup:", error);
    res
      .status(500)
      .json({ error: "Eroare la exportarea participanților în CSV." });
  }
};
