// database.js
import mariadb from "mariadb";
import { Sequelize } from "sequelize";
import "dotenv/config"; // Uso correcto en ESM

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: "mariadb",
    dialectModule: mariadb,
    logging: false,
  },
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida.");
  } catch (error) {
    console.error("No se pudo conectar:", error);
  }
};
