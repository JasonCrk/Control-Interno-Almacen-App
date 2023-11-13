import { FC, useState } from "react"

import { useNavigate } from "react-router-dom"

import {
  DocumentId,
  DocumentItem,
  UpdateDocumentData,
} from "../../models/document.model"
import {
  DeleteDocumentService,
  UpdateDocumentService,
} from "../../models/service.model"

import {
  Card,
  Center,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"

import UpdateDocumentModal from "../form/UpdateDocumentModal"

import { FiEdit } from "react-icons/fi"
import { BsTrash } from "react-icons/bs"

import { longDatetimeFormat } from "../../utils/datetimeFormats"

interface TableColumn {
  header: string
  cell: (document: any) => JSX.Element
}

interface Props {
  isLoading: boolean
  path: string
  refetch: () => void
  documents: (unknown & DocumentItem)[] | undefined
  onDeleteService: DeleteDocumentService
  onUpdateService: UpdateDocumentService
  extraColumns?: TableColumn[]
}

const DocumentTable: FC<Props> = ({
  isLoading,
  documents,
  extraColumns,
  path,
  refetch,
  onDeleteService,
  onUpdateService,
}) => {
  const [documentIdSelected, setDocumentIdSelected] =
    useState<DocumentId | null>(null)
  const [updateData, setUpdateData] = useState<UpdateDocumentData>({
    title: "",
  })

  const navigate = useNavigate()
  const toast = useToast()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleEditDocument = (
    documentId: DocumentId,
    data: UpdateDocumentData
  ) => {
    setDocumentIdSelected(documentId)
    setUpdateData(data)
    onOpen()
  }

  const handleDeleteDocument = async (documentId: DocumentId) => {
    const response = await onDeleteService(documentId)
    toast({
      title: "Eliminar memorandum",
      description: response.message,
      status: "success",
      duration: 1000,
      isClosable: true,
    })
    refetch()
  }

  const pathname = path.endsWith("/") ? path.slice(0, path.length - 1) : path
  const numberColumns = extraColumns ? 2 + extraColumns.length : 2

  return (
    <>
      <UpdateDocumentModal
        documentId={documentIdSelected}
        initialData={updateData}
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
        updateDocumentService={onUpdateService}
      />

      <Card mt={4} overflow={"hidden"}>
        <TableContainer>
          <Table size={"lg"}>
            <Thead bg={"gray.500"}>
              <Tr>
                <Th color={"white"}>Titulo</Th>
                <Th color={"white"}>Fecha de creación</Th>
                {extraColumns &&
                  extraColumns.map(column => (
                    <Th key={crypto.randomUUID()} color={"white"}>
                      {column.header}
                    </Th>
                  ))}
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading || !documents ? (
                <Tr>
                  <Td colSpan={numberColumns}>
                    <Center my={1}>
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="lg"
                      />
                    </Center>
                  </Td>
                </Tr>
              ) : documents.length > 0 ? (
                documents.map(document => (
                  <Tr
                    key={document.id}
                    cursor={"pointer"}
                    onClick={() => navigate(`${pathname}/${document.id}`)}
                    sx={{
                      _hover: {
                        backgroundColor: "gray.50",
                      },
                    }}
                  >
                    <Td>{document.title}</Td>

                    <Td>{longDatetimeFormat(document.createdAt)}</Td>

                    {extraColumns &&
                      extraColumns.map(column => (
                        <Td key={crypto.randomUUID()}>
                          {column.cell(document)}
                        </Td>
                      ))}

                    <Td display={"flex"} gap={2} alignItems={"center"}>
                      <IconButton
                        aria-label="edit"
                        icon={<FiEdit />}
                        colorScheme="linkedin"
                        onClick={event => {
                          event.stopPropagation()
                          handleEditDocument(document.id, {
                            title: document.title,
                          })
                        }}
                        zIndex={10}
                      />
                      <IconButton
                        aria-label="delete"
                        icon={<BsTrash />}
                        colorScheme="red"
                        onClick={event => {
                          event.stopPropagation()
                          handleDeleteDocument(document.id)
                        }}
                        zIndex={10}
                      />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={numberColumns} textAlign={"center"}>
                    No se ha encontrado memorandums
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default DocumentTable
