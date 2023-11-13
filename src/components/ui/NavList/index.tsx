import { FC } from "react"

import { useAppSelector } from "../../../store/hooks"

import { UserRole } from "../../../models/user.model"

import { VStack } from "@chakra-ui/react"

import NavLink from "../NavLink"

import { LINKS } from "./links"

const NavList: FC = () => {
  const role = useAppSelector(state => state.auth.user?.role)

  return (
    <VStack align={"start"} spacing={0}>
      <NavLink to="/" name="Menu Principal" />
      {role
        ? role === UserRole.ADMIN
          ? LINKS.map(link => (
              <NavLink key={link.id} to={link.to} name={link.name} />
            ))
          : LINKS.filter(link => link.role.includes(role)).map(link => (
              <NavLink key={link.id} to={link.to} name={link.name} />
            ))
        : null}
    </VStack>
  )
}

export default NavList
