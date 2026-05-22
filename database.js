import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.DB_NAME || "vallejobs",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: "mariadb",
    dialectOptions: {
      connectTimeout: 30000,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  },
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida.");
    return true;
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error.message);
    return false;
  }
};

export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados correctamente.");
  } catch (error) {
    console.error("Error al sincronizar modelos:", error.message);
  }
};
