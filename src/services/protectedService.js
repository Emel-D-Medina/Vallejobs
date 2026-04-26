import { getToken } from "./authService";

export const fetchProtectedData = async () => {
  const token = getToken();

  const response = await fetch("https://localhost:3000/UserList", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch protected data");
  }

  return response.json();
};
