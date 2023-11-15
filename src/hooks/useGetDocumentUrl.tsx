import { useEffect, useState } from "react"

import { Document } from "../models/document.model"

import { getDocumentUrl } from "../services/firebase.service"

interface Props {
  isLoading: boolean
  document: Document | null
}

export const useGetDocumentUrl = ({ isLoading, document }: Props) => {
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

  return {
    isLoadingDocument,
    documentUrl,
  }
}
