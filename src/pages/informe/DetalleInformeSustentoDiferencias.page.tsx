import { useParams } from "react-router-dom"

import { getInformeSustentoDiferenciasById } from "../../features/informe/service"

import { useFetch } from "../../hooks/useFetch"

import DocumentDetails from "../../components/ui/DocumentDetails"

function DetalleInformeSustentoDiferencias() {
  const { informeId } = useParams()

  const { data: documentDetails, isLoading: isLoadingDocument } = useFetch({
    serviceFn: () => getInformeSustentoDiferenciasById(parseInt(informeId!)),
  })

  return (
    <DocumentDetails document={documentDetails} isLoading={isLoadingDocument} />
  )
}

export default DetalleInformeSustentoDiferencias
