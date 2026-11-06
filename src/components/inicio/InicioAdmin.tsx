import { BookOpen, Users } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { cursosService } from "../../services/cursos";
import { usuariosService } from "../../services/usuarios";
import type { Usuario } from "../../types/usuario";
import { Cargando } from "../ui/Cargando";
import { MensajeError } from "../ui/MensajeError";
import { TarjetaEstadistica } from "../ui/TarjetaEstadistica";
import { Bienvenida } from "./Bienvenida";

export function InicioAdmin({ usuario }: { usuario: Usuario }) {
  // las dos peticiones salen a la vez
  const { data, cargando, error, recargar } = useApi(async () => {
    const [totalCursos, totalEstudiantes] = await Promise.all([
      cursosService.getTotal(),
      usuariosService.getTotalEstudiantes(),
    ]);
    return { totalCursos, totalEstudiantes };
  });

  return (
    <div className="space-y-6">
      <Bienvenida nombre={usuario.nombre} mensaje="Este es el resumen de la academia." />

      {cargando ? (
        <Cargando texto="Cargando el resumen..." />
      ) : error ? (
        <MensajeError mensaje={error} onReintentar={recargar} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <TarjetaEstadistica
            titulo="Total de cursos"
            valor={data?.totalCursos ?? 0}
            detalle="Cursos registrados en la API"
            icono={BookOpen}
          />
          <TarjetaEstadistica
            titulo="Total de estudiantes"
            valor={data?.totalEstudiantes ?? 0}
            detalle="Usuarios con rol estudiante"
            icono={Users}
          />
        </div>
      )}
    </div>
  );
}
