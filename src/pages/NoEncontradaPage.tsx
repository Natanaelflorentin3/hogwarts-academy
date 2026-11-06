import { Link } from "react-router-dom";
import { WandSparkles } from "lucide-react";

export function NoEncontradaPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-full bg-marca-50 p-4 text-marca-600">
        <WandSparkles size={32} />
      </div>
      <p className="mt-4 text-6xl font-bold text-marca-700">404</p>
      <h1 className="mt-2 text-xl font-semibold text-slate-900">Esta página desapareció</h1>
      <p className="mt-1 text-sm text-slate-500">La dirección que buscas no existe en la academia.</p>
      <Link
        to="/inicio"
        className="mt-6 rounded-lg bg-marca-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-marca-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
