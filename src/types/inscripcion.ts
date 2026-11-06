import type { UsuarioResumen } from "./usuario";

export type EstadoInscripcion = "ACTIVA" | "RETIRADA" | "FINALIZADA";

export interface Inscripcion {
  id: number;
  estado: EstadoInscripcion;
  fecha: string;
  estudiante: UsuarioResumen;
  // en la inscripción el curso viene resumido
  curso: {
    id: number;
    codigo: string;
    nombre: string;
    creditos: number;
  };
  promedio: number | null;
}
