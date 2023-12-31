import { FC } from "react"

import { useNavigate } from "react-router-dom"

import { useAppDispatch } from "../../store/hooks"
import { setLogoutAuth, setUserAuth } from "../../store/auth/authSlice"

import { logout } from "../../features/authentication/services/logout.service"

import { Box, Button, GridItem } from "@chakra-ui/react"

import Logo from "./Logo"
import UserDetails from "./UserDetails"
import NavList from "./NavList"

import { RiLogoutBoxLine } from "react-icons/ri"

const NavbarAside: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    logout()
      .then(() => {
        dispatch(setLogoutAuth())
        navigate("/auth/login")
        dispatch(setUserAuth(null))

        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
      })
      .catch(e => console.error(e))
  }

  return (
    <GridItem
      as="aside"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      bg={"gray.700"}
      height={"100vh"}
      position={"sticky"}
      top={0}
    >
      <Box display={"flex"} flexDirection={"column"} gap={5}>
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
      </Box>

      <Button
        alignSelf={"start"}
        mb={3}
        ml={3}
        leftIcon={<RiLogoutBoxLine />}
        colorScheme="red"
        onClick={() => handleLogout()}
      >
        Cerrar Sesión
      </Button>
    </GridItem>
  )
}

export default NavbarAside
