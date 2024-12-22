const { EventGroup,User,Event } = require("../models");


exports.addEventGroup = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Numele grupului este obligatoriu!" });
    }

    const group = await EventGroup.create({
      name,
      idUser: req.user.userId,
    });


    res.status(201).json({ message: "Grup creat cu succes!", group });
  } catch (error) {
    console.error("Eroare la crearea grupului:", error);
    res.status(500).json({ error: "Eroare la crearea grupului de evenimente." });
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
    res.status(500).json({ error: "Eroare la obținerea grupurilor de evenimente." });
  }
};

exports.getEventGroupsGroupedByUser = async (req, res) => {
  try {
    // Căutăm toate grupurile de evenimente, incluzând utilizatorul și evenimentele
    const eventGroups = await EventGroup.findAll({
      include: [
        {
          model: Event, // Incluzând evenimentele pentru fiecare grup
          as: 'events', // Folosind aliasul definit în asocierea din modelul EventGroup
        },
        {
          model: User, // Incluzând utilizatorul asociat cu grupul de evenimente
          as: 'organizer', // Aliasul pentru utilizator (asigură-te că ai definit corect asocierea)
        }
      ],
    });

    // Dacă nu găsim niciun grup de evenimente
    if (!eventGroups.length) {
      return res.status(404).json({ error: "Nu au fost găsite grupuri de evenimente!" });
    }

    // Grupăm evenimentele în funcție de utilizator
    const groupedByUser = eventGroups.reduce((acc, group) => {
      // Verificăm dacă organizerul există înainte de a accesa 'id'
      if (group.organizer && group.organizer.id) {
        const userId = group.organizer.id; // Folosim id-ul organizatorului

        // Dacă nu există deja un grup pentru utilizatorul respectiv, îl adăugăm
        if (!acc[userId]) {
          acc[userId] = {
            user: group.organizer, // Organizatorul
            eventGroups: [] // Lista de grupuri de evenimente
          };
        }

        // Adăugăm grupul de evenimente la utilizatorul corespunzător
        acc[userId].eventGroups.push(group);
      } else {
        console.log("Missing organizer for group:", group); // Log pentru grupuri care nu au organizer
      }

      return acc;
    }, {});

    // Răspuns cu datele grupate
    res.status(200).json(Object.values(groupedByUser)); // Returnăm un array din obiectul grupat
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare la obținerea grupurilor de evenimente!" });
  }
};
