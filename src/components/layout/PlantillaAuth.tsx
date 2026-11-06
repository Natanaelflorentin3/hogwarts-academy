import type { ReactNode } from "react";
import { Logo } from "../ui/Logo";

interface Props {
  children: ReactNode;
}

// Pantalla partida que comparten Login y Registro
export function PlantillaAuth({ children }: Props) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-marca-900 p-12 text-white lg:flex">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-marca-600/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-dorado/15 blur-3xl" />

        <div className="relative">
          <Logo claro />
        </div>

        <div className="relative max-w-md">
          <h2 className="text-4xl leading-tight font-bold">
            Tu carta de admisión <span className="text-dorado">ya llegó.</span>
          </h2>
          <p className="mt-4 text-marca-100">
            Explora los cursos, inscríbete mientras haya cupos y sigue tu avance en un solo lugar.
          </p>
        </div>

        <p className="relative text-sm text-marca-200">Hogwarts Academy · Proyecto de práctica</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
