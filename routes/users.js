// routes/users.js
import express from "express";
import userController from "../controllers/userController.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/registrar", userController.createUser);
router.get("/obtener", authMiddleware, userController.getAllUsers);
router.get("/obtener/:id", authMiddleware, userController.getUserById);
router.put("/actualizar/:id", authMiddleware, userController.updateUser);
router.delete("/eliminar/:id", authMiddleware, userController.deleteUser);

router.post("/login", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

export default router;
