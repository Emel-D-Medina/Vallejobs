import Categoria from "../models/Categoria.js";

export const createCategory = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
      return res.status(400).json({ error: "Nombre y descripción son obligatorios" });
    }
    const newCategory = await Categoria.create({ nombre, descripcion });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error al crear categoria:", error);
    res.status(500).json({ error: "Error al crear categoria" });
  }
};

export const getAllCategorys = async (req, res) => {
  try {
    const categories = await Categoria.findAll({ order: [["nombre", "ASC"]] });
    res.json(categories);
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    res.status(500).json({ error: "Error al obtener categorias" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categoria.findByPk(id);
    if (category) return res.json(category);
    res.status(404).json({ error: "categoria no encontrada" });
  } catch (error) {
    console.error("Error al obtener categoria:", error);
    res.status(500).json({ error: "Error al obtener la categoria" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Categoria.update(req.body, { where: { id } });
    if (updated) {
      const updatedCategory = await Categoria.findByPk(id);
      return res.json(updatedCategory);
    }
    res.status(404).json({ error: "categoria no encontrada" });
  } catch (error) {
    console.error("Error al actualizar categoria:", error);
    res.status(500).json({ error: "Error al actualizar la categoria" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Categoria.destroy({ where: { id } });
    if (deleted) return res.json({ message: "categoria eliminada correctamente" });
    res.status(404).json({ error: "categoria no encontrada" });
  } catch (error) {
    console.error("Error al eliminar categoria:", error);
    res.status(500).json({ error: "Error al eliminar categoria" });
  }
};

export default {
  createCategory, getAllCategorys, getCategoryById,
  updateCategory, deleteCategory,
};
