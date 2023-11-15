import type { FC } from "react"

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"

import { Document } from "../../models/document.model"

import { useGetDocumentUrl } from "../../hooks/useGetDocumentUrl"

import {
  Badge,
  Container,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react"

import { datetimeFormat } from "../../utils/datetimeFormats"

interface Props {
  document: Document | null
  isLoading: boolean
  tags?: (document: any) => Array<string>
  options?: (document: any) => JSX.Element
}

const DocumentDetails: FC<Props> = ({ document, isLoading, options, tags }) => {
  const { documentUrl, isLoadingDocument } = useGetDocumentUrl({
    isLoading,
    document,
  })

  return (
    <Container maxW={"container.lg"} py={10}>
      <Stack spacing={2}>
        <Skeleton h={"24px"} w={"380px"} isLoaded={!isLoading} fadeDuration={1}>
          {document && (
            <Text>{datetimeFormat(document.createdAt, "full")}</Text>
          )}
        </Skeleton>

        <Skeleton isLoaded={!isLoading} fadeDuration={4}>
          <Flex justifyContent={"space-between"} gap={2} alignItems={"end"}>
            <Heading size={"xl"} fontWeight={"bold"}>
              {document?.title}{" "}
              {document &&
                tags &&
                tags(document).map(tag => (
                  <Badge key={crypto.randomUUID()} fontSize={"lg"} mr={2}>
                    {tag}
                  </Badge>
                ))}
            </Heading>

            {document && options && options(document)}
          </Flex>
        </Skeleton>

        <Skeleton height={"620px"} isLoaded={isLoadingDocument}>
          {documentUrl && (
            <DocViewer
              pluginRenderers={DocViewerRenderers}
              documents={[{ uri: documentUrl }]}
              style={{ width: "100%", height: "620px" }}
              prefetchMethod="GET"
              config={{
                header: {
                  disableHeader: true,
                },
              }}
            />
          )}
        </Skeleton>
      </Stack>
    </Container>
  )
}

export default DocumentDetails
