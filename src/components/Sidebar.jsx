// src/components/Sidebar.js
import React from "react";
import "../styles/Sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [jobCategory, setJobCategory] = useState([]);
  const handleCategoryClick = (category) => {
    console.log(`Categoría ${category} seleccionada`);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/Categoria/Obtener",
        );
        setJobCategory(response.data);
      } catch (error) {
        console.error("Error al obtener los trabajos:", error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-title">Categorías</div>
      {jobCategory.map((category) => (
        <button
          key={category.id}
          className="sidebar-btn"
          onClick={() => handleCategoryClick(category)}
        >
          {category.nombre}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
