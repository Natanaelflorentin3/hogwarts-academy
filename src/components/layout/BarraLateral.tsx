import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Logo } from "../ui/Logo";
import { menuPara } from "./menu";

const claseEnlace = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-white/10 text-white" : "text-marca-100 hover:bg-white/5 hover:text-white"
  }`;

export function BarraLateral() {
  const navigate = useNavigate();
  const usuario = useAuthStore((s) => s.usuario);
  const cerrarSesion = useAuthStore((s) => s.cerrarSesion);

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-marca-900 lg:flex">
      <div className="px-6 py-5">
        <Logo claro />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuPara(usuario?.rol).map(({ ruta, texto, icono: Icono }) => (
          <NavLink key={ruta} to={ruta} className={claseEnlace}>
            <Icono size={18} />
            {texto}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-marca-100 hover:bg-white/5 hover:text-white"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
