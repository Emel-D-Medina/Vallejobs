const request = require("supertest");
const express = require("express");
const categoriaRouter = require("../routes/categoria");
const Categoria = require("../models/Categoria");

// Mock del modelo
jest.mock("../models/Categoria");
// Mock del middleware para saltar la auth en este test específico
jest.mock("../middlewares/authMiddleware", () => (req, res, next) => next());

const app = express();
app.use(express.json());
app.use("/Categoria", categoriaRouter);

describe("Categoria Controller", () => {
  it("POST /registrar debería crear una categoría", async () => {
    const mockCat = { id: 1, nombre: "Tecnología", descripcion: "IT" };
    Categoria.create.mockResolvedValue(mockCat);

    const res = await request(app)
      .post("/Categoria/registrar")
      .send({ nombre: "Tecnología", descripcion: "IT" });

    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe("Tecnología");
  });

  it("GET /obtener debería traer todas las categorías", async () => {
    Categoria.findAll.mockResolvedValue([{ nombre: "Ventas" }]);

    const res = await request(app).get("/Categoria/obtener");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
