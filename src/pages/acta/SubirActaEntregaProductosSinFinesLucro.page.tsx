import { createActaEntregaProductosSinFinesDeLucro } from "../../features/actas/services"

import { Container, Heading, useToast } from "@chakra-ui/react"

import CreateDocumentForm from "../../components/form/CreateDocumentForm"

function SubirActaEntregaProductosSinFinesLucro() {
  const toast = useToast()

  return (
    <Container maxW="container.md" py={6}>
      <Heading as={"h1"} size={"xl"} textTransform={"uppercase"} mb={4}>
        Acta de entrega de productos sin fines de lucro
      </Heading>
      <CreateDocumentForm
        createDocumentService={createActaEntregaProductosSinFinesDeLucro}
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

export default SubirActaEntregaProductosSinFinesLucro
