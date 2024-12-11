const { Event, EventGroup, QrCode } = require("../models");
const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");

const updateEventStatus = (event) => {
  const now = new Date();
  if (event.startTime <= now && event.endTime >= now) {
    event.status = "OPEN";
  } else {
    event.status = "CLOSED";
  }
  return event;
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { idGroup: req.params.groupId },
    });

    const updatedEvents = events.map(updateEventStatus);

    res.status(200).json(updatedEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare la obținerea evenimentelor." });
  }
};

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

    const event = await Event.create({
      name,
      description,
      startTime,
      endTime,
      idGroup: groupId,
      organizerId: req.user.id,
    });
    const imagesDir = path.join(__dirname, "../images");
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
    }
    const eventUrl = `http://localhost:8081/event/${event.id}`;
    const imagePath = path.join(__dirname, "../images", `${event.id}.png`);

    await QRCode.toFile(imagePath, eventUrl, { type: "png" });

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
exports.getEventsByGroup = async (req, res) => {
  try {
    const { id } = req.params;e

    const events = await Event.findAll({
      where: { idGroup: id },
    });

    if (!events.length) {
      return res
        .status(404)
        .json({ error: "Nu au fost găsite evenimente pentru acest grup!" });
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
    event.startTime = startTime || event.startTime;
    event.endTime = endTime || event.endTime;

    await event.save();

    res.status(200).json({ message: "Eveniment actualizat cu succes!", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare la actualizarea evenimentului." });
  }
};
