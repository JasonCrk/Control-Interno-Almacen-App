import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"

import { UserRole } from "../models/user.model"

import Login from "../pages/Login.page"
import PaginaPrincipal from "../pages/MenuPrincipal.page"

import MemorandumsSolicitudDesignacion from "../pages/memorandum/Memorandums.page"
import DetalleMemorandum from "../pages/memorandum/DetalleMemorandum.page"
import SubirMemorandumSolicitudDesignacion from "../pages/memorandum/SubirMemorandumSolicitudDesignacion.page"

import ActasInventario from "../pages/acta/ActasInventario.page"
import DetalleActaInventario from "../pages/acta/DetalleActaInventario.page"
import SubirActaInventario from "../pages/acta/SubirActaInventario.page"
import SubirActaEntregaProductosSinFinesLucro from "../pages/acta/SubirActaEntregaProductosSinFinesLucro.page"

import InformesSustentoDiferencias from "../pages/informe/InformesSustentoDiferencias.page"
import DetalleInformeSustentoDiferencias from "../pages/informe/DetalleInformeSustentoDiferencias.page"
import SubirInformeFaltante from "../pages/informe/SubirInformeFaltante.page"
import SubirInformeSustentoDiferencias from "../pages/informe/SubirInformeSustentoDiferencias.page"

import ListaProductos from "../pages/ListaProductos.page"

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

        <Route
          element={
            <HasRole
              roles={[
                UserRole.JEFE_UNIDAD_LOGISTICA,
                UserRole.ASISTENTE,
                UserRole.JEFE_UNIDAD_FINANZAS,
                UserRole.TECNICO_ADMINISTRATIVO_LOGISTICA,
              ]}
            />
          }
        >
          <Route
            path="memorandums"
            element={<MemorandumsSolicitudDesignacion />}
          />
          <Route
            path="memorandums/:memorandumId"
            element={<DetalleMemorandum />}
          />
        </Route>

        <Route
          element={
            <HasRole
              roles={[
                UserRole.TECNICO_ADMINISTRATIVO_LOGISTICA,
                UserRole.ASISTENTE,
              ]}
            />
          }
        >
          <Route
            path="memorandums/subir"
            element={<SubirMemorandumSolicitudDesignacion />}
          />
        </Route>

        <Route
          element={
            <HasRole
              roles={[
                UserRole.ANALISTA_FINANZAS,
                UserRole.TECNICO_ADMINISTRATIVO_ALMACEN,
              ]}
            />
          }
        >
          <Route path="productos" element={<ListaProductos />} />
        </Route>

        <Route element={<HasRole roles={[UserRole.ANALISTA_FINANZAS]} />}>
          <Route
            path="actas/inventario/subir"
            element={<SubirActaInventario />}
          />
        </Route>

        <Route
          element={
            <HasRole roles={[UserRole.TECNICO_ADMINISTRATIVO_ALMACEN]} />
          }
        >
          <Route
            path="informes/sustento-diferencias/subir"
            element={<SubirInformeSustentoDiferencias />}
          />
          <Route
            path="actas/entrega-productos-sin-fines-lucro/subir"
            element={<SubirActaEntregaProductosSinFinesLucro />}
          />
        </Route>

        <Route element={<HasRole roles={[UserRole.JEFE_UNIDAD_LOGISTICA]} />}>
          <Route path="/actas/inventario" element={<ActasInventario />} />
          <Route
            path="/actas/inventario/:actaId"
            element={<DetalleActaInventario />}
          />
          <Route
            path="/informes/sustento-diferencias"
            element={<InformesSustentoDiferencias />}
          />
          <Route
            path="/informes/sustento-diferencias/:informeId"
            element={<DetalleInformeSustentoDiferencias />}
          />
          <Route
            path="/informes/faltante/subir"
            element={<SubirInformeFaltante />}
          />
        </Route>
      </Route>
    </Route>
  )
)
