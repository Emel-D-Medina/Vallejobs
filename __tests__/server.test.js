import { jest, describe, it, expect, beforeAll } from "@jest/globals";
import request from "supertest";

jest.mock("../database.js", () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(),
    sync: jest.fn().mockResolvedValue(),
    options: { dialect: "mariadb" },
  },
  testConnection: jest.fn().mockResolvedValue(true),
  syncModels: jest.fn().mockResolvedValue(),
}));

jest.mock("../models/associations.js", () => ({}));

let app;

beforeAll(async () => {
  app = (await import("../server.js")).default;
});

describe("Pruebas de Rutas Base del Servidor", () => {
  it("GET / debería retornar el mensaje de bienvenida", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("¡Bienvenido a la API de Vallejobs!");
  });

  it("debería tener configurado CORS para localhost:3000", async () => {
    const response = await request(app).get("/");
    expect(response.headers["access-control-allow-origin"]).toBe("http://localhost:3000");
  });

  it("debería responder 404 para una ruta que no existe", async () => {
    const response = await request(app).get("/ruta-falsa");
    expect(response.statusCode).toBe(404);
  });
});
