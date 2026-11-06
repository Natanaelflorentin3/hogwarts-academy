import { BookOpen, ClipboardList, LayoutDashboard, type LucideIcon } from "lucide-react";
import type { Rol } from "../../types/usuario";

interface ItemMenu {
  ruta: string;
  texto: string;
  icono: LucideIcon;
  roles?: Rol[]; // si no tiene, lo ven todos
}

export const menu: ItemMenu[] = [
  { ruta: "/inicio", texto: "Inicio", icono: LayoutDashboard },
  { ruta: "/cursos", texto: "Cursos", icono: BookOpen },
  { ruta: "/inscripciones", texto: "Mis inscripciones", icono: ClipboardList, roles: ["ESTUDIANTE"] },
];

export const menuPara = (rol: Rol | undefined) =>
  menu.filter((item) => !item.roles || (rol !== undefined && item.roles.includes(rol)));
