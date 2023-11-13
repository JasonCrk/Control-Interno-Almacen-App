import { FC } from "react"

import { useNavigate } from "react-router-dom"

import { DocumentItem } from "../../models/document.model"

import {
  Card,
  Center,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"

import { longDatetimeFormat } from "../../utils/datetimeFormats"

interface TableColumn {
  header: string
  cell: (document: any) => JSX.Element
}

interface Props {
  isLoading: boolean
  documents: (DocumentItem & unknown)[] | undefined
  path: string
  extraColumns?: TableColumn[]
}

const DocumentTableBase: FC<Props> = ({
  isLoading,
  documents,
  path,
  extraColumns,
}) => {
  const navigate = useNavigate()

  const pathname = path.endsWith("/") ? path.slice(0, path.length - 1) : path
  const numberColumns = extraColumns ? 2 + extraColumns.length : 2

  return (
    <Card mt={4} overflow={"hidden"}>
      <TableContainer>
        <Table size={"lg"}>
          <Thead bg={"gray.500"}>
            <Tr>
              <Th color={"white"}>Titulo</Th>
              <Th color={"white"}>Fecha de creación</Th>
              {extraColumns &&
                extraColumns.map(column => (
                  <Th color={"white"} key={crypto.randomUUID()}>
                    {column.header}
                  </Th>
                ))}
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
                      <Td key={crypto.randomUUID()}>{column.cell(document)}</Td>
                    ))}
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
  )
}

export default DocumentTableBase
