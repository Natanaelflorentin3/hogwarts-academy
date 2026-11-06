import { api } from "../lib/axios";
import type { RespuestaLista } from "../types/api";
import type { Usuario } from "../types/usuario";

export const usuariosService = {
  // total de estudiantes para el inicio del admin (usamos meta.total)
  getTotalEstudiantes: async (): Promise<number> => {
    const respuesta = await api.get<RespuestaLista<Usuario>>("/usuarios", {
      params: { rol: "ESTUDIANTE", limit: 1 },
    });
    return respuesta.data.meta.total;
  },
};
