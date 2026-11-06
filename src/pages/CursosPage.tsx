import { useState } from "react";
import { Buscador } from "../components/cursos/Buscador";
import { TarjetaCurso } from "../components/cursos/TarjetaCurso";
import { Boton } from "../components/ui/Boton";
import { Cargando } from "../components/ui/Cargando";
import { EncabezadoPagina } from "../components/ui/EncabezadoPagina";
import { EstadoVacio } from "../components/ui/EstadoVacio";
import { MensajeError } from "../components/ui/MensajeError";
import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";

export function CursosPage() {
  // los hooks van arriba, antes de cualquier return
  const { data, cargando, error, recargar } = useApi(() => cursosService.getTodos());
  const [busqueda, setBusqueda] = useState("");

  const texto = busqueda.trim().toLowerCase();
  const cursos = (data ?? []).filter(
    (c) => c.nombre.toLowerCase().includes(texto) || c.codigo.toLowerCase().includes(texto),
  );

  return (
    <>
      <EncabezadoPagina
        titulo="Cursos disponibles"
        descripcion="Elige un curso e inscríbete mientras haya cupos."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Buscador valor={busqueda} onCambiar={setBusqueda} />
        {data && (
          <p className="text-sm text-slate-500">
            {cursos.length} de {data.length} curso{data.length === 1 ? "" : "s"}
          </p>
        )}
      </div>

      {cargando ? (
        <Cargando texto="Cargando cursos..." />
      ) : error ? (
        <MensajeError mensaje={error} onReintentar={recargar} />
      ) : cursos.length === 0 ? (
        busqueda ? (
          <EstadoVacio
            titulo="Sin resultados"
            descripcion={`Ningún curso coincide con “${busqueda}”.`}
            accion={
              <Boton variante="secundario" onClick={() => setBusqueda("")}>
                Limpiar búsqueda
              </Boton>
            }
          />
        ) : (
          <EstadoVacio titulo="Todavía no hay cursos" descripcion="Vuelve más tarde." />
        )
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cursos.map((curso) => (
            <TarjetaCurso key={curso.id} curso={curso} />
          ))}
        </div>
      )}
    </>
  );
}
