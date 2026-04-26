// server.js
require("dotenv").config();
const express = require("express");
const { testConnection, sequelize } = require("./database");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

try {
  await testConnection();
  await sequelize.sync({ alter: true, force: true });
  console.log("Modelos sincronizados con la base de datos.");

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
  );

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("¡Bienvenido a la API!");
  });

  /* Esto podría fungir como un IF, de que si el usuario elige X ruta, se le muestre. */
  app.use("/Usuarios/", require("./routes/users"));
  app.use("/Trabajos/", require("./routes/ofertas"));
  app.use("/Categoria/", require("./routes/categoria"));

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("¡Algo salió mal!");
  });

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("Error al iniciar el servidor:", error);
}
