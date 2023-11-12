import { useState, type FC, KeyboardEvent, ChangeEvent } from "react"

import { UserId } from "../../../models/user.model"
import { DocumentId } from "../../../models/document.model"

import { useFetch } from "../../../hooks/useFetch"
import { useCallService } from "../../../hooks/useCallFetch"

import { searchAnalysts } from "../services"
import { assignAnalystToMemorandum } from "../../memorandum/service"

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  useToast,
  ModalFooter,
} from "@chakra-ui/react"

import AnalystItem from "./AnalystItem"
import UserItemSkeleton from "../../../components/ui/skeletons/UserItemSkeleton"

import { FiSearch } from "react-icons/fi"

interface Props {
  isOpen: boolean
  onClose: () => void
  memorandumId: DocumentId | null
}

const AssignAnalystToMemorandumModal: FC<Props> = ({
  isOpen,
  onClose,
  memorandumId,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedAnalystId, setSelectedAnalystId] = useState<UserId | null>(
    null
  )

  const toast = useToast()

  const {
    data: analysts,
    isLoading: isLoadingSearchAnalysts,
    refetch,
  } = useFetch({
    serviceFn: () => searchAnalysts(searchQuery),
  })

  const { callService, isLoading: isLoadingAssignAnalyst } = useCallService({
    serviceFn: assignAnalystToMemorandum,
    options: {
      onSuccess: data => {
        onClose()
        toast({
          title: "Asignar Analista",
          description: data.message,
          duration: 3000,
          status: "success",
          isClosable: true,
        })
      },
    },
  })

  const handleToggleAssignAnalyst = (analystId: UserId) => {
    if (!selectedAnalystId) setSelectedAnalystId(analystId)
    else setSelectedAnalystId(null)
  }

  const handleSubmitSearchAnalysts = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setSearchQuery(event.currentTarget.value)
      refetch()
    }
  }

  const handleAssignAnalystToMemorandum = async () => {
    if (selectedAnalystId && memorandumId) {
      await callService({ analystId: selectedAnalystId, memorandumId })
    }
  }

  const handleChangeSearchAnalystsInput = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.currentTarget.value)
  }

  const handleCloseModal = () => {
    onClose()
    setSearchQuery("")
    setSelectedAnalystId(null)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asignar Analista</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <InputGroup w={"full"} mb={3}>
            <InputLeftElement pointerEvents={"none"}>
              <FiSearch />
            </InputLeftElement>
            <Input
              placeholder="Buscar..."
              bg={"white"}
              value={searchQuery}
              onKeyDown={handleSubmitSearchAnalysts}
              onChange={handleChangeSearchAnalystsInput}
            />
          </InputGroup>

          <VStack
            spacing={3}
            h={"40vh"}
            overflowY={"scroll"}
            sx={{
              "::-webkit-scrollbar": {
                width: "5px",
              },
              "::-webkit-scrollbar-track": {
                borderRadius: "10px",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "#ADADAD",
                borderRadius: "10px",
              },
              "::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#3E3E3E",
              },
            }}
          >
            {isLoadingSearchAnalysts || !analysts ? (
              [...Array(4)].map(() => (
                <UserItemSkeleton key={crypto.randomUUID()} />
              ))
            ) : analysts.data.length === 0 ? (
              <Text textAlign={"center"}>No se ha encontrado analistas</Text>
            ) : (
              analysts.data.map(analyst => (
                <AnalystItem
                  key={analyst.id}
                  analyst={analyst}
                  selectedAnalystId={selectedAnalystId}
                  toggleAssignAnalyst={handleToggleAssignAnalyst}
                />
              ))
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            w={"full"}
            isLoading={isLoadingAssignAnalyst}
            onClick={handleAssignAnalystToMemorandum}
            isDisabled={selectedAnalystId === null}
          >
            Aceptar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AssignAnalystToMemorandumModal
