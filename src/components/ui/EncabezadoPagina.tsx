interface Props {
  titulo: string;
  descripcion?: string;
}

export function EncabezadoPagina({ titulo, descripcion }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-slate-900">{titulo}</h1>
      {descripcion && <p className="mt-1 text-sm text-slate-500">{descripcion}</p>}
    </div>
  );
}
