import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateJob.css";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaTag,
} from "react-icons/fa";
import Navbar from "./Navbar";
import { getToken } from "../services/authService";
import axios from "axios";

const CreateJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    titulo: "",
    localizacion: "",
    salario: "",
    horario: "Tiempo completo",
    categoria: "",
    descripcion: "",
    requerimientos: "",
    estado: true,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const token = getToken();
      const response = await axios.post(
        "http://localhost:5000/Trabajos/registrar",
        jobData,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.status === 201) {
        setSuccess("Oferta de empleo publicada exitosamente");
        setJobData({
          titulo: "",
          localizacion: "",
          salario: "",
          horario: "Tiempo completo",
          categoria: "",
          descripcion: "",
          requerimientos: "",
          estado: true,
        });
      }
    } catch (err) {
      setError("Error al publicar la oferta. Intente de nuevo.");
      console.error("Error al crear oferta:", err);
    }
  };

  const jobCategories = [
    "Tecnología",
    "Marketing",
    "Diseño",
    "Ventas",
    "Administración",
    "Recursos Humanos",
    "Finanzas",
    "Educación",
    "Salud",
    "Ingeniería",
    "Servicio al Cliente",
    "Otros",
  ];

  return (
    <>
      <Navbar />
      <div className="create-job-wrapper">
        <div className="create-job-container">
          <div className="create-job-header">
            <FaBriefcase className="header-icon" />
            <h2>Crear Nueva Oferta de Empleo</h2>
            <span className="required-legend">* Campos requeridos</span>
          </div>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", textAlign: "center" }}>{success}</p>
          )}

          <form onSubmit={handleSubmit} className="create-job-form">
          <div className="form-group">
            <label>
              <FaBriefcase className="input-icon" />
              Título del puesto *
            </label>
            <input
              type="text"
              name="titulo"
              value={jobData.titulo}
              onChange={handleChange}
              placeholder="ej. Desarrollador Frontend Senior"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <FaMapMarkerAlt className="input-icon" />
                Ubicación
              </label>
              <input
                type="text"
                name="localizacion"
                value={jobData.localizacion}
                onChange={handleChange}
                placeholder="ej. Lima, Perú"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <FaMoneyBillWave className="input-icon" />
                Salario
              </label>
              <input
                type="text"
                name="salario"
                value={jobData.salario}
                onChange={handleChange}
                placeholder="ej. 3000"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <FaTag className="input-icon" />
                Categoría
              </label>
              <select
                name="categoria"
                value={jobData.categoria}
                onChange={handleChange}
                required
                className="category-select"
              >
                <option value="">Selecciona una categoría</option>
                {jobCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                <FaClock className="input-icon" />
                Tipo de empleo
              </label>
              <select
                name="horario"
                value={jobData.horario}
                onChange={handleChange}
              >
                <option value="Tiempo completo">Tiempo completo</option>
                <option value="Medio tiempo">Medio tiempo</option>
                <option value="Remoto">Remoto</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Descripción del puesto</label>
            <textarea
              name="descripcion"
              value={jobData.descripcion}
              onChange={handleChange}
              placeholder="Describe las responsabilidades y el rol..."
              required
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Requerimientos</label>
            <textarea
              name="requerimientos"
              value={jobData.requerimientos}
              onChange={handleChange}
              placeholder="Lista los requisitos principales..."
              required
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
            <button type="submit" className="submit-btn">
              Publicar empleo
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreateJob;
