import { useParams } from "react-router-dom"

import { UserRole } from "../../models/user.model"
import { DocumentId } from "../../models/document.model"

import { useAppSelector } from "../../store/hooks"

import {
  MemorandumResponse,
  MemorandumStatus,
} from "../../features/memorandum/models"
import {
  approveMemorandumSolicitudDesignacion,
  getMemorandumById,
} from "../../features/memorandum/service"

import { useFetch } from "../../hooks/useFetch"
import { useCallService } from "../../hooks/useCallFetch"

import { Button, useToast } from "@chakra-ui/react"

import DocumentDetails from "../../components/ui/DocumentDetails"

function DetalleMemorandumSolicitudDesignacion() {
  const role = useAppSelector(state => state.auth.user?.role)

  const { memorandumId } = useParams()
  const toast = useToast()

  const {
    data: documentDetails,
    isLoading: isLoadingDocument,
    refetch: refetchMemorandum,
  } = useFetch({
    serviceFn: () => getMemorandumById(parseInt(memorandumId!)),
  })

  const {
    isLoading: isLoadingApproveMemorandum,
    callService: approveMemorandumService,
  } = useCallService({
    serviceFn: approveMemorandumSolicitudDesignacion,
    options: {
      onSuccess: data => {
        toast({
          title: "Actualización de Memorandum",
          description: data.message,
          duration: 3000,
          isClosable: true,
          status: "success",
        })
        refetchMemorandum()
      },
    },
  })

  const handleApproveMemorandum = async (memorandumId: DocumentId) => {
    if (
      documentDetails &&
      documentDetails.status !== MemorandumStatus.APROBADO
    ) {
      await approveMemorandumService(memorandumId)
    }
  }

  return (
    <DocumentDetails
      document={documentDetails}
      isLoading={isLoadingDocument}
      tags={(document: MemorandumResponse) =>
        role === UserRole.JEFE_UNIDAD_LOGISTICA ||
        role === UserRole.TECNICO_ADMINISTRATIVO_LOGISTICA
          ? [document.status]
          : []
      }
      options={(document: MemorandumResponse) => (
        <>
          {role === UserRole.JEFE_UNIDAD_LOGISTICA ? (
            <Button
              colorScheme="green"
              isLoading={isLoadingApproveMemorandum}
              isDisabled={document.status === MemorandumStatus.APROBADO}
              onClick={() => handleApproveMemorandum(document.id)}
            >
              {document.status === MemorandumStatus.APROBADO
                ? "Aprobado"
                : "Aprobar"}
            </Button>
          ) : null}
        </>
      )}
    />
  )
}

export default DetalleMemorandumSolicitudDesignacion
