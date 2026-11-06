import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, User } from "lucide-react";
import { CuposCurso } from "../components/cursos/CuposCurso";
import { Boton } from "../components/ui/Boton";
import { Cargando } from "../components/ui/Cargando";
import { MensajeError } from "../components/ui/MensajeError";
import { Tarjeta } from "../components/ui/Tarjeta";
import { useApi } from "../hooks/useApi";
import { mensajeError } from "../lib/errores";
import { nombreDocente } from "../lib/formato";
import { cursosService } from "../services/cursos";
import { inscripcionesService } from "../services/inscripciones";
import { useAuthStore } from "../store/useAuthStore";
import { NoEncontradaPage } from "./NoEncontradaPage";

export function CursoDetallePage() {
  // el id de la URL llega como texto
  const { id } = useParams();
  const cursoId = Number(id);
  const esEstudiante = useAuthStore((s) => s.usuario?.rol === "ESTUDIANTE");

  // todos los hooks arriba
  const curso = useApi(() => cursosService.getPorId(cursoId), [cursoId]);
  const inscripciones = useApi(
    () => (esEstudiante ? inscripcionesService.getMias() : Promise.resolve([])),
    [esEstudiante],
  );
  const [enviando, setEnviando] = useState(false);
  const [errorInscripcion, setErrorInscripcion] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  if (!Number.isInteger(cursoId) || cursoId <= 0) return <NoEncontradaPage />;

  if (curso.cargando) return <Cargando texto="Cargando curso..." />;
  if (curso.error || !curso.data) {
    return (
      <MensajeError mensaje={curso.error ?? "No se encontró el curso"} onReintentar={curso.recargar} />
    );
  }

  const datos = curso.data;
  const inscrito = (inscripciones.data ?? []).some(
    (i) => i.curso.id === datos.id && i.estado === "ACTIVA",
  );
  const sinCupos = datos.disponibles <= 0;

  const handleInscribirme = async () => {
    setErrorInscripcion(null);
    setExito(false);
    setEnviando(true);
    try {
      await inscripcionesService.inscribirme(datos.id);
      setExito(true);
      // volvemos a pedir el curso (cupos nuevos) y mis inscripciones (para mostrar "Inscrito")
      curso.recargar();
      inscripciones.recargar();
    } catch (err) {
      setErrorInscripcion(mensajeError(err, "No se pudo completar la inscripción"));
    } finally {
      setEnviando(false);
    }
  };

  const textoBoton = enviando
    ? "Inscribiendo..."
    : inscrito
      ? "Inscrito"
      : sinCupos
        ? "Sin cupos"
        : "Inscribirme";

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/cursos"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-marca-700"
      >
        <ArrowLeft size={16} /> Volver a cursos
      </Link>

      <Tarjeta className="overflow-hidden">
        <div className="bg-gradient-to-br from-marca-900 to-marca-700 p-6 text-white sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-xs">{datos.codigo}</span>
            <span className="rounded-full bg-dorado px-2.5 py-0.5 text-xs font-semibold text-marca-900">
              {datos.creditos} créditos
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{datos.nombre}</h1>
          <p className="mt-2 flex items-center gap-2 text-marca-100">
            <User size={16} /> {nombreDocente(datos.docente)}
          </p>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <section>
            <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">Descripción</h2>
            <p className="mt-2 text-slate-700">{datos.descripcion ?? "Este curso no tiene descripción."}</p>
          </section>

          <section className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-2xl font-bold text-slate-900">{datos.cupo}</p>
              <p className="text-xs text-slate-500">Cupo total</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-2xl font-bold text-slate-900">{datos.inscritos}</p>
              <p className="text-xs text-slate-500">Inscritos</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-2xl font-bold text-slate-900">{datos.disponibles}</p>
              <p className="text-xs text-slate-500">Disponibles</p>
            </div>
          </section>

          <CuposCurso curso={datos} />

          {exito && (
            <p className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              <CheckCircle2 size={16} /> ¡Listo! Ya estás inscrito en este curso.
            </p>
          )}
          {errorInscripcion && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorInscripcion}
            </p>
          )}

          {esEstudiante ? (
            <Boton
              anchoCompleto
              variante={inscrito ? "secundario" : "primario"}
              disabled={enviando || inscrito || sinCupos || inscripciones.cargando}
              onClick={handleInscribirme}
            >
              {textoBoton}
            </Boton>
          ) : (
            <p className="rounded-lg bg-slate-50 px-3 py-2 text-center text-sm text-slate-500">
              Solo los estudiantes pueden inscribirse desde aquí.
            </p>
          )}
        </div>
      </Tarjeta>
    </div>
  );
}
