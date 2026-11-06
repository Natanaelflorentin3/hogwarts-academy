import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { PlantillaAuth } from "../components/layout/PlantillaAuth";
import { Boton } from "../components/ui/Boton";
import { CampoTexto } from "../components/ui/CampoTexto";
import { mensajeError } from "../lib/errores";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";

export function LoginPage() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  const iniciarSesion = useAuthStore((s) => s.iniciarSesion);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  // si ya hay sesión, no tiene sentido mostrar el login
  if (token) return <Navigate to="/inicio" replace />;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      const sesion = await authService.login({ username, password });
      iniciarSesion(sesion.token, sesion.usuario);
      navigate("/inicio", { replace: true });
    } catch (err) {
      setError(mensajeError(err, "Usuario o contraseña incorrectos"));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <PlantillaAuth>
      <h1 className="text-2xl font-bold text-slate-900">Iniciar sesión</h1>
      <p className="mt-1 text-sm text-slate-500">Ingresa con tu usuario de Hogwarts Academy.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <CampoTexto
          id="username"
          etiqueta="Usuario"
          icono={<User size={16} />}
          placeholder="hpotter"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <CampoTexto
          id="password"
          etiqueta="Contraseña"
          type="password"
          icono={<Lock size={16} />}
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <Boton type="submit" anchoCompleto disabled={enviando}>
          {enviando ? "Ingresando..." : "Ingresar"}
        </Boton>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        ¿No tienes cuenta?{" "}
        <Link to="/registro" className="font-semibold text-marca-600 hover:text-marca-700">
          Regístrate como estudiante
        </Link>
      </p>
    </PlantillaAuth>
  );
}
