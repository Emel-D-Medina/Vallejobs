// routes/ofertas.js
import express from "express";
const router = express.Router();
import OfertasController from "../controllers/OfertasController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

router.post("/registrar", OfertasController.createWork);
router.get("/obtener", OfertasController.getAllWorks);
// Cambiado de /obtener/:categoria a /categoria/:categoria para evitar conflicto
router.get("/categoria/:categoria", OfertasController.findWorkByCategory);
router.get("/agpostulante", OfertasController.addPostulante);
router.get("/obtener/:id", authMiddleware, OfertasController.getWorkById);
router.put("/actualizar/:id", authMiddleware, OfertasController.updateWork);
router.delete("/eliminar/:id", authMiddleware, OfertasController.deleteWork);

export default router;
