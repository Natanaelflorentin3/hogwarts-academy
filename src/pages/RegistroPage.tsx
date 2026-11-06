import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PlantillaAuth } from "../components/layout/PlantillaAuth";
import { Boton } from "../components/ui/Boton";
import { CampoTexto } from "../components/ui/CampoTexto";
import { mensajeError } from "../lib/errores";
import { authService, type RegistroDatos } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";

const formularioVacio: RegistroDatos = {
  nombre: "",
  apellido: "",
  username: "",
  email: "",
  password: "",
};

export function RegistroPage() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  const iniciarSesion = useAuthStore((s) => s.iniciarSesion);

  const [form, setForm] = useState<RegistroDatos>(formularioVacio);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  if (token) return <Navigate to="/inicio" replace />;

  // un solo handler para todos los campos: usa el name del input
  const cambiar = (campo: keyof RegistroDatos) => (valor: string) =>
    setForm((actual) => ({ ...actual, [campo]: valor }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      // el email es opcional: si está vacío no lo mandamos
      const datos: RegistroDatos = { ...form, email: form.email?.trim() || undefined };
      const sesion = await authService.registrar(datos);
      // la API ya devuelve la sesión → entra directo
      iniciarSesion(sesion.token, sesion.usuario);
      navigate("/inicio", { replace: true });
    } catch (err) {
      setError(mensajeError(err, "No se pudo crear la cuenta"));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <PlantillaAuth>
      <h1 className="text-2xl font-bold text-slate-900">Crear cuenta</h1>
      <p className="mt-1 text-sm text-slate-500">Regístrate como estudiante de Hogwarts Academy.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <CampoTexto
            id="nombre"
            etiqueta="Nombre"
            value={form.nombre}
            onChange={(e) => cambiar("nombre")(e.target.value)}
            required
          />
          <CampoTexto
            id="apellido"
            etiqueta="Apellido"
            value={form.apellido}
            onChange={(e) => cambiar("apellido")(e.target.value)}
            required
          />
        </div>
        <CampoTexto
          id="username"
          etiqueta="Usuario"
          placeholder="hgranger"
          autoComplete="username"
          ayuda="Mínimo 3 caracteres: letras, números, punto, guion."
          value={form.username}
          onChange={(e) => cambiar("username")(e.target.value)}
          required
        />
        <CampoTexto
          id="email"
          etiqueta="Email (opcional)"
          type="email"
          value={form.email ?? ""}
          onChange={(e) => cambiar("email")(e.target.value)}
        />
        <CampoTexto
          id="password"
          etiqueta="Contraseña"
          type="password"
          autoComplete="new-password"
          ayuda="Mínimo 8 caracteres, con mayúscula, minúscula y número."
          value={form.password}
          onChange={(e) => cambiar("password")(e.target.value)}
          required
        />

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <Boton type="submit" anchoCompleto disabled={enviando}>
          {enviando ? "Creando cuenta..." : "Crear cuenta"}
        </Boton>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="font-semibold text-marca-600 hover:text-marca-700">
          Inicia sesión
        </Link>
      </p>
    </PlantillaAuth>
  );
}
