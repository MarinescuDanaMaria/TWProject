const cron = require("node-cron");
const { Event } = require("../models");

const moment = require("moment-timezone");

const updateEventStatus = (event) => {
  const now = moment().tz("Europe/Bucharest");
  const startTime = event.startTime;
  const endTime = event.endTime;

  if (startTime <= now && endTime >= now) {
    event.status = "OPEN";
  } else if (endTime < now) {
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
      await updatedEvent.save(); 
    }

    console.log("Statusurile evenimentelor au fost actualizate.");
  } catch (error) {
    console.error("Eroare la actualizarea statusurilor evenimentelor:", error);
  }
});
