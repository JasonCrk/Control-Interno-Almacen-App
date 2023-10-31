import { FC } from "react"

import { Link } from "react-router-dom"

import { Box } from "@chakra-ui/react"

interface Props {
  to: string
  name: string
}

const NavLink: FC<Props> = ({ to, name }) => {
  const isActive = window.location.pathname === to

  return (
    <Box
      as={Link}
      to={to}
      borderLeftColor={isActive ? "white" : "gray.700"}
      borderLeftStyle={"solid"}
      borderLeftWidth={"4px"}
      bg={isActive ? "gray.600" : "none"}
      color={"white"}
      fontSize={"1.05rem"}
      py={2}
      width={"full"}
      px={4}
      sx={{
        ":hover": {
          backgroundColor: "gray.600",
          borderLeftColor: "white",
        },
      }}
    >
      {name}
    </Box>
  )
}

export default NavLink
