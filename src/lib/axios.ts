import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export const api = axios.create({
  // viene del .env (ver .env.example)
  baseURL: import.meta.env.VITE_API_URL,
});

// Antes de cada petición: si hay sesión, mandamos el token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si el token venció (401), cerramos la sesión y volvemos al login
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const esLogin = error.config?.url?.includes("/auth/");
    if (error.response?.status === 401 && !esLogin) {
      useAuthStore.getState().cerrarSesion();
      window.location.replace("/login");
    }
    return Promise.reject(error);
  },
);
