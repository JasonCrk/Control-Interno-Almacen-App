import { ref, getDownloadURL } from "firebase/storage"

import { storage } from "../firebase"

import { DocumentUrl } from "../models/document.model"

export const getDocumentUrl = async (
  documentUrl: DocumentUrl
): Promise<DocumentUrl> => {
  return getDownloadURL(ref(storage, documentUrl)).then(url => url)
}
