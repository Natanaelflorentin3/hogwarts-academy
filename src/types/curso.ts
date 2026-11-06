import type { UsuarioResumen } from "./usuario";

// Tal cual lo devuelve GET /cursos (no hay horario ni categoría)
export interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  creditos: number;
  cupo: number;
  inscritos: number;
  disponibles: number;
  docente: UsuarioResumen | null;
}
