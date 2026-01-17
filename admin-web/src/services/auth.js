const API_URL = "https://agumentik-task-v9i2.onrender.com/api";

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  // Only admin allowed
  if (data.role !== "admin") {
    throw new Error("Access denied: Admin only");
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);

  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
