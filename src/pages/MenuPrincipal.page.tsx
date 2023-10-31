import { Flex } from "@chakra-ui/react"

import Logo from "../components/ui/Logo"

function PaginaPrincipal() {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
      <Logo
        imageSize="200px"
        imageShadow
        showTitle
        titleDirection="column"
        titleSize="2rem"
        titleFormat="long"
      />
    </Flex>
  )
}

export default PaginaPrincipal
