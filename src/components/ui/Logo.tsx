import { WandSparkles } from "lucide-react";

interface Props {
  claro?: boolean; // texto blanco (para fondos oscuros)
}

export function Logo({ claro = false }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="rounded-lg bg-marca-700 p-1.5 text-dorado ring-1 ring-dorado/40">
        <WandSparkles size={22} />
      </div>
      <div>
        <p className={`text-sm font-bold ${claro ? "text-white" : "text-slate-900"}`}>
          Hogwarts Academy
        </p>
        <p className={`text-xs ${claro ? "text-marca-200" : "text-slate-500"}`}>
          Escuela de magia y código
        </p>
      </div>
    </div>
  );
}
