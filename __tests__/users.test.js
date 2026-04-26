const request = require("supertest");
const express = require("express");
const userRouter = require("../routes/users");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

jest.mock("../models/User");

const app = express();
app.use(express.json());
app.use("/Users", userRouter);

describe("User Auth Flow", () => {
  it("POST /login debería devolver un token con credenciales válidas", async () => {
    const hashedPassword = bcrypt.hashSync("123456", 10);
    const mockUser = {
      id: 1,
      email: "test@vallejobs.com",
      password: hashedPassword,
    };

    // Simulamos que el usuario existe en la DB
    User.findOne.mockResolvedValue(mockUser);

    const res = await request(app)
      .post("/Users/login")
      .send({ email: "test@vallejobs.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
