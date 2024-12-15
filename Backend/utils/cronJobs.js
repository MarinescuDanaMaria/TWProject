const cron = require("node-cron");
const { Event } = require("../models");

const updateEventStatus = (event) => {
  const now = new Date();
  if (event.startTime <= now && event.endTime >= now) {
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
