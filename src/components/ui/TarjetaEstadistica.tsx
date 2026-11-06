import type { LucideIcon } from "lucide-react";
import { Tarjeta } from "./Tarjeta";

interface Props {
  titulo: string;
  valor: string | number;
  detalle?: string;
  icono: LucideIcon;
}

export function TarjetaEstadistica({ titulo, valor, detalle, icono: Icono }: Props) {
  return (
    <Tarjeta className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{titulo}</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{valor}</p>
          {detalle && <p className="mt-1 text-xs text-slate-500">{detalle}</p>}
        </div>
        <div className="rounded-lg bg-marca-50 p-2.5 text-marca-600">
          <Icono size={20} />
        </div>
      </div>
    </Tarjeta>
  );
}
