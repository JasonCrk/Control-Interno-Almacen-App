import { getAllInformesSustentoDiferencias } from "../../features/informe/service"

import { useFetch } from "../../hooks/useFetch"

import { Container, Heading } from "@chakra-ui/react"

import DocumentTableBase from "../../components/ui/DocumentTableBase"

function InformesSustentoDiferencias() {
  const { isLoading, data: informes } = useFetch({
    serviceFn: () => getAllInformesSustentoDiferencias(),
  })

  return (
    <Container maxW={"container.lg"} mt={4}>
      <Heading as="h1" size="lg">
        Actas de Inventario
      </Heading>
      <DocumentTableBase
        path="/informes/sustento-diferencias/"
        documents={informes?.data}
        isLoading={isLoading}
      />
    </Container>
  )
}

export default InformesSustentoDiferencias
