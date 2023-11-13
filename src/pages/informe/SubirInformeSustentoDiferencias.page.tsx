import { createInformeSustentoDiferencias } from "../../features/informe/service"

import { Container, Heading, useToast } from "@chakra-ui/react"

import CreateDocumentForm from "../../components/form/CreateDocumentForm"

function SubirInformeSustentoDiferencias() {
  const toast = useToast()

  return (
    <Container maxW="container.md" py={4}>
      <Heading as={"h1"} size={"xl"} textTransform={"uppercase"} mb={4}>
        Informe de sustento de diferencias
      </Heading>
      <CreateDocumentForm
        createDocumentService={createInformeSustentoDiferencias}
        onSuccess={data => {
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

export default SubirInformeSustentoDiferencias
