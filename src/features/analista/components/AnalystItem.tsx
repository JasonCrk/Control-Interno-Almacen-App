import { FC } from "react"

import { UserId, UserItem } from "../../../models/user.model"

import { Avatar, Card, Text, Flex } from "@chakra-ui/react"

import { AiOutlineCheck } from "react-icons/ai"

interface Props {
  analyst: UserItem
  selectedAnalystId: UserId | null
  toggleAssignAnalyst: (analystId: UserId) => void
}

const AnalystItem: FC<Props> = ({
  analyst,
  selectedAnalystId,
  toggleAssignAnalyst,
}) => {
  return (
    <Card
      w={"full"}
      p={3}
      key={analyst.id}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDir={"row"}
      cursor={"pointer"}
      onClick={() => toggleAssignAnalyst(analyst.id)}
      bg={selectedAnalystId === analyst.id ? "green.100" : "white"}
      sx={{
        ":hover": {
          backgroundColor:
            selectedAnalystId === analyst.id ? "green.100" : "gray.50",
        },
      }}
    >
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={analyst.avatar} size={"sm"} />
        <Text>
          {analyst.firstName} {analyst.lastName}
        </Text>
      </Flex>

      {selectedAnalystId && (
        <AiOutlineCheck
          style={{
            fontSize: "1.5rem",
          }}
        />
      )}
    </Card>
  )
}

export default AnalystItem
