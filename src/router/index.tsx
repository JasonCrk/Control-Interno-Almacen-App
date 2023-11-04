import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"

import { UserRole } from "../models/user.model"

import Login from "../pages/Login.page"
import PaginaPrincipal from "../pages/MenuPrincipal.page"

import MemorandumsSolicitudAsignacion from "../pages/memorandum/MemorandumsSolicitudAsignacion.page"

import AuthContainer from "../layouts/AuthContainer"
import PageContainer from "../layouts/PageContainer"

import HasRole from "./guards/HasRole.guard"

import { isAuthenticated } from "./guards/IsAuthenticated.guard"
import { isNotAuthenticated } from "./loaders/isNotAuthenticated.loader"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        path="auth"
        loader={isNotAuthenticated}
        element={<AuthContainer />}
      >
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<PageContainer />} loader={isAuthenticated}>
        <Route index element={<PaginaPrincipal />} />
        <Route element={<HasRole roles={[UserRole.JEFE_UNIDAD_LOGISTICA]} />}>
          <Route
            path="memorandums/solicitud-asignacion"
            element={<MemorandumsSolicitudAsignacion />}
          />
        </Route>
      </Route>
    </Route>
  )
)
