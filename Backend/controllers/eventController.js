const { Event, EventGroup, QrCode, Participant } = require("../models");
const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");
const moment = require("moment-timezone");

exports.addEvent = async (req, res) => {
  try {
    const { name, description, startTime, endTime } = req.body;
    const { groupId } = req.params;

    if (!name || !description || !startTime || !groupId) {
      return res
        .status(400)
        .json({ error: "Toate câmpurile obligatorii trebuie completate!" });
    }

    const group = await EventGroup.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ error: "Grupul nu a fost găsit!" });
    }

    const autoGeneratedText = `Event-${name
      .replace(/\s+/g, "-")
      .toLowerCase()}-${Math.floor(Math.random() * 1000)}`;
    const adjustedStartTime = new Date(
      new Date(startTime).getTime() + 2 * 60 * 60 * 1000
    );
    const adjustedEndTime = new Date(
      new Date(endTime).getTime() + 2 * 60 * 60 * 1000
    );
    const now = moment().tz("Europe/Bucharest");

    let event;
    if (adjustedStartTime > now) {
      event = await Event.create({
        name,
        description,
        startTime: adjustedStartTime,
        endTime: adjustedEndTime,
        status: "SCHEDULED",
        idGroup: groupId,
        organizerId: req.user.id,
        autoGeneratedText,
      });
    } else {
      event = await Event.create({
        name,
        description,
        startTime: adjustedStartTime,
        endTime: adjustedEndTime,
        idGroup: groupId,
        organizerId: req.user.id,
        autoGeneratedText,
      });
    }

    const imagesDir = path.join(__dirname, "../images");
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
    }
    const eventUrl = `http://localhost:8081/event/${event.id}`;
    const imagePath = path.join(__dirname, "../images", `${event.id}.png`);

    await QRCode.toFile(imagePath, eventUrl, {
      type: "png",
      width: 500, // Dimensiune mai mare
      margin: 2, // Spațiu alb redus
      errorCorrectionLevel: "H", // Nivel înalt de corecție a erorilor
    });

    await QrCode.create({
      event_id: event.id,
      qr_code: eventUrl,
      image_url: `/images/${event.id}.png`,
    });

    await event.save();

    res.status(201).json({ message: "Eveniment creat cu succes!", event });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Eroare la crearea evenimentului", details: error });
  }
};

exports.getEventDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id, {
      include: [
        {
          model: QrCode,
          as: "qrCode", // Asigură-te că aliasul este corect
          attributes: ["image_url"],
        },
      ],
    });

    if (!event) {
      return res.status(404).json({ error: "Evenimentul nu a fost găsit!" });
    }

    res.status(200).json({
      ...event.toJSON(),
      qrCodeImageUrl: event.qrCode ? event.qrCode.image_url : null,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Eroare la obținerea detaliilor evenimentului!" });
  }
};

exports.getFilteredEventGroups = async (req, res) => {
  try {
    const { organizerId, searchQuery } = req.query;

    const whereOrganizer = organizerId !== "All" ? { organizerId } : {};
    const whereEventName = searchQuery
      ? { name: { [Op.iLike]: `%${searchQuery}%` } }
      : {};

    const eventGroups = await EventGroup.findAll({
      where: whereOrganizer,
      include: [
        {
          model: Event,
          as: "events",
          where: whereEventName,
        },
        {
          model: User,
          as: "organizer",
        },
      ],
    });

    if (!eventGroups.length) {
      return res.status(404).json({ error: "No matching event groups found!" });
    }

    res.status(200).json(eventGroups);
  } catch (error) {
    console.error("Error filtering event groups:", error);
    res.status(500).json({ error: "An error occurred while filtering data." });
  }
};

exports.getEventsByGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const events = await Event.findAll({
      where: { idGroup: id },
    });

    if (!events.length) {
      return res.json({
        messageNotFound: "Nu au fost găsite evenimente pentru acest grup!",
      });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare la obținerea evenimentelor!" });
  }
};
exports.showEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ error: "Evenimentul nu a fost găsit!" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Eroare la obținerea detaliilor evenimentului!" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: "Evenimentul nu a fost găsit!" });
    }

    const qrCode = await QrCode.findOne({ where: { event_id: id } });
    if (qrCode) {
      const imagePath = path.join(__dirname, "..", qrCode.image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      await qrCode.destroy();
    }

    await event.destroy();

    res.status(200).json({ message: "Evenimentul a fost șters cu succes!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare la ștergerea evenimentului!" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, startTime, endTime } = req.body;

    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ error: "Evenimentul nu a fost găsit!" });
    }

    event.name = name || event.name;
    event.description = description || event.description;
    event.startTime =
      new Date(
        new Date(startTime).getTime() + 2 * 60 * 60 * 1000
      ).toISOString() || event.startTime;
    event.endTime =
      new Date(
        new Date(endTime).getTime() + 2 * 60 * 60 * 1000
      ).toISOString() || event.endTime;

    const now = moment().tz("Europe/Bucharest");

    if (event.startTime <= now && event.endTime >= now) {
      event.status = "OPEN";
    } else if (event.startTime > now) {
      event.status = "SCHEDULED";
    } else {
      event.status = "CLOSED";
    }

    if (name && name !== event.name) {
      event.autoGeneratedText = `Event-${name
        .replace(/\s+/g, "-")
        .toLowerCase()}-${new Date().getTime()}`;
    }

    await event.save();

    res.status(200).json({ message: "Eveniment actualizat cu succes!", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare la actualizarea evenimentului." });
  }
};
exports.getEventDetailsForOrganizer = async (req, res) => {
  try {
    const { idGroup, idEvent } = req.params;

    // Fetch the event by ID and validate its group
    const event = await Event.findOne({
      where: { id: idEvent, idGroup },
      include: [
        {
          model: QrCode,
          as: "qrCode", // Ensure alias matches your association
          attributes: ["image_url", "qr_code"], // Include QR code details
        },
      ],
    });

    if (!event) {
      return res
        .status(404)
        .json({ error: "Event not found or does not belong to this group!" });
    }

    // Return the event details along with QR code information
    res.status(200).json({
      id: event.id,
      name: event.name,
      description: event.description,
      status: event.status,
      startTime: event.startTime,
      endTime: event.endTime,
      autoGeneratedText: event.autoGeneratedText,
      qrCode: event.qrCode ? event.qrCode.qr_code : null,
      qrCodeImageUrl: event.qrCode ? event.qrCode.image_url : null,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching event details for organizer:", error);
    res
      .status(500)
      .json({ error: "Error fetching event details for organizer." });
  }
};

exports.getUnconfirmedEvents = async (req, res) => {
  try {
    const userId = req.user.userId;

    const participants = await Participant.findAll({
      where: { user_id: userId, confirmed: false },
      include: [
        {
          model: Event,
          as: "event", // Alias definit în relația Participant -> Event
          attributes: [
            "id",
            "name",
            "description",
            "startTime",
            "endTime",
            "autoGeneratedText",
          ],
          include: [
            {
              model: QrCode,
              as: "qrCode", // Alias definit în relația Event -> QrCode
              attributes: ["image_url"],
            },
          ],
        },
      ],
    });

    // Extrage evenimentele din participanți
    const unconfirmedEvents = participants
      .map((participant) => participant.event)
      .filter((event) => event !== null); // Asigură-te că evenimentele nu sunt nule

    console.log("Unconfirmed Events:", unconfirmedEvents);
    res.status(200).json(unconfirmedEvents);
  } catch (error) {
    console.error("Eroare la obținerea evenimentelor neconfirmate:", error);
    res
      .status(500)
      .json({ error: "Eroare la obținerea evenimentelor neconfirmate." });
  }
};

exports.getEventStats = async (req, res) => {
  try {
    const userId = req.user.userId; // ID-ul utilizatorului autentificat

    console.log("Fetching stats for userId:", userId);

    // Găsește toate grupurile create de utilizator
    const groups = await EventGroup.findAll({
      where: { idUser: userId }, // idUser este organizatorul grupului
      attributes: ["id"], // Doar ID-urile grupurilor
    });

    // Extrage doar ID-urile grupurilor
    const groupIds = groups.map((group) => group.id);

    if (!groupIds.length) {
      return res.status(200).json({
        totalEvents: 0,
        ongoingEvents: 0,
        totalParticipants: 0,
      });
    }

    // Numără toate evenimentele care aparțin grupurilor
    const totalEvents = await Event.count({
      where: { idGroup: groupIds },
    });

    // Numără evenimentele în desfășurare (status: "OPEN")
    const ongoingEvents = await Event.count({
      where: { idGroup: groupIds, status: "OPEN" },
    });

    // Numără participanții la evenimentele din grupurile respective
    const totalParticipants = await Participant.count({
      include: [
        {
          model: Event,
          as: "event", // Specifică aliasul definit în relația Participant -> Event
          where: { idGroup: groupIds },
        },
      ],
    });

    // Returnează statisticile
    res.status(200).json({
      totalEvents,
      ongoingEvents,
      totalParticipants,
    });
  } catch (error) {
    console.error("Eroare la preluarea statisticilor:", error);
    res.status(500).json({ error: "Eroare la preluarea statisticilor." });
  }
};
