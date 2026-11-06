import { Search } from "lucide-react";

interface Props {
  valor: string;
  onCambiar: (valor: string) => void;
}

// El hijo avisa, el padre decide: el texto vive en CursosPage
export function Buscador({ valor, onCambiar }: Props) {
  return (
    <div className="relative w-full sm:w-80">
      <Search size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
      <input
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
        placeholder="Buscar por nombre o código..."
        className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-3 pl-10 text-sm focus:border-marca-500 focus:ring-4 focus:ring-marca-100 focus:outline-none"
      />
    </div>
  );
}
