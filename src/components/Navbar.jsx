import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">VALLEJOBS</div>
      <div className="search-bar">
        <input type="text" placeholder="Buscar empleos..." />
        <button className="search-btn">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="nav-buttons">
        <button
          className="register-btn"
          onClick={() => (window.location.href = "/registro")}
        >
          REGISTRAR
        </button>
        <button
          className="login-btn"
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
