const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./utils/database");
const initModels = require("./models/initModels");

const app = express();

app.use(express.json()); // JSON to Javascript Object
app.use(cors()); // Origenes cruzados / peticion de netlify a raleway
app.use(morgan("tiny")); // Ver datos en consola, sirve para detectar errores

initModels();

db.authenticate()
  .then(() => console.log("Base de datos autenticada"))
  .catch((error) => console.log(error));

db.sync({ force: false })
    .then(() => console.log("Base de datos sincronizada"))
    .catch((error) => console.log(error))

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my server",
  });
});

module.exports = app;
