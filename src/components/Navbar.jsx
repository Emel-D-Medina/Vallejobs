import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { isLoggedIn, logout } from "../services/authService";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/Home");
  };

  const handleNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const renderButtons = (mobile) => {
    const cls = mobile ? "mobile-menu" : "nav-buttons";
    if (mobile && !menuOpen) return null;
    const btnClass = (type) => mobile ? `${type}` : type;

    return (
      <div className={cls}>
        {loggedIn ? (
          <>
            <button className={btnClass("nav-btn")} onClick={() => handleNav("/Home")}>Inicio</button>
            <button className={btnClass("nav-btn")} onClick={() => handleNav("/dashboard")}>Dashboard</button>
            <button className={btnClass("nav-btn")} onClick={() => handleNav("/CreateJob")}>Publicar Empleo</button>
            <button className={btnClass("nav-btn")} onClick={() => handleNav("/UserProfile")}>Mi Perfil</button>
            <button className={btnClass("logout-btn")} onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <button className={btnClass("register-btn")} onClick={() => handleNav("/registro")}>REGISTRAR</button>
            <button className={btnClass("login-btn")} onClick={() => handleNav("/login")}>Login</button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/Home")}>
        VALLEJOBS
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Buscar empleos..." />
        <button className="search-btn">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {renderButtons(false)}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>
      {renderButtons(true)}
    </div>
  );
};

export default Navbar;
