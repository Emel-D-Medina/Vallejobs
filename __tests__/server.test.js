const request = require("supertest");
const app = require("../server");

jest.mock("../database", () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(),
    sync: jest.fn().mockResolvedValue(),
    options: { dialect: "mariadb" },
  },
  testConnection: jest.fn().mockResolvedValue(),
}));

// Mockeamos las rutas externas para que el test no falle si no existen archivos
jest.mock(
  "../routes/users",
  () => (req, res) => res.status(200).send("Users OK"),
  { virtual: true },
);
jest.mock(
  "../routes/ofertas",
  () => (req, res) => res.status(200).send("Ofertas OK"),
  { virtual: true },
);
jest.mock(
  "../routes/categoria",
  () => (req, res) => res.status(200).send("Categorias OK"),
  { virtual: true },
);

describe("Pruebas de Rutas Base del Servidor", () => {
  it("GET / debería retornar el mensaje de bienvenida", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("¡Bienvenido a la API!");
  });

  it("debería tener configurado CORS para localhost:3000", async () => {
    const response = await request(app).get("/");
    expect(response.headers["access-control-allow-origin"]).toBe(
      "http://localhost:3000",
    );
  });

  it("debería responder 404 para una ruta que no existe", async () => {
    const response = await request(app).get("/ruta-falsa");
    expect(response.statusCode).toBe(404);
  });
});
