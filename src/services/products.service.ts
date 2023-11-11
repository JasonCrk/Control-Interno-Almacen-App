import { getDocumentUrl } from "./firebase.service"

export const getListadoProductosUrl = async (): Promise<string> => {
  return getDocumentUrl("/listadoProductos.xlsx").then(url => url)
}
