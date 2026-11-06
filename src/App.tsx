import { Navigate, Route, Routes } from "react-router-dom";
import { PlantillaApp } from "./components/layout/PlantillaApp";
import { RutaProtegida } from "./components/layout/RutaProtegida";
import { CursoDetallePage } from "./pages/CursoDetallePage";
import { CursosPage } from "./pages/CursosPage";
import { InicioPage } from "./pages/InicioPage";
import { LoginPage } from "./pages/LoginPage";
import { MisInscripcionesPage } from "./pages/MisInscripcionesPage";
import { NoEncontradaPage } from "./pages/NoEncontradaPage";
import { RegistroPage } from "./pages/RegistroPage";

function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Navigate to="/inicio" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />

      {/* Con sesión (cualquier rol) */}
      <Route element={<RutaProtegida />}>
        <Route element={<PlantillaApp />}>
          <Route path="/inicio" element={<InicioPage />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="/cursos/:id" element={<CursoDetallePage />} />

          {/* Solo estudiantes */}
          <Route element={<RutaProtegida roles={["ESTUDIANTE"]} />}>
            <Route path="/inscripciones" element={<MisInscripcionesPage />} />
          </Route>
        </Route>
      </Route>

      {/* Cualquier otra URL */}
      <Route path="*" element={<NoEncontradaPage />} />
    </Routes>
  );
}

export default App;
