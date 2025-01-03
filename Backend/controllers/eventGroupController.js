const { EventGroup, User, Event } = require("../models");
const { Op } = require("sequelize");
exports.addEventGroup = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: "Numele grupului este obligatoriu!" });
    }

    const group = await EventGroup.create({
      name,
      idUser: req.user.userId,
    });

    res.status(201).json({ message: "Grup creat cu succes!", group });
  } catch (error) {
    console.error("Eroare la crearea grupului:", error);
    res
      .status(500)
      .json({ error: "Eroare la crearea grupului de evenimente." });
  }
};

exports.getGroupEvents = async (req, res) => {
  try {
    const userId = req.user.userId;

    const groups = await EventGroup.findAll({
      where: { idUser: userId },
    });

    res.status(200).json(groups);
  } catch (error) {
    console.error("Eroare la obținerea grupurilor de evenimente:", error);
    res
      .status(500)
      .json({ error: "Eroare la obținerea grupurilor de evenimente." });
  }
};

exports.getEventGroupsGroupedByUser = async (req, res) => {
  try {
    const { organizerId, searchQuery } = req.query;

    const whereOrganizer =
      organizerId && organizerId !== "All" ? { idUser: organizerId } : {};
    const whereEventName = searchQuery
      ? { name: { [Op.like]: `%${searchQuery}%` } }
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
      return res
        .status(200)
        .json({
          success: false,
          message: "Nu au fost găsite grupuri de evenimente!",
        });
    }

    eventGroups.forEach((group) => {
      console.log(
        "Before filtering:",
        group.events.map((event) => event.status)
      );
      group.events = group.events.filter(
        (event) =>
          event.status &&
          (event.status === "OPEN" || event.status === "SCHEDULED")
      );
      console.log(
        "After filtering:",
        group.events.map((event) => event.status)
      );
    });


    const filteredEventGroups = eventGroups.filter(
      (group) => group.events.length > 0
    );

    filteredEventGroups.forEach((group) => {
      console.log(
        "After filtering: ---> filteredEventGroups",
        group.events.map((event) => event.status)
      );
    });

    const groupedByUser = filteredEventGroups.reduce((acc, group) => {
      if (group.organizer && group.organizer.id) {
        const userId = group.organizer.id; 

         // Dacă utilizatorul nu există în acumulare, îl adăugăm
        if (!acc[userId]) {
          acc[userId] = {
            user: group.organizer, 
            eventGroups: [], 
          };
        }

       // Convertim grupul și evenimentele în obiecte simple
        const plainGroup = {
          ...group.toJSON(),
          events: group.events.map((event) => event.toJSON()), 
        };

        acc[userId].eventGroups.push(plainGroup);
      } else {
        console.log("Missing organizer for group:", group); 
      }

      return acc;
    }, {});

    res
      .status(200)
      .json({ success: true, objects: Object.values(groupedByUser) });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Eroare la obținerea grupurilor de evenimente!" });
  }
};
