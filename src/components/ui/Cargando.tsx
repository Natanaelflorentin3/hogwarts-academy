import { LoaderCircle } from "lucide-react";

interface Props {
  texto?: string;
}

export function Cargando({ texto = "Cargando..." }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-slate-500">
      <LoaderCircle size={28} className="animate-spin text-marca-600" />
      <p className="text-sm">{texto}</p>
      <p className="text-xs text-slate-400">
        La primera vez puede tardar hasta 50 segundos (la API se despierta).
      </p>
    </div>
  );
}
