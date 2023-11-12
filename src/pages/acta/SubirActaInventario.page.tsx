import { createActaInventario } from "../../features/actas/services"

import { Container, Heading, useToast } from "@chakra-ui/react"

import CreateDocumentForm from "../../components/form/CreateDocumentForm"

function SubirActaInventario() {
  const toast = useToast()

  return (
    <Container maxW="container.md" py={6}>
      <Heading as={"h1"} size={"xl"} textTransform={"uppercase"} mb={4}>
        Acta de Inventario
      </Heading>
      <CreateDocumentForm
        createDocumentService={createActaInventario}
        onSuccess={data => {
          console.log(data)
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

export default SubirActaInventario
