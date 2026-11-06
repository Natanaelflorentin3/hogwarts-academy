import type { ReactNode } from "react";

interface Props {
  nombre: string;
  mensaje: string;
  accion?: ReactNode;
}

export function Bienvenida({ nombre, mensaje, accion }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-marca-900 to-marca-700 p-6 text-white sm:p-8">
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-dorado/20 blur-2xl" />
      <p className="relative text-sm text-marca-200">Bienvenido de nuevo</p>
      <h1 className="relative mt-1 text-2xl font-bold sm:text-3xl">¡Hola, {nombre}!</h1>
      <p className="relative mt-2 max-w-xl text-marca-100">{mensaje}</p>
      {accion && <div className="relative mt-5">{accion}</div>}
    </div>
  );
}
