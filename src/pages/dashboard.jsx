import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaBriefcase,
  FaUsers,
  FaEye,
  FaPlusCircle,
  FaUser,
} from "react-icons/fa";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-content">
        <h1>Bienvenido al Dashboard</h1>
        <p className="dashboard-subtitle">
          Gestiona tus ofertas de empleo y postulaciones
        </p>

        <div className="dashboard-grid">
          <div className="dash-card">
            <div className="dash-card-icon purple">
              <FaBriefcase />
            </div>
            <div className="dash-card-info">
              <h3>0</h3>
              <p>Mis Ofertas</p>
            </div>
          </div>
          <div className="dash-card">
            <div className="dash-card-icon green">
              <FaUsers />
            </div>
            <div className="dash-card-info">
              <h3>0</h3>
              <p>Postulantes</p>
            </div>
          </div>
          <div className="dash-card">
            <div className="dash-card-icon orange">
              <FaEye />
            </div>
            <div className="dash-card-info">
              <h3>0</h3>
              <p>Vistas</p>
            </div>
          </div>
          <div className="dash-card">
            <div className="dash-card-icon blue">
              <FaUser />
            </div>
            <div className="dash-card-info">
              <h3>1</h3>
              <p>Mi Perfil</p>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <button
            className="dash-action-btn"
            onClick={() => navigate("/CreateJob")}
          >
            <FaPlusCircle /> Publicar Empleo
          </button>
          <button
            className="dash-action-btn outline"
            onClick={() => navigate("/UserProfile")}
          >
            <FaUser /> Ver Perfil
          </button>
          <button
            className="dash-action-btn outline"
            onClick={() => navigate("/Home")}
          >
            <FaEye /> Ver Ofertas
          </button>
        </div>
      </div>
    </div>
  );
}
