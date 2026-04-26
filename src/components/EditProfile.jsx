import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileUpload,
} from "react-icons/fa";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ubicacion: "",
    descripcion: "",
    cv: null,
    foto: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && e.target.name === "foto") {
      setPreviewImage(URL.createObjectURL(file));
    }
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar los datos al backend
    console.log(formData);
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-wrapper">
        <div className="edit-profile-card">
          <h2>Editar Perfil</h2>

          <form onSubmit={handleSubmit} className="edit-profile-form">
            <div className="photo-upload-section">
              <div className="profile-photo">
                {previewImage ? (
                  <img src={previewImage} alt="Vista previa" />
                ) : (
                  <FaUser className="default-avatar" />
                )}
              </div>
              <div className="upload-btn-wrapper">
                <button type="button" className="upload-btn">
                  <FaFileUpload /> Cambiar foto
                </button>
                <input
                  type="file"
                  name="foto"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>
                  <FaUser className="input-icon" />
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaEnvelope className="input-icon" />
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaPhone className="input-icon" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Tu número de teléfono"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaMapMarkerAlt className="input-icon" />
                  Ubicación
                </label>
                <input
                  type="text"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  placeholder="Tu ubicación"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Descripción profesional</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Cuéntanos sobre ti y tu experiencia profesional..."
                rows="4"
              />
            </div>

            <div className="cv-upload-section">
              <div className="upload-btn-wrapper">
                <button
                  type="button"
                  className="upload-btn"
                  onClick={() => document.getElementById("cv-input").click()}
                >
                  <FaFileUpload /> Subir CV
                </button>
                <input
                  type="file"
                  id="cv-input"
                  name="cv"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }} // Ocultamos el input
                />
              </div>
              {formData.cv && (
                <span className="file-name">{formData.cv.name}</span>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn">
                Cancelar
              </button>
              <button type="submit" className="save-btn">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
