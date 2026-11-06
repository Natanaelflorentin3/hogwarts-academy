// Respuesta de la API para un solo objeto
export interface RespuestaApi<T> {
  success: boolean;
  message?: string;
  data: T;
}

// Datos de paginación que vienen en las listas
export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Respuesta de la API para listas (GET /cursos, /inscripciones, /usuarios)
export interface RespuestaLista<T> {
  success: boolean;
  data: T[];
  meta: Meta;
}
