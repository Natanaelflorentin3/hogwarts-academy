import type { ReactNode } from "react";
import { SearchX } from "lucide-react";

interface Props {
  titulo: string;
  descripcion?: string;
  accion?: ReactNode;
}

export function EstadoVacio({ titulo, descripcion, accion }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <SearchX className="text-slate-400" />
      <p className="font-medium text-slate-700">{titulo}</p>
      {descripcion && <p className="text-sm text-slate-500">{descripcion}</p>}
      {accion && <div className="mt-2">{accion}</div>}
    </div>
  );
}
