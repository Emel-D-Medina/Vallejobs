// server.js
import express, { json } from "express";
import cors from "cors";
import { testConnection, sequelize } from "./database.js";
import usersRoutes from "./routes/users.js";
import ofertasRoutes from "./routes/ofertas.js";
import categoriaRoutes from "./routes/categoria.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(json());

// Sincronización
sequelize.sync({ alter: true }).then(() => {
  console.log("Modelos sincronizados.");
});

// Rutas
app.use("/Usuarios", usersRoutes);
app.use("/Trabajos", ofertasRoutes);
app.use("/Categoria", categoriaRoutes);

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
