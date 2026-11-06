import { Navigate } from "react-router-dom";
import { InicioAdmin } from "../components/inicio/InicioAdmin";
import { InicioEstudiante } from "../components/inicio/InicioEstudiante";
import { useAuthStore } from "../store/useAuthStore";

export function InicioPage() {
  const usuario = useAuthStore((s) => s.usuario);

  if (!usuario) return <Navigate to="/login" replace />;

  return usuario.rol === "ADMIN" ? (
    <InicioAdmin usuario={usuario} />
  ) : (
    <InicioEstudiante usuario={usuario} />
  );
}
