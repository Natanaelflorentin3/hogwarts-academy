import { api } from "../lib/axios";
import type { RespuestaApi, RespuestaLista } from "../types/api";
import type { Curso } from "../types/curso";

export const cursosService = {
  // sin limit la API devuelve solo 10
  getTodos: async (): Promise<Curso[]> => {
    const respuesta = await api.get<RespuestaLista<Curso>>("/cursos", {
      params: { limit: 100 },
    });
    return respuesta.data.data;
  },

  getPorId: async (id: number): Promise<Curso> => {
    const respuesta = await api.get<RespuestaApi<Curso>>(`/cursos/${id}`);
    return respuesta.data.data;
  },

  // solo necesitamos el total (meta.total), por eso pedimos 1
  getTotal: async (): Promise<number> => {
    const respuesta = await api.get<RespuestaLista<Curso>>("/cursos", {
      params: { limit: 1 },
    });
    return respuesta.data.meta.total;
  },
};
