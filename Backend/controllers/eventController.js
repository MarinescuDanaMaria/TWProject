const { Event } = require("../models"); 

// controller pt obt lista even
// exports.getEvents = async (req, res) => {
//   try {
//     const events = await Event.findAll({
//       where: { organizerId: req.user.id },
//     });
//     res.json({ events });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Eroare la obținerea listei de evenimente!" });
//   }
// };

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
    const events = await Event.findAll({ where: { idGroup: req.params.groupId } });

    const updatedEvents = events.map(updateEventStatus);

    res.status(200).json(updatedEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare la obținerea evenimentelor." });
  }
};

// controller pt ad even
exports.addEvent = async (req, res) => {
  try {
    const { name, description, status, startTime, endTime, idGroup } = req.body;

//////////
    console.log("Date primite de la client:", req.body);
    console.log("Utilizator autentificat:", req.user);

    ///////
    if (!name || !description || !startTime || !idGroup) {
      return res.status(400).json({ error: "Toate câmpurile obligatorii trebuie completate!" });
    }

    const event = await Event.create({
      name,
      description,
      status,
      startTime,
      endTime,
      idGroup,
      organizerId: req.user.id,
    });

    res.status(201).json({ message: "Eveniment creat cu succes!", event });
  } catch (error) {
    console.error(error);
    /// modif
    res.status(500).json({ error: "Eroare la crearea evenimentului: ",error });
  }
};

