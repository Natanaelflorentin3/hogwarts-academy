import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Usuario } from "../types/usuario";

interface AuthState {
  token: string | null;
  usuario: Usuario | null;
  iniciarSesion: (token: string, usuario: Usuario) => void;
  cerrarSesion: () => void;
}

// persist: la sesión queda guardada aunque recargues la página
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      usuario: null,
      iniciarSesion: (token, usuario) => set({ token, usuario }),
      cerrarSesion: () => set({ token: null, usuario: null }),
    }),
    { name: "sesion-hogwarts" },
  ),
);
