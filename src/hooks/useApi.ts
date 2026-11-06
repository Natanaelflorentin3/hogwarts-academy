import { useEffect, useState } from "react";
import { mensajeError } from "../lib/errores";

// Maneja cargando / error / datos / reintentar para cualquier pedido a la API
export function useApi<T>(pedir: () => Promise<T>, dependencias: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setError(null);

    pedir()
      .then((resultado) => {
        if (!cancelado) setData(resultado);
      })
      .catch((err: unknown) => {
        if (!cancelado) setError(mensajeError(err, "No se pudieron cargar los datos"));
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    // si el componente se desmonta o cambian las dependencias, ignoramos la respuesta vieja
    return () => {
      cancelado = true;
    };
  }, [intento, ...dependencias]);

  const recargar = () => setIntento((n) => n + 1);

  return { data, cargando, error, recargar };
}
