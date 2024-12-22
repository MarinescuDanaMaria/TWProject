const cron = require("node-cron");
const { Event } = require("../models");

// const updateEventStatus = (event) => {
//   const now = new Date();
//  // console.log("Verif : ".now);
//   console.log("Timpul curent:", now);
//   console.log("startTime:", event.startTime);
//   console.log("endTime:", event.endTime);

//   if (event.startTime <= now && event.endTime >= now) {
//     event.status = "OPEN";
//   } else {
//     event.status = "CLOSED";
//   }
//   return event;
// };

const moment = require("moment-timezone");

const updateEventStatus = (event) => {
  const now = moment().tz("Europe/Bucharest");
  const startTime = moment(event.startTime).tz("Europe/Bucharest");
  const endTime = moment(event.endTime).tz("Europe/Bucharest");

  console.log("Timpul curent:", now.format());
  console.log("startTime:", startTime.format());
  console.log("endTime:", endTime.format());

  if (startTime <= now && endTime >= now) {
    event.status = "OPEN";
  } else {
    event.status = "CLOSED";
  }
  return event;
};

// Rulează la fiecare minut
cron.schedule("* * * * *", async () => {
  try {
    const events = await Event.findAll();

    for (const event of events) {
      const updatedEvent = updateEventStatus(event);
      await updatedEvent.save(); // Salvează modificările în baza de date
    }

    console.log("Statusurile evenimentelor au fost actualizate.");
  } catch (error) {
    console.error("Eroare la actualizarea statusurilor evenimentelor:", error);
  }
});
