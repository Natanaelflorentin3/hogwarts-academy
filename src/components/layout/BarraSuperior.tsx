import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Logo } from "../ui/Logo";
import { menuPara } from "./menu";

const textoRol = { ADMIN: "Administrador", DOCENTE: "Docente", ESTUDIANTE: "Estudiante" } as const;

export function BarraSuperior() {
  const navigate = useNavigate();
  const usuario = useAuthStore((s) => s.usuario);
  const cerrarSesion = useAuthStore((s) => s.cerrarSesion);

  const iniciales = usuario ? `${usuario.nombre[0] ?? ""}${usuario.apellido[0] ?? ""}`.toUpperCase() : "";

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login", { replace: true });
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* En celular no hay barra lateral: mostramos el logo acá */}
        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="hidden lg:block" />

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {usuario?.nombre} {usuario?.apellido}
            </p>
            <p className="text-xs text-slate-500">{usuario && textoRol[usuario.rol]}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-marca-100 text-sm font-semibold text-marca-700">
            {iniciales}
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Cerrar sesión"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Menú horizontal para celular */}
      <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-2 py-2 lg:hidden">
        {menuPara(usuario?.rol).map(({ ruta, texto, icono: Icono }) => (
          <NavLink
            key={ruta}
            to={ruta}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
                isActive ? "bg-marca-50 text-marca-700" : "text-slate-600"
              }`
            }
          >
            <Icono size={16} />
            {texto}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
