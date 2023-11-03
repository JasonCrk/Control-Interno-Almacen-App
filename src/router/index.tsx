import { createBrowserRouter } from "react-router-dom"

import Login from "../pages/Login.page"
import PaginaPrincipal from "../pages/MenuPrincipal.page"

// import MemorandumsDesignacion from "../pages/MemorandumsDesignacion.page"
import MemorandumsSolicitudAsignacion from "../pages/MemorandumsSolicitudAsignacion.page"
// import MemorandumsSolicitudDesignacion from "../pages/MemorandumsSolicitudDesignacion.page"

// import InformesSustentoDiferencias from "../pages/InformesSustentoDiferencias.page"
// import CrearInformeSustentoDiferencias from "../pages/CrearInformeSustentoDiferencias.page"
// import CrearInformeFaltante from "../pages/CrearInformeFaltante.page"

// import ActasInventario from "../pages/ActasInventario.page"
// import CrearActaEntregaProductosSinFinesLucro from "../pages/CrearActaEntregaProductosSinFinesLucro.page"
// import CrearActaInventario from "../pages/CrearActaInventario.page"

// import ListaProductos from "../pages/ListaProductos.page"

import AuthContainer from "../layouts/AuthContainer"
import PageContainer from "../layouts/PageContainer"

import { isAuthenticated } from "./guards/IsAuthenticated.guard"

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthContainer />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    loader: isAuthenticated,
    element: <PageContainer />,
    children: [
      {
        index: true,
        element: <PaginaPrincipal />,
      },
      {
        path: "/memorandums/solicitud-asignacion",
        element: <MemorandumsSolicitudAsignacion />,
      },
      // {
      //   path: "/memorandums/designacion",
      //   element: <MemorandumsDesignacion />,
      // },
      // {
      //   path: "/memorandums/solicitud-designacion",
      //   element: <MemorandumsSolicitudDesignacion />,
      // },
      // {
      //   path: "/informes/sustento-diferencias",
      //   element: <InformesSustentoDiferencias />,
      // },
      // {
      //   path: "/informes/sustento-diferencias/subir",
      //   element: <CrearInformeSustentoDiferencias />,
      // },
      // {
      //   path: "/informes/faltante/subir",
      //   element: <CrearInformeFaltante />,
      // },
      // {
      //   path: "/actas/inventario",
      //   element: <ActasInventario />,
      // },
      // {
      //   path: "/actas/inventario/subir",
      //   element: <CrearActaInventario />,
      // },
      // {
      //   path: "/actas/entrega-productos-sin-fines-lucro/subir",
      //   element: <CrearActaEntregaProductosSinFinesLucro />,
      // },
      // {
      //   path: "/productos",
      //   element: <ListaProductos />,
      // },
    ],
  },
])
