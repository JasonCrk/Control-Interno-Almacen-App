import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { retrieveAllMemorandumsSolicitudAsignacion } from "../../features/memorandum/service"

import { useFetch } from "../../hooks/useFetch"

import {
  Box,
  Card,
  Center,
  Container,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"

import SearchBar from "../../components/ui/SearchBar"

import { longDatetimeFormat } from "../../utils/datetimeFormats"

interface State {
  searchQuery: string
}

function MemorandumsSolicitudAsignacion() {
  const [searchQuery, setSearchQuery] = useState<State["searchQuery"]>("")

  const navigate = useNavigate()

  const {
    isLoading,
    data: memorandums,
    refetch,
  } = useFetch({
    serviceFn: () => retrieveAllMemorandumsSolicitudAsignacion(searchQuery),
  })

  const handleChangeSearchQuery = (searchQuery: string) => {
    setSearchQuery(searchQuery)
    refetch()
  }

  return (
    <Box>
      <SearchBar changeSearchQuery={handleChangeSearchQuery} />
      <Container maxW={"container.lg"}>
        <Card mt={4} overflow={"hidden"}>
          <TableContainer>
            <Table size={"lg"}>
              <Thead bg={"gray.500"}>
                <Tr>
                  <Th color={"white"}>Titulo</Th>
                  <Th color={"white"}>Fecha de creación</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading || !memorandums ? (
                  <Tr>
                    <Td colSpan={2}>
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
                ) : memorandums.data.length > 0 ? (
                  memorandums.data.map(memorandum => (
                    <Tr
                      key={memorandum.id}
                      cursor={"pointer"}
                      sx={{
                        _hover: {
                          backgroundColor: "gray.50",
                        },
                      }}
                      onClick={() =>
                        navigate(
                          "/memorandums/solicitud-asignacion/" + memorandum.id
                        )
                      }
                    >
                      <Td>{memorandum.title}</Td>
                      <Td>{longDatetimeFormat(memorandum.createdAt)}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={2}>
                      No se ha encontrado memorandums que coincidan con su
                      búsqueda
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </Box>
  )
}

export default MemorandumsSolicitudAsignacion
