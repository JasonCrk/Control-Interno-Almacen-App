import { useState } from "react"

import { Link } from "react-router-dom"

import { UserRole } from "../../models/user.model"
import { DocumentId } from "../../models/document.model"

import {
  deleteMemorandumSolicitudDesignacion,
  getAllMemorandumsSolicitudDesignacion,
  updateMemorandumSolicitudDesignacion,
} from "../../features/memorandum/service"
import AssignAnalystToMemorandumModal from "../../features/analista/components/AssignAnalystToMemorandumModal"

import { useAppSelector } from "../../store/hooks"

import { useFetch } from "../../hooks/useFetch"

import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import SearchBar from "../../components/ui/SearchBar"
import DocumentTable from "../../components/ui/DocumentTable"
import DocumentTableBase from "../../components/ui/DocumentTableBase"
import { MemorandumResponse } from "../../features/memorandum/models"

function MemorandumsSolicitudAsignacion() {
  const role = useAppSelector(state => state.auth.user?.role)

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedMemorandumId, setSelectedMemorandumId] =
    useState<DocumentId | null>(null)

  const {
    isOpen: isOpenAssignAnalystModal,
    onClose: closeAssignAnalystModal,
    onOpen: openAssignAnalystModal,
  } = useDisclosure()

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

  const handleSelectMemorandumToAssignAnalyst = (memorandumId: DocumentId) => {
    setSelectedMemorandumId(memorandumId)
    openAssignAnalystModal()
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
        ) : role === UserRole.JEFE_UNIDAD_FINANZAS ? (
          <>
            <AssignAnalystToMemorandumModal
              isOpen={isOpenAssignAnalystModal}
              onClose={closeAssignAnalystModal}
              memorandumId={selectedMemorandumId}
            />

            <DocumentTableBase
              path="/memorandums/solicitud-designacion/"
              documents={memorandums?.data}
              isLoading={isLoading}
              extraColumns={[
                {
                  header: "Asignar analista",
                  cell: (document: MemorandumResponse) =>
                    document.assigned ? (
                      <Flex alignItems={"center"} gap={2}>
                        <Avatar src={document.assigned.avatar} />
                        <Text>
                          {document.assigned.firstName}
                          <br />
                          {document.assigned.lastName}
                        </Text>
                      </Flex>
                    ) : (
                      <Button
                        w={"full"}
                        colorScheme="purple"
                        onClick={event => {
                          event.stopPropagation()
                          handleSelectMemorandumToAssignAnalyst(document.id)
                        }}
                      >
                        Asignar
                      </Button>
                    ),
                },
              ]}
            />
          </>
        ) : (
          <DocumentTableBase
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
