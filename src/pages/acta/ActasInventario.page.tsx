import { getAllActasInventario } from "../../features/actas/services"

import { useFetch } from "../../hooks/useFetch"

import { Container, Heading } from "@chakra-ui/react"

import DocumentTableBase from "../../components/ui/DocumentTableBase"

function ActasInventario() {
  const { isLoading, data: actas } = useFetch({
    serviceFn: () => getAllActasInventario(),
  })

  return (
    <Container maxW={"container.lg"} mt={4}>
      <Heading as="h1" size="lg">
        Actas de Inventario
      </Heading>
      <DocumentTableBase
        path="/actas/inventario/"
        documents={actas?.data}
        isLoading={isLoading}
      />
    </Container>
  )
}

export default ActasInventario
