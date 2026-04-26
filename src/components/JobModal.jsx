import React from "react";
import "../styles/JobModal.css";
import {
  FaTimes,
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";
import axios from "axios";

const JobModal = ({ job, onClose }) => {
  if (!job) return null;

  // ID temporal del postulante (debería venir del usuario logueado)
  const postulanteId = 1;

  const aplicar = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Trabajos/agpostulante",
        {
          trabajoId: job.id,
          postulanteId: postulanteId,
        },
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error al postularse:", error);
      alert("Ocurrió un error al intentar postularse.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <FaBriefcase className="modal-icon" />
          <h2>{job.titulo}</h2>
        </div>

        <div className="modal-body">
          <div className="job-detail">
            <FaMapMarkerAlt className="detail-icon" />
            <span>{job.localizacion || "Ubicación no especificada"}</span>
          </div>

          <div className="job-detail">
            <FaMoneyBillWave className="detail-icon" />
            <span>{job.salario || "Salario no especificado"}</span>
          </div>

          <div className="job-detail">
            <FaClock className="detail-icon" />
            <span>{job.horario || "Tiempo completo"}</span>
          </div>

          <div className="job-description">
            <h3>Descripción del puesto</h3>
            <p>{job.descripcion || "No hay descripción disponible"}</p>
          </div>

          <div className="job-requirements">
            <h3>Requisitos</h3>
            <ul>{job.requerimientos}</ul>
          </div>
        </div>

        <div className="modal-footer">
          <button className="apply-button" onClick={aplicar}>
            Aplicar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
