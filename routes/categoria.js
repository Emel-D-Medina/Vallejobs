// routes/categoria.js
import express from "express";
const router = express.Router();
import categoriaController from "../controllers/categoriaController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

router.post("/registrar", categoriaController.createCategory);
router.get("/obtener", categoriaController.getAllCategorys);
router.get("/obtener/:id", authMiddleware, categoriaController.getCategoryById);
router.put(
  "/actualizar/:id",
  authMiddleware,
  categoriaController.updateCategory,
);
router.delete(
  "/eliminar/:id",
  authMiddleware,
  categoriaController.deleteCategory,
);

export default router;
