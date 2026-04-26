import React, { useState } from "react";
import Navbar from "../components/Navbar";

// Estilos básicos simulados (puedes mover esto a un CSS file)
const styles = {
  container: { display: "flex", height: "100vh", fontFamily: "Arial" },
  main: { flex: 1, padding: "20px" },
};

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <main style={styles.main}>
          <h1>Bienvenido al Dashboard</h1>
        </main>
      </div>
    </>
  );
}
