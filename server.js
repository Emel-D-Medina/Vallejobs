import express, { json } from "express";
import cors from "cors";
import { testConnection, syncModels } from "./database.js";
import "./models/associations.js";
import usersRoutes from "./routes/users.js";
import ofertasRoutes from "./routes/ofertas.js";
import categoriaRoutes from "./routes/categoria.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "¡Bienvenido a la API de Vallejobs!" });
});

app.use("/Usuarios", usersRoutes);
app.use("/Trabajos", ofertasRoutes);
app.use("/Categoria", categoriaRoutes);

const startServer = async () => {
  const connected = await testConnection();
  if (!connected) {
    console.warn("El servidor se iniciará sin conexión a la base de datos.");
  }

  await syncModels();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"));
if (isMain) {
  startServer();
}

export default app;
