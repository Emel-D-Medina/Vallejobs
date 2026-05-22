import React, { useState, useEffect } from "react";
import "../styles/MainContent.css";
import { FaBriefcase, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import JobModal from "./JobModal";
import axios from "axios";

const MainContent = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/Trabajos/Obtener",
        );
        setJobOffers(response.data);
      } catch (error) {
        console.error("Error al obtener los trabajos:", error);
      }
    };

    fetchJobOffers();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="main-content">
      <div className="quick-jobs">EMPLEOS RÁPIDOS</div>
      {jobOffers.length === 0 && (
        <p style={{ color: "#888", textAlign: "center", padding: "40px 0" }}>
          No hay ofertas disponibles
        </p>
      )}
      {jobOffers.map((job) => (
        <div
          key={job.id}
          className="job-card"
          onClick={() => handleJobClick(job)}
        >
          <FaBriefcase className="job-icon" />
          <div className="job-info">
            <span className="job-title">{job.titulo}</span>
            <div className="job-meta">
              {job.localizacion && (
                <span><FaMapMarkerAlt /> {job.localizacion}</span>
              )}
              {job.horario && (
                <span><FaClock /> {job.horario}</span>
              )}
            </div>
          </div>
          <span className={`job-status ${job.estado ? "active" : ""}`}>
            {job.estado ? "Activo" : "Inactivo"}
          </span>
        </div>
      ))}

      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default MainContent;
