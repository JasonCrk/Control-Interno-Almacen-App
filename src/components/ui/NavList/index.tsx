import { FC } from "react"

import { useAppSelector } from "../../../store/hooks"

import { VStack } from "@chakra-ui/react"

import NavLink from "../NavLink"

import { LINKS } from "./links"

const NavList: FC = () => {
  const role = useAppSelector(state => state.auth.user!.role)

  return (
    <VStack align={"start"} spacing={0}>
      <NavLink to="/" name="Menu Principal" />
      {LINKS.filter(link => link.role.includes(role)).map(link => (
        <NavLink key={link.id} to={link.to} name={link.name} />
      ))}
    </VStack>
  )
}

export default NavList
