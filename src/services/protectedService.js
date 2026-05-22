import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5000";

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const fetchProtectedData = async () => {
  const response = await axios.get(`${API_URL}/Usuarios/obtener`, authHeaders());
  return response.data;
};
