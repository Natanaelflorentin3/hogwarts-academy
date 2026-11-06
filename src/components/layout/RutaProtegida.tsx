import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import type { Rol } from "../../types/usuario";

interface Props {
  roles?: Rol[]; // si no se pasa, alcanza con tener sesión
}

export function RutaProtegida({ roles }: Props) {
  const token = useAuthStore((s) => s.token);
  const usuario = useAuthStore((s) => s.usuario);

  // sin sesión → al login
  if (!token || !usuario) return <Navigate to="/login" replace />;

  // con sesión pero sin el rol necesario → al inicio
  if (roles && !roles.includes(usuario.rol)) return <Navigate to="/inicio" replace />;

  return <Outlet />;
}
