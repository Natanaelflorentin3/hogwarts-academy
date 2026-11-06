import { Link } from "react-router-dom";
import { Cargando } from "../components/ui/Cargando";
import { EncabezadoPagina } from "../components/ui/EncabezadoPagina";
import { EstadoVacio } from "../components/ui/EstadoVacio";
import { InsigniaEstado } from "../components/ui/InsigniaEstado";
import { MensajeError } from "../components/ui/MensajeError";
import { Tarjeta } from "../components/ui/Tarjeta";
import { useApi } from "../hooks/useApi";
import { formatearFecha } from "../lib/formato";
import { inscripcionesService } from "../services/inscripciones";

export function MisInscripcionesPage() {
  const { data, cargando, error, recargar } = useApi(() => inscripcionesService.getMias());

  return (
    <>
      <EncabezadoPagina titulo="Mis inscripciones" descripcion="Los cursos en los que te inscribiste." />

      {cargando ? (
        <Cargando texto="Cargando tus inscripciones..." />
      ) : error ? (
        <MensajeError mensaje={error} onReintentar={recargar} />
      ) : !data || data.length === 0 ? (
        <EstadoVacio
          titulo="Todavía no tienes inscripciones"
          descripcion="Elige un curso y empieza a aprender."
          accion={
            <Link to="/cursos" className="text-sm font-semibold text-marca-600 hover:text-marca-700">
              Ver cursos disponibles
            </Link>
          }
        />
      ) : (
        <Tarjeta>
          <ul className="divide-y divide-slate-100">
            {data.map((i) => (
              <li key={i.id}>
                <Link
                  to={`/cursos/${i.curso.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-slate-50"
                >
                  <div>
                    <p className="font-medium text-slate-800">{i.curso.nombre}</p>
                    <p className="text-xs text-slate-500">
                      <span className="font-mono">{i.curso.codigo}</span> · {i.curso.creditos} créditos ·
                      inscrito el {formatearFecha(i.fecha)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {i.promedio !== null && (
                      <span className="text-sm text-slate-600">Promedio {i.promedio}</span>
                    )}
                    <InsigniaEstado estado={i.estado} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Tarjeta>
      )}
    </>
  );
}
