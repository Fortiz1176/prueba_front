/*Este archivo manejará las rutas de las vistas que podrá ver el cliente sin un token de autenticación*/

import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom';
import { routesAuth } from '../../routes/index';

const LazyCharacters = lazy(() => import('../../pages/Characters/index.jsx'));
const LazyFavorites = lazy(()=> import("../../pages/Favorites/index.jsx"));


export const AuthRoutes = () => {
  return (
    <>
      <Suspense fallback={<div>Cargando app..</div>}>
        <Routes>
            <Route path={routesAuth.Characters} element={<LazyCharacters/>}/>
            <Route path={routesAuth.Favorites} element={<LazyFavorites/>}/>
          </Routes>
      </Suspense>
    </>
  )
}