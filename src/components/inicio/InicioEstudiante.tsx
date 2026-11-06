import { Link } from "react-router-dom";
import { BookOpen, GraduationCap } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { inscripcionesService } from "../../services/inscripciones";
import type { Usuario } from "../../types/usuario";
import { Cargando } from "../ui/Cargando";
import { MensajeError } from "../ui/MensajeError";
import { Tarjeta } from "../ui/Tarjeta";
import { TarjetaEstadistica } from "../ui/TarjetaEstadistica";
import { Bienvenida } from "./Bienvenida";

export function InicioEstudiante({ usuario }: { usuario: Usuario }) {
  const { data, cargando, error, recargar } = useApi(() => inscripcionesService.getMias());

  const activas = (data ?? []).filter((i) => i.estado === "ACTIVA");
  const creditos = activas.reduce((total, i) => total + i.curso.creditos, 0);

  return (
    <div className="space-y-6">
      <Bienvenida
        nombre={usuario.nombre}
        mensaje={
          cargando
            ? "Revisando tus cursos..."
            : `Tienes ${activas.length} curso${activas.length === 1 ? "" : "s"} activo${activas.length === 1 ? "" : "s"}.`
        }
        accion={
          <Link
            to="/cursos"
            className="inline-block rounded-lg bg-dorado px-4 py-2 text-sm font-semibold text-marca-900 hover:bg-amber-300"
          >
            Explorar cursos
          </Link>
        }
      />

      {cargando ? (
        <Cargando texto="Cargando tus inscripciones..." />
      ) : error ? (
        <MensajeError mensaje={error} onReintentar={recargar} />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <TarjetaEstadistica
              titulo="Cursos inscritos"
              valor={activas.length}
              detalle={`De ${data?.length ?? 0} inscripciones en total`}
              icono={BookOpen}
            />
            <TarjetaEstadistica
              titulo="Créditos"
              valor={creditos}
              detalle="Suma de tus cursos activos"
              icono={GraduationCap}
            />
          </div>

          <Tarjeta>
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">Mis cursos activos</h2>
              <Link to="/inscripciones" className="text-sm font-medium text-marca-600 hover:text-marca-700">
                Ver todas
              </Link>
            </div>
            {activas.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-slate-500">
                Todavía no estás inscrito en ningún curso.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {activas.map((i) => (
                  <li key={i.id}>
                    <Link
                      to={`/cursos/${i.curso.id}`}
                      className="flex items-center justify-between px-5 py-3 hover:bg-slate-50"
                    >
                      <div>
                        <p className="font-medium text-slate-800">{i.curso.nombre}</p>
                        <p className="font-mono text-xs text-slate-400">{i.curso.codigo}</p>
                      </div>
                      <span className="text-sm text-slate-500">{i.curso.creditos} créditos</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Tarjeta>
        </>
      )}
    </div>
  );
}
