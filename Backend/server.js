const express = require("express");
const cors = require("cors");
const path = require("path"); 
const sequelize = require("./config/sequelize");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const webRoutes = require("./routes/webRoutes");
const organizerRoutes = require("./routes/organizerRoutes");
const listEndpoints = require("express-list-endpoints");
require("dotenv").config();
require("./utils/cronJobs");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
// ruta principala de test 
app.get("/", (req, res) => {
  return res.json("From Be");
});

// adaug rutele existente
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/organizer", organizerRoutes);
app.use("/",webRoutes);

///////////debug
app.use("/auth", (req, res, next) => {
  console.log(`Auth route hit: ${req.method} ${req.path}`);
  next();
}, authRoutes);

/// -------------------

// pt debugging
console.log(listEndpoints(app));

// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.findAll();
//     return res.json(users);

//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Nu s-a putut obține utilizatorii" });
//   }
// });


// pornire server
app.listen(8081, () => {
  console.log("Serverul rulează pe portul 8081");
  console.log(listEndpoints(app)); // afisare endpoint-uri
});
