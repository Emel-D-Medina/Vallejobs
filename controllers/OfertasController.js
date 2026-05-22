import OfertaTrabajo from "../models/OfertasTrabajo.js";

export const createWork = async (req, res) => {
  try {
    const { titulo, categoria, localizacion, horario, salario, estado, descripcion, requerimientos } = req.body;

    if (!titulo || !categoria || !localizacion || !horario) {
      return res.status(400).json({ error: "Faltan campos obligatorios: titulo, categoria, localizacion, horario" });
    }

    const newJob = await OfertaTrabajo.create({
      titulo, categoria, localizacion, horario,
      salario: salario || null,
      estado: estado !== undefined ? estado : true,
      descripcion: descripcion || null,
      requerimientos: requerimientos || [],
      userId: req.user?.userId || null,
    });

    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error al crear oferta de trabajo:", error);
    res.status(500).json({ error: "Error al crear oferta de trabajo" });
  }
};

export const addPostulante = async (req, res) => {
  try {
    const { trabajoId } = req.body;
    const postulanteId = req.user?.userId;

    if (!postulanteId) {
      return res.status(401).json({ error: "Debes iniciar sesión para postularte" });
    }

    if (!trabajoId) {
      return res.status(400).json({ error: "ID de trabajo es requerido" });
    }

    const trabajo = await OfertaTrabajo.findByPk(trabajoId);
    if (!trabajo) {
      return res.status(404).json({ error: "Trabajo no encontrado" });
    }

    const postulantes = trabajo.postulantes || [];
    if (postulantes.includes(postulanteId)) {
      return res.status(400).json({ error: "Ya te has postulado a esta oferta" });
    }

    postulantes.push(postulanteId);
    trabajo.postulantes = postulantes;
    await trabajo.save();

    res.json({ message: "Postulación exitosa", trabajo });
  } catch (error) {
    console.error("Error al agregar postulante:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAllWorks = async (req, res) => {
  try {
    const jobs = await OfertaTrabajo.findAll({ order: [["createdAt", "DESC"]] });
    res.json(jobs);
  } catch (error) {
    console.error("Error al obtener ofertas:", error);
    res.status(500).json({ error: "Error al obtener ofertas de trabajo" });
  }
};

export const getWorkById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await OfertaTrabajo.findByPk(id);
    if (job) return res.json(job);
    res.status(404).json({ error: "Oferta no encontrada" });
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
      return res.json(updatedWork);
    }
    res.status(404).json({ error: "Oferta no encontrada" });
  } catch (error) {
    console.error("Error al actualizar la oferta:", error);
    res.status(500).json({ error: "Error al actualizar la oferta" });
  }
};

export const deleteWork = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await OfertaTrabajo.destroy({ where: { id } });
    if (deleted) return res.json({ message: "Oferta eliminada correctamente" });
    res.status(404).json({ error: "Oferta no encontrada" });
  } catch (error) {
    console.error("Error al eliminar oferta:", error);
    res.status(500).json({ error: "Error al eliminar oferta" });
  }
};

export const findWorkByCategory = async (req, res) => {
  try {
    const { categoria } = req.params;
    const ofertas = await OfertaTrabajo.findAll({
      where: { categoria },
      order: [["createdAt", "DESC"]],
    });
    if (ofertas.length > 0) return res.json(ofertas);
    res.status(404).json({ error: "No hay ofertas en esta categoría" });
  } catch (error) {
    console.error("Error al buscar por categoría:", error);
    res.status(500).json({ error: "Error al buscar por categoría" });
  }
};

export default {
  createWork, getAllWorks, getWorkById,
  updateWork, deleteWork, findWorkByCategory, addPostulante,
};
