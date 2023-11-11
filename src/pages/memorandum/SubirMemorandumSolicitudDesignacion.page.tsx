import { useNavigate } from "react-router-dom"

import { createMemorandumSolicitudDesignacion } from "../../features/memorandum/service"

import { Container, Heading, useToast } from "@chakra-ui/react"

import CreateDocumentForm from "../../components/form/CreateDocumentForm"

function SubirMemorandumSolicitudDesignacion() {
  const navigate = useNavigate()
  const toast = useToast()

  return (
    <Container maxW="container.md" py={4}>
      <Heading as={"h1"} size={"xl"} textTransform={"uppercase"} mb={4}>
        memorandum de solicitud de designación
      </Heading>
      <CreateDocumentForm
        createDocumentService={createMemorandumSolicitudDesignacion}
        onSuccess={data => {
          navigate("/memorandums/solicitud-designacion")
          toast({
            status: "success",
            title: "Documento Subido",
            description: data.message,
            duration: 3000,
            isClosable: true,
          })
        }}
        onError={error => {
          console.log(error)
        }}
      />
    </Container>
  )
}

export default SubirMemorandumSolicitudDesignacion
