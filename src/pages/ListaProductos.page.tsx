import { useEffect, useState } from "react"

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"

import { getListadoProductosUrl } from "../services/products.service"

import { Container, Skeleton } from "@chakra-ui/react"

function ListaProductos() {
  const [documentUri, setDocumentUri] = useState<string | null>(null)

  useEffect(() => {
    getListadoProductosUrl().then(url => setDocumentUri(url))
  }, [])

  return (
    <Container maxW={"container.lg"}>
      <Skeleton
        fadeDuration={1}
        isLoaded={!!documentUri}
        h={"720px"}
        w={"full"}
        mt={10}
      >
        {documentUri && (
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            prefetchMethod="GET"
            documents={[{ uri: documentUri }]}
            style={{
              width: "100%",
              height: "720px",
            }}
            config={{
              header: {
                disableHeader: true,
              },
            }}
          />
        )}
      </Skeleton>
    </Container>
  )
}

export default ListaProductos
