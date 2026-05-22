import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const OfertasTrabajo = sequelize.define(
  "OfertasTrabajo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    localizacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salario: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    postulantes: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      get() {
        const raw = this.getDataValue("postulantes");
        if (!raw) return [];
        if (Array.isArray(raw)) return raw;
        try { return JSON.parse(raw); } catch { return []; }
      },
      set(value) {
        const arr = Array.isArray(value) ? value : (value ? [value] : []);
        this.setDataValue("postulantes", JSON.stringify(arr));
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    requerimientos: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      get() {
        const raw = this.getDataValue("requerimientos");
        if (!raw) return [];
        if (Array.isArray(raw)) return raw;
        try { return JSON.parse(raw); } catch { return [raw]; }
      },
      set(value) {
        if (typeof value === "string") {
          try { JSON.parse(value); this.setDataValue("requerimientos", value); return; } catch {}
          this.setDataValue("requerimientos", JSON.stringify([value]));
        } else {
          this.setDataValue("requerimientos", JSON.stringify(value));
        }
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "ofertasTrabajo",
  },
);

export default OfertasTrabajo;
