import type { EstadoInscripcion } from "../../types/inscripcion";

const estilos: Record<EstadoInscripcion, string> = {
  ACTIVA: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  RETIRADA: "bg-red-50 text-red-700 ring-red-200",
  FINALIZADA: "bg-slate-100 text-slate-600 ring-slate-200",
};

const textos: Record<EstadoInscripcion, string> = {
  ACTIVA: "Activa",
  RETIRADA: "Retirada",
  FINALIZADA: "Finalizada",
};

export function InsigniaEstado({ estado }: { estado: EstadoInscripcion }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${estilos[estado]}`}>
      {textos[estado]}
    </span>
  );
}
