import { useState } from "react"

import { Link } from "react-router-dom"

import { UserRole } from "../../models/user.model"

import {
  deleteMemorandumSolicitudDesignacion,
  getAllMemorandumsSolicitudDesignacion,
  updateMemorandumSolicitudDesignacion,
} from "../../features/memorandum/service"

import { useAppSelector } from "../../store/hooks"

import { useFetch } from "../../hooks/useFetch"

import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react"

import SearchBar from "../../components/ui/SearchBar"
import DocumentTable from "../../components/ui/DocumentTable"
import DocumentTableSimple from "../../components/ui/DocumentTableSimple"

function MemorandumsSolicitudAsignacion() {
  const role = useAppSelector(state => state.auth.user!.role)

  const [searchQuery, setSearchQuery] = useState<string>("")

  const {
    isLoading,
    data: memorandums,
    refetch,
  } = useFetch({
    serviceFn: () => getAllMemorandumsSolicitudDesignacion(searchQuery),
  })

  const handleChangeSearchQuery = (searchQuery: string) => {
    setSearchQuery(searchQuery)
    refetch()
  }

  return (
    <Box>
      <SearchBar changeSearchQuery={handleChangeSearchQuery} />
      <Container maxW={"container.lg"}>
        <Flex mt={4} justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="lg">
            Memorandums de Solicitud de Designación
          </Heading>
          {(role === UserRole.TECNICO_ADMINISTRATIVO_LOGISTICA ||
            role === UserRole.ASISTENTE) && (
            <Button
              as={Link}
              colorScheme="green"
              to="/memorandums/solicitud-designacion/subir"
            >
              Subir memorandum
            </Button>
          )}
        </Flex>

        {role === UserRole.TECNICO_ADMINISTRATIVO_LOGISTICA ||
        role == UserRole.ASISTENTE ? (
          <DocumentTable
            path="/memorandums/solicitud-designacion/"
            documents={memorandums?.data}
            isLoading={isLoading}
            refetch={refetch}
            onDeleteService={deleteMemorandumSolicitudDesignacion}
            onUpdateService={updateMemorandumSolicitudDesignacion}
          />
        ) : (
          <DocumentTableSimple
            path="/memorandums/solicitud-designacion/"
            documents={memorandums?.data}
            isLoading={isLoading}
          />
        )}
      </Container>
    </Box>
  )
}

export default MemorandumsSolicitudAsignacion
