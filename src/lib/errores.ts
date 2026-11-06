import axios from "axios";

interface ErrorApi {
  message?: string;
  details?: { campo: string; mensaje: string }[];
}

// Saca el mensaje más útil de un error de la API
export function mensajeError(error: unknown, porDefecto: string): string {
  if (axios.isAxiosError<ErrorApi>(error)) {
    if (!error.response) {
      return "No hay conexión con el servidor. Si la API estaba dormida, espera unos segundos y reintenta.";
    }
    const datos = error.response.data;
    return datos?.details?.[0]?.mensaje ?? datos?.message ?? porDefecto;
  }
  return porDefecto;
}
