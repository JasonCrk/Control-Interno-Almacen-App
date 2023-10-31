import { FC } from "react"

import { GridItem } from "@chakra-ui/react"

import Logo from "./Logo"
import UserDetails from "./UserDetails"
import NavList from "./NavList"

const NavbarAside: FC = () => {
  return (
    <GridItem
      as="aside"
      display={"flex"}
      flexDirection={"column"}
      gap={5}
      bg={"gray.700"}
    >
      <Logo
        imageSize="68px"
        showTitle
        padding={"20px 22px"}
        titleColor={"white"}
        titleSize="1.15rem"
        titleFormat="long"
      />
      <UserDetails />
      <NavList />
    </GridItem>
  )
}

export default NavbarAside
