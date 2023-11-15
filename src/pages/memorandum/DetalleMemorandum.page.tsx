import { useParams } from "react-router-dom"

import { UserRole } from "../../models/user.model"
import { DocumentId } from "../../models/document.model"
import { MessageResponse } from "../../models/response.model"

import { useAppSelector } from "../../store/hooks"

import {
  MemorandumResponse,
  MemorandumStatus,
  MemorandumType,
} from "../../features/memorandum/models"
import {
  approveMemorandumDesignacion,
  approveMemorandumSolicitudDesignacion,
  getMemorandumById,
} from "../../features/memorandum/service"

import { useFetch } from "../../hooks/useFetch"
import { useCallService } from "../../hooks/useCallFetch"

import { Button, useToast } from "@chakra-ui/react"

import DocumentDetails from "../../components/ui/DocumentDetails"

function DetalleMemorandum() {
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

  const onSuccessApproveMemorandum = (data: MessageResponse) => {
    toast({
      title: "Actualización de Memorandum",
      description: data.message,
      duration: 3000,
      isClosable: true,
      status: "success",
    })
    refetchMemorandum()
  }

  const {
    isLoading: isLoadingApproveMemorandumSolicitudDesignacion,
    callService: approveMemorandumSolicitudDesignacionService,
  } = useCallService({
    serviceFn: approveMemorandumSolicitudDesignacion,
    options: {
      onSuccess: data => onSuccessApproveMemorandum(data),
    },
  })

  const {
    isLoading: isLoadingApproveMemorandumDesignacion,
    callService: approveMemorandumDesignacionService,
  } = useCallService({
    serviceFn: approveMemorandumDesignacion,
    options: {
      onSuccess: data => onSuccessApproveMemorandum(data),
    },
  })

  const handleApproveMemorandum = async (
    memorandumId: DocumentId,
    memorandumType: MemorandumType,
    memorandumStatus: MemorandumStatus
  ) => {
    if (memorandumStatus === MemorandumStatus.PENDIENTE) {
      if (memorandumType === MemorandumType.DESIGNACION) {
        await approveMemorandumDesignacionService(memorandumId)
      } else if (memorandumType === MemorandumType.SOLICITUD_DESIGNACION) {
        await approveMemorandumSolicitudDesignacionService(memorandumId)
      }
    }
  }

  const buttonApproveContent = (status: MemorandumStatus) =>
    status === MemorandumStatus.APROBADO ? "Aprobado" : "Aprobar"

  return (
    <DocumentDetails
      document={documentDetails}
      isLoading={isLoadingDocument}
      tags={(document: MemorandumResponse) => [document.type, document.status]}
      options={(document: MemorandumResponse) => (
        <>
          {role === UserRole.JEFE_UNIDAD_LOGISTICA &&
          document.type === MemorandumType.SOLICITUD_DESIGNACION ? (
            <Button
              colorScheme="green"
              isLoading={isLoadingApproveMemorandumSolicitudDesignacion}
              isDisabled={document.status === MemorandumStatus.APROBADO}
              onClick={() =>
                handleApproveMemorandum(
                  document.id,
                  document.type,
                  document.status
                )
              }
            >
              {buttonApproveContent(document.status)}
            </Button>
          ) : role === UserRole.JEFE_UNIDAD_FINANZAS &&
            document.type === MemorandumType.DESIGNACION ? (
            <Button
              colorScheme="green"
              isLoading={isLoadingApproveMemorandumDesignacion}
              isDisabled={document.status === MemorandumStatus.APROBADO}
              onClick={() =>
                handleApproveMemorandum(
                  document.id,
                  document.type,
                  document.status
                )
              }
            >
              {buttonApproveContent(document.status)}
            </Button>
          ) : null}
        </>
      )}
    />
  )
}

export default DetalleMemorandum
