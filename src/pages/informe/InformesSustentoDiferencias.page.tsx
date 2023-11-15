import { useLocation } from "react-router-dom"

import { getAllInformesSustentoDiferencias } from "../../features/informe/service"

import { useFetch } from "../../hooks/useFetch"

import { Container, Heading } from "@chakra-ui/react"

import DocumentTableBase from "../../components/ui/DocumentTableBase"

function InformesSustentoDiferencias() {
  const { pathname } = useLocation()

  const { isLoading, data: informes } = useFetch({
    serviceFn: () => getAllInformesSustentoDiferencias(),
  })

  return (
    <Container maxW={"container.lg"} mt={4}>
      <Heading as="h1" size="lg">
        Informe de Sustento de Diferencias
      </Heading>
      <DocumentTableBase
        path={pathname}
        documents={informes?.data}
        isLoading={isLoading}
      />
    </Container>
  )
}

export default InformesSustentoDiferencias
