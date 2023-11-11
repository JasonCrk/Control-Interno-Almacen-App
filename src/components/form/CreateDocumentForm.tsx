import type { FC, ChangeEvent } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { CreateDocumentData } from "../../models/document.model"
import { CreateDocumentService } from "../../models/service.model"
import { MessageResponse } from "../../models/response.model"

import { createDocumentSchemaValidation } from "../../validations"

import { useCallService } from "../../hooks/useCallFetch"

import { Box, Button } from "@chakra-ui/react"

import TextField from "../../components/form/TextField"
import UploadFileButton from "../../components/form/UploadFileButton"

interface Props {
  createDocumentService: CreateDocumentService
  onSuccess: (data: unknown & MessageResponse) => void
  onError: (error: unknown) => void
}

const CreateDocumentForm: FC<Props> = ({
  createDocumentService,
  onSuccess,
  onError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateDocumentData>({
    resolver: zodResolver(createDocumentSchemaValidation),
  })

  const { callService, isLoading } = useCallService({
    serviceFn: createDocumentService,
    options: {
      onError,
      onSuccess: data => {
        onSuccess(data)
      },
    },
  })

  const handleSubirMemorandum = handleSubmit(async ({ title, document }) => {
    const memorandumData = new FormData()
    memorandumData.append("title", title)
    memorandumData.append("document", document)

    await callService(memorandumData)
  })

  return (
    <Box
      as="form"
      onSubmit={handleSubirMemorandum}
      display={"flex"}
      flexDirection={"column"}
      gap={3}
    >
      <TextField
        name="title"
        register={register}
        errorMessage={errors.title?.message}
        isInvalid={!!errors.title}
        placeholder="Titulo del memorandum"
        variant={"flushed"}
        fontSize={"2xl"}
      />

      <UploadFileButton
        name="document"
        accept=".docx"
        register={register}
        errorMessage={errors.document?.message}
        isError={!!errors.document}
        value={watch("document")}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const file = event.currentTarget.files?.item(0)
          if (file) setValue("document", file)
        }}
      />

      <Button type="submit" colorScheme="linkedin" isLoading={isLoading}>
        Guardar
      </Button>
    </Box>
  )
}

export default CreateDocumentForm
