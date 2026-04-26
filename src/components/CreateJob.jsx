import React, { useState } from "react";
import "../styles/CreateJob.css";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaTag,
  FaUsers,
} from "react-icons/fa";

const CreateJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Tiempo completo",
    category: "",
    description: "",
    requirements: "",
    benefits: "",
    vacancies: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar los datos al backend
    console.log(jobData);
  };

  const handleVacanciesChange = (operation) => {
    setJobData((prevState) => ({
      ...prevState,
      vacancies:
        operation === "increment"
          ? Math.min(prevState.vacancies + 1, 99) // Máximo 99 vacantes
          : Math.max(prevState.vacancies - 1, 1), // Mínimo 1 vacante
    }));
  };

  // Lista de categorías disponibles
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
    <div className="create-job-wrapper">
      <div className="create-job-container">
        <div className="create-job-header">
          <FaBriefcase className="header-icon" />
          <h2>Crear Nueva Oferta de Empleo</h2>
          <span className="required-legend">* Campos requeridos</span>
        </div>

        <form onSubmit={handleSubmit} className="create-job-form">
          <div className="form-group">
            <label>
              <FaBriefcase className="input-icon" />
              Título del puesto *
            </label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="ej. Desarrollador Frontend Senior"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaBriefcase className="input-icon" />
              Empresa <span className="optional-text">(Opcional)</span>
            </label>
            <input
              type="text"
              name="company"
              value={jobData.company}
              onChange={handleChange}
              placeholder="ej. Tech Solutions SA"
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
                name="location"
                value={jobData.location}
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
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                placeholder="ej. S/. 3,000 - 5,000"
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
                name="category"
                value={jobData.category}
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
              <select name="type" value={jobData.type} onChange={handleChange}>
                <option value="Tiempo completo">Tiempo completo</option>
                <option value="Medio tiempo">Medio tiempo</option>
                <option value="Remoto">Remoto</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <FaUsers className="input-icon" />
                Número de Vacantes
              </label>
              <div className="vacancies-input">
                <button
                  type="button"
                  className="vacancy-btn"
                  onClick={() => handleVacanciesChange("decrement")}
                  disabled={jobData.vacancies <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  name="vacancies"
                  value={jobData.vacancies}
                  onChange={(e) => {
                    const value = Math.max(
                      1,
                      Math.min(99, parseInt(e.target.value) || 1),
                    );
                    setJobData((prev) => ({ ...prev, vacancies: value }));
                  }}
                  min="1"
                  max="99"
                  className="vacancy-number"
                />
                <button
                  type="button"
                  className="vacancy-btn"
                  onClick={() => handleVacanciesChange("increment")}
                  disabled={jobData.vacancies >= 99}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Descripción del puesto</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              placeholder="Describe las responsabilidades y el rol..."
              required
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Requisitos</label>
            <textarea
              name="requirements"
              value={jobData.requirements}
              onChange={handleChange}
              placeholder="Lista los requisitos principales..."
              required
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Beneficios</label>
            <textarea
              name="benefits"
              value={jobData.benefits}
              onChange={handleChange}
              placeholder="Describe los beneficios ofrecidos..."
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn">
              Cancelar
            </button>
            <button type="submit" className="submit-btn">
              Publicar empleo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
