import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllUsers } from "../services/authService";

const styles = {
  container: { maxWidth: 800, margin: "0 auto", padding: "32px 24px" },
  title: { fontSize: 24, fontWeight: 700, color: "#222", marginBottom: 24 },
  card: {
    background: "#fff",
    borderRadius: 10,
    padding: "14px 18px",
    marginBottom: 8,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#4a3f8c",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 16,
    flexShrink: 0,
  },
  name: { fontSize: 15, fontWeight: 600, color: "#333" },
  email: { fontSize: 13, color: "#888" },
  error: { color: "red", textAlign: "center", padding: 20 },
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getAllUsers();
        setUsers(userList);
      } catch (error) {
        setError("Error al obtener la lista de usuarios");
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Lista de Usuarios</h2>
        {error && <p style={styles.error}>{error}</p>}
        {users.map((user) => (
          <div key={user.id} style={styles.card}>
            <div style={styles.avatar}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={styles.name}>{user.name} {user.apellido}</div>
              <div style={styles.email}>{user.email}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;