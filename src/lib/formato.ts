import type { UsuarioResumen } from "../types/usuario";

export const nombreDocente = (docente: UsuarioResumen | null): string =>
  docente ? `${docente.nombre} ${docente.apellido}` : "Sin docente asignado";

export const formatearFecha = (fechaIso: string): string =>
  new Date(fechaIso).toLocaleDateString("es-AR", { dateStyle: "medium" });
