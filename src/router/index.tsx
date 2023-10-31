import { createBrowserRouter } from "react-router-dom"

import Login from "../pages/Login.page"
import PaginaPrincipal from "../pages/MenuPrincipal.page"

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
    ],
  },
])
