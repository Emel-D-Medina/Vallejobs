import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/UserProfile.css";
import {
  FaEnvelope,
  FaPhone,
  FaStar,
  FaBriefcase,
  FaFileAlt,
  FaUser,
  FaBuilding,
  FaEdit,
} from "react-icons/fa";

const UserProfile = () => {
  const navigate = useNavigate();

  // Estos datos vendrían de tu backend
  const userProfile = {
    name: "Juan Pérez",
    photo: "/path/to/photo.jpg",
    email: "juan.perez@email.com",
    phone: "+51 999 888 777",
    description: "Desarrollador Full Stack con 5 años de experiencia...",
    employerRating: 4.5,
    employeeRating: 4.8,
    jobHistory: [
      {
        company: "Tech Corp",
        position: "Senior Developer",
        period: "2021 - Presente",
      },
      // ... más trabajos
    ],
    jobPostings: [
      {
        title: "Se busca desarrollador Frontend",
        status: "Activo",
        applicants: 12,
      },
      // ... más ofertas
    ],
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-photo-section">
            <div className="profile-photo">
              <img src={userProfile.photo} alt={userProfile.name} />
            </div>
            <h2>{userProfile.name}</h2>
            <button
              className="edit-profile-btn"
              onClick={() => navigate("/editprofile")}
            >
              <FaEdit /> Editar Perfil
            </button>
          </div>

          <div className="resume-section">
            <h3>
              <FaFileAlt /> Hoja de Vida
            </h3>
            <div className="resume-preview">
              <p>CV_JuanPerez.pdf</p>
              <div className="resume-actions">
                <button className="view-btn">Ver</button>
                <button className="update-btn">Actualizar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-right">
          <div className="contact-info">
            <div className="info-item">
              <FaEnvelope />
              <span>{userProfile.email}</span>
            </div>
            <div className="info-item">
              <FaPhone />
              <span>{userProfile.phone}</span>
            </div>
          </div>

          <div className="ratings-section">
            <div className="rating-card">
              <h4>Como Empleador</h4>
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < Math.floor(userProfile.employerRating)
                        ? "star-filled"
                        : "star-empty"
                    }
                  />
                ))}
              </div>
              <span className="rating-value">
                {userProfile.employerRating}/5
              </span>
            </div>

            <div className="rating-card">
              <h4>Como Empleado</h4>
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < Math.floor(userProfile.employeeRating)
                        ? "star-filled"
                        : "star-empty"
                    }
                  />
                ))}
              </div>
              <span className="rating-value">
                {userProfile.employeeRating}/5
              </span>
            </div>
          </div>

          <div className="description-section">
            <h3>Sobre mí</h3>
            <p>{userProfile.description}</p>
          </div>

          <div className="history-section">
            <h3>
              <FaBriefcase /> Historial Laboral
            </h3>
            {userProfile.jobHistory.map((job, index) => (
              <div key={index} className="history-item">
                <FaBuilding className="company-icon" />
                <div className="history-details">
                  <h4>{job.position}</h4>
                  <p>{job.company}</p>
                  <span>{job.period}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="job-postings-section">
            <h3>Mis Ofertas de Empleo</h3>
            {userProfile.jobPostings.map((posting, index) => (
              <div key={index} className="posting-item">
                <div className="posting-header">
                  <h4>{posting.title}</h4>
                  <span className={`status ${posting.status.toLowerCase()}`}>
                    {posting.status}
                  </span>
                </div>
                <p>{posting.applicants} postulantes</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
