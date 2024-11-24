const express = require("express");
const cors = require("cors");
const sequelize = require("./config/sequelize"); 
const User = require("./models/User");  
const authRoutes = require('./routes/authRoutes');
const listEndpoints = require('express-list-endpoints'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("From Be");
});

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
app.use('/auth', authRoutes);

app.listen(8081, () => {
  console.log("Serverul rulează pe portul 8081");
  
console.log(listEndpoints(app));
});
