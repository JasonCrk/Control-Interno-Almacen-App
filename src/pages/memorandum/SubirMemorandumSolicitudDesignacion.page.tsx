import { type ChangeEvent } from "react"

import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { MemorandumFormData } from "../../features/memorandum/models"
import { createMemorandumSolicitudDesignacion } from "../../features/memorandum/service"
import { memorandumSchemaValidation } from "../../features/memorandum/validations"

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
  } = useForm<MemorandumFormData>({
    resolver: zodResolver(memorandumSchemaValidation),
  })

  const { callService, isLoading } = useCallService({
    serviceFn: createMemorandumSolicitudDesignacion,
    options: {
      onSuccess: data => {
        navigate("/memorandums/solicitud-designacion")
        toast({
          status: "success",
          title: "Subir memorandum",
          description: data.message,
          duration: 3000,
        })
      },
    },
  })

  const document = watch("document")

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
          accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword"
          register={register}
          errorMessage={errors.document?.message}
          isError={!!errors.document}
          value={document}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const file = event.currentTarget.files?.item(0)
            if (file) setValue("document", file)
          }}
        />

        <Button type="submit" colorScheme="messenger" isLoading={isLoading}>
          Subir memorandum
        </Button>
      </Box>
    </Container>
  )
}

export default SubirMemorandumSolicitudDesignacion
