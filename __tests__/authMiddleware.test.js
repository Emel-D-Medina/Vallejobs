const authMiddleware = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");

describe("Auth Middleware", () => {
  let mockReq;
  let mockRes;
  let nextFunction;

  beforeEach(() => {
    mockReq = { headers: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
    process.env.JWT_SECRET = "test_secret";
  });

  it("debería devolver 401 si no hay token", () => {
    authMiddleware(mockReq, mockRes, nextFunction);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: expect.stringContaining("Acceso denegado"),
    });
  });

  it("debería llamar a next() si el token es válido", () => {
    const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET);
    mockReq.headers["authorization"] = `Bearer ${token}`;

    authMiddleware(mockReq, mockRes, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockReq.user).toBeDefined();
  });
});
