export type Rol = "ADMIN" | "DOCENTE" | "ESTUDIANTE";

export interface Usuario {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string | null;
  rol: Rol;
  fotoUrl: string | null;
  activo: boolean;
}

// Versión corta que viene dentro de un curso o una inscripción
export interface UsuarioResumen {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  fotoUrl: string | null;
}
