import { api } from "../lib/axios";
import type { RespuestaApi, RespuestaLista } from "../types/api";
import type { Inscripcion } from "../types/inscripcion";

export const inscripcionesService = {
  // un ESTUDIANTE recibe solo las suyas
  getMias: async (): Promise<Inscripcion[]> => {
    const respuesta = await api.get<RespuestaLista<Inscripcion>>("/inscripciones", {
      params: { limit: 100 },
    });
    return respuesta.data.data;
  },

  inscribirme: async (cursoId: number): Promise<Inscripcion> => {
    const respuesta = await api.post<RespuestaApi<Inscripcion>>("/inscripciones", {
      cursoId,
    });
    return respuesta.data.data;
  },
};
