import { jest, describe, it, expect, beforeAll, beforeEach } from "@jest/globals";
import request from "supertest";
import express from "express";

let userRouter, app;
let mockFindUserByEmail;

beforeAll(async () => {
  process.env.JWT_SECRET = "test_secret_key";

  mockFindUserByEmail = jest.fn();

  jest.unstable_mockModule("../controllers/userController.js", () => ({
    __esModule: true,
    default: {
      createUser: jest.fn(),
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      findUserByEmail: mockFindUserByEmail,
    },
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    findUserByEmail: mockFindUserByEmail,
  }));

  jest.unstable_mockModule("../middlewares/authMiddleware.js", () => ({
    default: (req, res, next) => next(),
  }));

  userRouter = (await import("../routes/users.js")).default;
  app = express();
  app.use(express.json());
  app.use("/users", userRouter);
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Users Routes", () => {
  it("POST /users/login 400 sin credenciales", async () => {
    const res = await request(app).post("/users/login").send({});
    expect(res.statusCode).toBe(400);
  });

  it("POST /users/login 200 con credenciales válidas", async () => {
    mockFindUserByEmail.mockResolvedValue({
      id: 1,
      name: "Test",
      email: "test@vallejobs.com",
      password: "hash",
      comparePassword: () => true,
      toJSON() { return { id: 1, name: "Test", email: "test@vallejobs.com" }; },
    });
    const res = await request(app)
      .post("/users/login")
      .send({ email: "test@vallejobs.com", password: "123456" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("POST /users/login 401 usuario no encontrado", async () => {
    mockFindUserByEmail.mockResolvedValue(null);
    const res = await request(app)
      .post("/users/login")
      .send({ email: "x@y.com", password: "x" });
    expect(res.statusCode).toBe(401);
  });

  it("POST /users/login 401 contraseña incorrecta", async () => {
    mockFindUserByEmail.mockResolvedValue({
      id: 1, name: "T", email: "t@t.com",
      comparePassword: () => false,
      toJSON() { return { id: 1, name: "T", email: "t@t.com" }; },
    });
    const res = await request(app)
      .post("/users/login")
      .send({ email: "t@t.com", password: "wrong" });
    expect(res.statusCode).toBe(401);
  });
});
