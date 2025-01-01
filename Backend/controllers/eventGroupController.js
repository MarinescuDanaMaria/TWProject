const { EventGroup, User, Event } = require("../models");

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
    // Căutăm toate grupurile de evenimente, incluzând utilizatorul și evenimentele
    const eventGroups = await EventGroup.findAll({
      include: [
        {
          model: Event, // Incluzând evenimentele pentru fiecare grup
          as: "events", // Folosind aliasul definit în asocierea din modelul EventGroup
        },
        {
          model: User, // Incluzând utilizatorul asociat cu grupul de evenimente
          as: "organizer", // Aliasul pentru utilizator (asigură-te că ai definit corect asocierea)
        },
      ],
    });

    // Dacă nu găsim niciun grup de evenimente
    if (!eventGroups.length) {
      return res
        .status(404)
        .json({ error: "Nu au fost găsite grupuri de evenimente!" });
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

    // Eliminăm grupurile care nu mai au evenimente după filtrare
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
      // Check if the organizer exists
      if (group.organizer && group.organizer.id) {
        const userId = group.organizer.id; // Use the organizer's ID

        // If the user doesn't exist in the accumulator, add them
        if (!acc[userId]) {
          acc[userId] = {
            user: group.organizer, // Organizer details
            eventGroups: [], // List of event groups
          };
        }

        // Convert the group and its events to plain objects before adding
        const plainGroup = {
          ...group.toJSON(), // Convert the group model to a plain object
          events: group.events.map((event) => event.toJSON()), // Convert events to plain objects
        };

        // Add the plain group to the organizer
        acc[userId].eventGroups.push(plainGroup);
      } else {
        console.log("Missing organizer for group:", group); // Log groups with missing organizers
      }

      return acc;
    }, {});

    res.status(200).json(Object.values(groupedByUser));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Eroare la obținerea grupurilor de evenimente!" });
  }
};
