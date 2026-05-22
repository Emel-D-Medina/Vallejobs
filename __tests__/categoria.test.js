import { jest, describe, it, expect, beforeAll } from "@jest/globals";
import request from "supertest";
import express from "express";

jest.mock("../models/Categoria.js", () => ({
  default: {
    create: jest
      .fn()
      .mockResolvedValue({ id: 1, nombre: "Tecnología", descripcion: "IT" }),
    findAll: jest
      .fn()
      .mockResolvedValue([{ id: 1, nombre: "Tecnología", descripcion: "IT" }]),
    findByPk: jest
      .fn()
      .mockResolvedValue({ id: 1, nombre: "Tecnología", descripcion: "IT" }),
    destroy: jest.fn().mockResolvedValue(1),
    update: jest.fn().mockResolvedValue([1]),
  },
}));

jest.mock("../middlewares/authMiddleware.js", () => ({
  default: (req, res, next) => next(),
}));

let categoriaRouter, app;

beforeAll(async () => {
  categoriaRouter = (await import("../routes/categoria.js")).default;
  app = express();
  app.use(express.json());
  app.use("/Categoria", categoriaRouter);
});

describe("Categoria Controller", () => {
  it("POST /registrar debería crear una categoría", async () => {
    const res = await request(app)
      .post("/Categoria/registrar")
      .send({ nombre: "Tecnología", descripcion: "IT" });
    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe("Tecnología");
  });

  it("GET /obtener debería traer todas las categorías", async () => {
    const res = await request(app).get("/Categoria/obtener");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
