// routes/users.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/registrar", userController.createUser);
router.get("/obtener", authMiddleware, userController.getAllUsers);
router.get("/obtener/:id", authMiddleware, userController.getUserById);
router.put("/actualizar/:id", authMiddleware, userController.updateUser);
router.delete("/eliminar/:id", authMiddleware, userController.deleteUser);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userController.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Usuario no encontrado" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, user });
});

module.exports = router;
