import { Suspense } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "./PublicRoutes";

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div>Cargando App...</div>}>
        <Routes>
          {/* Redirección inicial */}
          <Route path="/" element={<Navigate to="/characters" replace />} />

          {/* Rutas públicas */}
          <Route path="/*" element={<AuthRoutes />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
