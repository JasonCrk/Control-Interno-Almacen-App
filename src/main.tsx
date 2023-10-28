import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { RouterProvider } from "react-router-dom"
import { router } from "./router"

import { Provider as ReduxProvider } from "react-redux"
import { store } from "./store"

import { ChakraProvider } from "@chakra-ui/react"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ReduxProvider>
  </StrictMode>
)
