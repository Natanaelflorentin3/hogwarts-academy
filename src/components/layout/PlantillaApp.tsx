import { Outlet } from "react-router-dom";
import { BarraLateral } from "./BarraLateral";
import { BarraSuperior } from "./BarraSuperior";

export function PlantillaApp() {
  return (
    <div className="flex min-h-screen">
      <BarraLateral />
      <div className="flex min-w-0 flex-1 flex-col">
        <BarraSuperior />
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
