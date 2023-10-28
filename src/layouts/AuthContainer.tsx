import { Flex } from "@chakra-ui/react"
import { FC } from "react"

import { Outlet } from "react-router-dom"

const AuthContainer: FC = () => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Outlet />
    </Flex>
  )
}

export default AuthContainer
