import { useParams } from "react-router-dom"

import { getMemorandumById } from "../../features/memorandum/service"

import { useFetch } from "../../hooks/useFetch"

import DocumentDetails from "../../components/ui/DocumentDetails"

function DetalleMemorandumSolicitudDesignacion() {
  const { memorandumId } = useParams()

  const { data, isLoading } = useFetch({
    serviceFn: () => getMemorandumById(parseInt(memorandumId!)),
  })

  return <DocumentDetails document={data} isLoading={isLoading} />
}

export default DetalleMemorandumSolicitudDesignacion
