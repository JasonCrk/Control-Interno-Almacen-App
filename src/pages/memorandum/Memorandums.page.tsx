import { useState } from "react"

import { Link, useLocation } from "react-router-dom"

import { UserRole } from "../../models/user.model"
import { DocumentId } from "../../models/document.model"

import {
  MemorandumResponse,
  MemorandumStatus,
} from "../../features/memorandum/models"
import {
  deleteMemorandum,
  getAllMemorandums,
  updateMemorandum,
} from "../../features/memorandum/service"

import { useAppSelector } from "../../store/hooks"

import { useFetch } from "../../hooks/useFetch"

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react"

import AssignAnalystToMemorandumModal from "../../features/analista/components/AssignAnalystToMemorandumModal"
import AssignAnalystCell from "../../features/memorandum/components/AssignAnalystCell"

import SearchBar from "../../components/ui/SearchBar"
import DocumentTable from "../../components/ui/DocumentTable"
import DocumentTableBase from "../../components/ui/DocumentTableBase"

function Memorandums() {
  const role = useAppSelector(state => state.auth.user?.role)
  const { pathname } = useLocation()

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
    refetch: refetchMemorandums,
  } = useFetch({
    serviceFn: () => getAllMemorandums(searchQuery),
  })

  const handleChangeSearchQuery = (searchQuery: string) => {
    setSearchQuery(searchQuery)
    refetchMemorandums()
  }

  const handleCloseAssignAnalystModal = () => {
    closeAssignAnalystModal()
    refetchMemorandums()
  }

  const handleSelectionMemorandumToAssignAnalyst = (
    memorandumId: DocumentId
  ) => {
    setSelectedMemorandumId(memorandumId)
    openAssignAnalystModal()
  }

  const memorandumStatusColumn = {
    header: "Estado",
    cell: (document: MemorandumResponse) => (
      <Badge
        colorScheme={
          document.status === MemorandumStatus.APROBADO ? "green" : "gray"
        }
      >
        {document.status}
      </Badge>
    ),
  }

  const memorandumTypeColumn = {
    header: "Tipo",
    cell: (document: MemorandumResponse) => <Badge>{document.type}</Badge>,
  }

  return (
    <Box>
      <SearchBar changeSearchQuery={handleChangeSearchQuery} />
      <Container maxW={"container.lg"}>
        <Flex mt={4} justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="lg">
            Memorandums
          </Heading>

          {(role === UserRole.TECNICO_ADMINISTRATIVO_LOGISTICA ||
            role === UserRole.ASISTENTE) && (
            <Button as={Link} colorScheme="green" to={`${pathname}/subir`}>
              Subir memorandum
            </Button>
          )}
        </Flex>

        {role === UserRole.TECNICO_ADMINISTRATIVO_LOGISTICA ||
        role == UserRole.ASISTENTE ? (
          <DocumentTable
            path={pathname}
            documents={memorandums?.data}
            isLoading={isLoading}
            refetch={refetchMemorandums}
            onDeleteService={deleteMemorandum}
            onUpdateService={updateMemorandum}
            extraColumns={[memorandumTypeColumn, memorandumStatusColumn]}
          />
        ) : role === UserRole.JEFE_UNIDAD_FINANZAS ? (
          <>
            <AssignAnalystToMemorandumModal
              isOpen={isOpenAssignAnalystModal}
              onClose={handleCloseAssignAnalystModal}
              memorandumId={selectedMemorandumId}
            />

            <DocumentTableBase
              path={pathname}
              documents={memorandums?.data}
              isLoading={isLoading}
              extraColumns={[
                memorandumTypeColumn,
                memorandumStatusColumn,
                {
                  header: "Asignar analista",
                  cell: (document: MemorandumResponse) => (
                    <AssignAnalystCell
                      memorandum={document}
                      handleSelectionMemorandum={
                        handleSelectionMemorandumToAssignAnalyst
                      }
                    />
                  ),
                },
              ]}
            />
          </>
        ) : (
          <DocumentTableBase
            path={pathname}
            documents={memorandums?.data}
            isLoading={isLoading}
            extraColumns={[memorandumTypeColumn, memorandumStatusColumn]}
          />
        )}
      </Container>
    </Box>
  )
}

export default Memorandums
