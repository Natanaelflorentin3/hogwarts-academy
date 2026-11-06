import { CircleAlert } from "lucide-react";
import { Boton } from "./Boton";

interface Props {
  mensaje: string;
  onReintentar?: () => void;
}

export function MensajeError({ mensaje, onReintentar }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <CircleAlert className="text-red-500" />
      <p className="text-sm text-red-700">{mensaje}</p>
      {onReintentar && (
        <Boton variante="peligro" onClick={onReintentar}>
          Reintentar
        </Boton>
      )}
    </div>
  );
}
