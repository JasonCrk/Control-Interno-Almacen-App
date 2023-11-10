import { FC, useEffect, useState } from "react"

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"

import { Document } from "../../models/document.model"

import { getDocumentUrl } from "../../services/firebase.service"

import { Container, Heading, Skeleton, Stack, Text } from "@chakra-ui/react"

import { longDatetimeFormat } from "../../utils/datetimeFormats"

interface Props {
  document: Document | null
  isLoading: boolean
}

const DocumentDetails: FC<Props> = ({ document, isLoading }) => {
  const [isLoadingDocument, setIsLoadingDocument] = useState(false)
  const [documentUrl, setDocumentUrl] = useState<string | null>(null)

  const getDocument = async (document: Document) => {
    try {
      const url = await getDocumentUrl(document.documentUrl)
      setDocumentUrl(url)
      setIsLoadingDocument(true)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!isLoading && document != null) {
      getDocument(document)
    }
  }, [isLoading, document])

  return (
    <Container maxW={"container.lg"} py={10}>
      <Stack spacing={2}>
        <Skeleton h={"24px"} w={"380px"} isLoaded={!isLoading} fadeDuration={1}>
          {document && <Text>{longDatetimeFormat(document.createdAt)}</Text>}
        </Skeleton>
        <Skeleton h={"48px"} isLoaded={!isLoading} fadeDuration={4}>
          <Heading size={"xl"} fontWeight={"bold"}>
            {document?.title}
          </Heading>
        </Skeleton>
        <Skeleton height={"620px"} isLoaded={isLoadingDocument}>
          {documentUrl && (
            <DocViewer
              pluginRenderers={DocViewerRenderers}
              documents={[{ uri: documentUrl }]}
              style={{ width: "100%", height: "620px" }}
              config={{
                header: {
                  disableHeader: true,
                },
              }}
              prefetchMethod="GET"
            />
          )}
        </Skeleton>
      </Stack>
    </Container>
  )
}

export default DocumentDetails
