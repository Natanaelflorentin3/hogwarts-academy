import type { Curso } from "../../types/curso";
import { BarraProgreso } from "../ui/BarraProgreso";

export function CuposCurso({ curso }: { curso: Curso }) {
  const porcentaje = curso.cupo > 0 ? (curso.inscritos / curso.cupo) * 100 : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-slate-500">
        <span>
          Cupos ocupados · {curso.disponibles} disponible{curso.disponibles === 1 ? "" : "s"}
        </span>
        <span className="font-medium text-slate-700">
          {curso.inscritos}/{curso.cupo}
        </span>
      </div>
      <BarraProgreso valor={porcentaje} />
    </div>
  );
}
