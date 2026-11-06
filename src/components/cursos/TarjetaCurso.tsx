import { Link } from "react-router-dom";
import { User } from "lucide-react";
import type { Curso } from "../../types/curso";
import { nombreDocente } from "../../lib/formato";
import { Tarjeta } from "../ui/Tarjeta";
import { CuposCurso } from "./CuposCurso";

export function TarjetaCurso({ curso }: { curso: Curso }) {
  const lleno = curso.disponibles <= 0;

  return (
    <Tarjeta className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className="h-1.5 bg-gradient-to-r from-marca-700 via-marca-500 to-dorado" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-marca-50 px-2.5 py-0.5 text-xs font-medium text-marca-700">
            {curso.creditos} créditos
          </span>
          <span className="font-mono text-xs text-slate-400">{curso.codigo}</span>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-slate-900">{curso.nombre}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {curso.descripcion ?? "Sin descripción"}
        </p>

        <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <User size={15} className="text-slate-400" /> {nombreDocente(curso.docente)}
        </p>

        <div className="mt-4">
          <CuposCurso curso={curso} />
        </div>

        <div className="mt-auto pt-5">
          <Link
            to={`/cursos/${curso.id}`}
            className="block rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {lleno ? "Ver detalle (sin cupos)" : "Ver detalle"}
          </Link>
        </div>
      </div>
    </Tarjeta>
  );
}
