// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { isLoggedIn } from "../services/authService";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import "../styles/Home.css";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const isUserLoggedIn = isLoggedIn();
      setLoggedIn(isUserLoggedIn);
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="content">
        <Sidebar />
        <MainContent />
      </div>
      {loggedIn && (
        <button className="menu-button">
          <FaBars />
        </button>
      )}
    </div>
  );
};

export default Home;
