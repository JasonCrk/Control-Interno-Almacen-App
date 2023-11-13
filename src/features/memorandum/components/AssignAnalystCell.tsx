import { FC } from "react"

import { MemorandumResponse } from "../models"
import { DocumentId } from "../../../models/document.model"

import { Avatar, Button, Flex, Text } from "@chakra-ui/react"

interface Props {
  memorandum: MemorandumResponse
  handleSelectionMemorandum: (memorandumId: DocumentId) => void
}

const AssignAnalystCell: FC<Props> = ({
  memorandum,
  handleSelectionMemorandum,
}) => {
  if (memorandum.assigned)
    return (
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={memorandum.assigned.avatar} />
        <Text>
          {memorandum.assigned.firstName}
          <br />
          {memorandum.assigned.lastName}
        </Text>
      </Flex>
    )

  return (
    <Button
      w={"full"}
      colorScheme="purple"
      onClick={event => {
        event.stopPropagation()
        handleSelectionMemorandum(memorandum.id)
      }}
    >
      Asignar
    </Button>
  )
}

export default AssignAnalystCell
