const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./utils/database");
const initModels = require("./models/initModels");
const authRoutes = require("./routes/auth.routes");
const transporter = require("./utils/mailer");

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
  .catch((error) => console.log(error));

  //PARA VERIFICAR
// transporter.verify()
//   .then(() => console.log("transporter is ok"))
//   .catch((error) => console.log(error));


// MANDAMOS UN EMAIL DE PRUEBA
// const sendEmail = async () => {
//   transporter.sendMail({
//     from: "simonchumacero26@gmail.com",
//     to: "simonchumacero26@gmail.com",
//     subject: ">:D",
//     text: ">:D",
//     html: "<h1> Competitive Player </h1>",
//   });
// };

// sendEmail();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my server",
  });
});

app.use("/api/v1/auth", authRoutes);

module.exports = app;
