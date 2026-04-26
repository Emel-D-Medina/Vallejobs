// controllers/OfertasController.js
import OfertaTrabajo from "../models/OfertasTrabajo.js";

export const createWork = async (req, res) => {
  try {
    const {
      titulo,
      categoria,
      localizacion,
      horario,
      salario,
      estado,
      descripcion,
      requerimientos,
    } = req.body;
    const newJob = await OfertaTrabajo.create({
      titulo,
      categoria,
      localizacion,
      horario,
      salario,
      estado,
      descripcion,
      requerimientos,
    });
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error al crear oferta de trabajo:", error);
    res.status(500).json({ error: "Error al crear oferta de trabajo" });
  }
};

export const addPostulante = async (req, res) => {
  try {
    const { trabajoId, postulanteId } = req.body;
    const trabajo = await OfertaTrabajo.findByPk(trabajoId);
    if (!trabajo)
      return res.status(404).json({ error: "Trabajo no encontrado" });

    const postulantes = trabajo.postulantes || [];
    if (postulantes.includes(postulanteId)) {
      return res
        .status(400)
        .json({ error: "El postulante ya está registrado" });
    }

    postulantes.push(postulanteId);
    trabajo.postulantes = postulantes;
    await trabajo.save();

    res.json({ message: "Postulante agregado correctamente", trabajo });
  } catch (error) {
    console.error("Error al agregar postulante:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAllWorks = async (req, res) => {
  try {
    const Jobs = await OfertaTrabajo.findAll();
    res.json(Jobs);
  } catch (error) {
    console.error("Error al obtener ofertas trabajos:", error);
    res.status(500).json({ error: "Error al obtener ofertas de trabajo" });
  }
};

export const getWorkById = async (req, res) => {
  try {
    const { id } = req.params;
    const Job = await OfertaTrabajo.findByPk(id); // Corregido: antes decía User
    if (Job) {
      res.json(Job);
    } else {
      res.status(404).json({ error: "Oferta no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener oferta:", error);
    res.status(500).json({ error: "Error al obtener la oferta" });
  }
};

export const updateWork = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await OfertaTrabajo.update(req.body, { where: { id } });
    if (updated) {
      const updatedWork = await OfertaTrabajo.findByPk(id);
      res.json(updatedWork);
    } else {
      res.status(404).json({ error: "Oferta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la oferta" });
  }
};

export const deleteWork = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await OfertaTrabajo.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Oferta eliminada correctamente" });
    } else {
      res.status(404).json({ error: "Oferta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar oferta" });
  }
};

export const findWorkByCategory = async (req, res) => {
  try {
    const { categoria } = req.params;
    const Oferta = await OfertaTrabajo.findOne({ where: { categoria } });
    if (Oferta) return res.json(Oferta);
    res.status(404).json({ error: "No hay ofertas en esta categoría" });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar por categoría" });
  }
};

export default {
  createWork,
  getAllWorks,
  getWorkById,
  updateWork,
  deleteWork,
  findWorkByCategory,
  addPostulante,
};
