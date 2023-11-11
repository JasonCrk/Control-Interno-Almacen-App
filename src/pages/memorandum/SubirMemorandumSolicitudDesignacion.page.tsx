import { type ChangeEvent } from "react"

import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { CreateDocumentData } from "../../models/document.model"
import { createDocumentSchemaValidation } from "../../validations"

import { createMemorandumSolicitudDesignacion } from "../../features/memorandum/service"

import { useCallService } from "../../hooks/useCallFetch"

import { Box, Button, Container, Heading, useToast } from "@chakra-ui/react"

import TextField from "../../components/form/TextField"
import UploadFileButton from "../../components/form/UploadFileButton"

function SubirMemorandumSolicitudDesignacion() {
  const navigate = useNavigate()
  const toast = useToast()

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
    serviceFn: createMemorandumSolicitudDesignacion,
    options: {
      onSuccess: data => {
        navigate("/memorandums/solicitud-designacion")
        toast({
          status: "success",
          title: "Documento Subido",
          description: data.message,
          duration: 3000,
          isClosable: true,
        })
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
    <Container maxW="container.md" py={4}>
      <Heading as={"h1"} size={"xl"} textTransform={"uppercase"} mb={4}>
        memorandum de solicitud de designación
      </Heading>
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
          Subir memorandum
        </Button>
      </Box>
    </Container>
  )
}

export default SubirMemorandumSolicitudDesignacion
