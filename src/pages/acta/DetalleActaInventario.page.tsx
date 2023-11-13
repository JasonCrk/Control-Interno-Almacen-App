import { useParams } from "react-router-dom"

import { getActaInventarioById } from "../../features/actas/services"

import { useFetch } from "../../hooks/useFetch"

import DocumentDetails from "../../components/ui/DocumentDetails"

function DetalleActaInventario() {
  const { actaId } = useParams()

  const { data: documentDetails, isLoading: isLoadingDocument } = useFetch({
    serviceFn: () => getActaInventarioById(parseInt(actaId!)),
  })

  return (
    <DocumentDetails document={documentDetails} isLoading={isLoadingDocument} />
  )
}

export default DetalleActaInventario
