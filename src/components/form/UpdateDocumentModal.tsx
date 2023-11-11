import { FC } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { DocumentId, UpdateDocumentData } from "../../models/document.model"
import { UpdateDocumentService } from "../../models/service.model"

import { useCallService } from "../../hooks/useCallFetch"

import { updateDocumentSchemaValidation } from "../../validations"

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react"

import TextField from "./TextField"
import UploadFileButton from "./UploadFileButton"

interface Props {
  isOpen: boolean
  onClose: () => void
  refetch: () => void
  documentId: DocumentId | null
  updateDocumentService: UpdateDocumentService
  initialData: UpdateDocumentData
}

const UpdateDocumentModal: FC<Props> = ({
  isOpen,
  onClose,
  refetch,
  documentId,
  updateDocumentService,
  initialData,
}) => {
  const toast = useToast()

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateDocumentData>({
    resolver: zodResolver(updateDocumentSchemaValidation),
    values: {
      title: initialData.title,
    },
  })

  const { callService, isLoading } = useCallService({
    serviceFn: updateDocumentService,
    options: {
      onSuccess: data => {
        toast({
          title: "Documento actualizado",
          description: data.message,
          isClosable: true,
          status: "success",
          duration: 3000,
        })
        onClose()
        refetch()
      },
    },
  })

  const handleUpdateDocument = handleSubmit(async data => {
    const updateDocumentData = new FormData()

    updateDocumentData.append("title", data.title)
    if (data.document instanceof File)
      updateDocumentData.append("document", data.document)

    await callService({ documentId: documentId!, data: updateDocumentData })
  })

  const handleCloseModal = () => {
    reset({
      title: "",
      document: undefined,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} size={"2xl"}>
      <ModalOverlay />
      <ModalContent as={"form"} onSubmit={handleUpdateDocument}>
        <ModalHeader>Editar documento</ModalHeader>

        <ModalCloseButton type="button" />

        <ModalBody display={"flex"} flexDirection={"column"} gap={2}>
          <TextField
            register={register}
            name="title"
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title}
          />
          <UploadFileButton
            register={register}
            accept=".docx"
            name="document"
            errorMessage={errors.document?.message}
            isError={!!errors.document}
            value={watch("document")}
            onChange={event => {
              const file = event.currentTarget.files?.item(0)
              if (file) setValue("document", file)
              else setValue("document", undefined)
            }}
          />
        </ModalBody>

        <ModalFooter>
          <Button type="submit" isLoading={isLoading} colorScheme="purple">
            Editar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateDocumentModal
