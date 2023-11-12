import { FC } from "react"

import { userRoles } from "../../models/user.model"

import { useAppSelector } from "../../store/hooks"

import { Flex, Image, Text } from "@chakra-ui/react"

const UserDetails: FC = () => {
  const userAuth = useAppSelector(state => state.auth.user)

  return (
    <Flex flexDirection={"column"} alignItems={"center"} gap={1.5} px={4}>
      <Image
        src={userAuth?.avatar}
        alt={userAuth?.firstName}
        rounded={"full"}
        width={"130px"}
        height={"130px"}
      />
      <Text
        color={"white"}
        fontSize={"1.45rem"}
        textAlign={"center"}
        fontWeight={"bold"}
        lineHeight={7}
      >
        {userAuth?.firstName} <br />
        {userAuth?.lastName}
      </Text>
      <Text
        color={"white"}
        bg={"gray.500"}
        px={2}
        py={1}
        rounded={"md"}
        fontSize={"sm"}
        textAlign={"center"}
      >
        {userAuth && userRoles[userAuth.role]}
      </Text>
    </Flex>
  )
}

export default UserDetails
