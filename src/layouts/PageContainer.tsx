import { FC } from "react"

import { Outlet } from "react-router-dom"

import { Grid, GridItem } from "@chakra-ui/react"

import NavbarAside from "../components/ui/NavbarAside"

const PageContainer: FC = () => {
  return (
    <Grid
      templateColumns={{ sm: "1fr", md: "37% 1fr", lg: "25% 1fr" }}
      height={"100vh"}
    >
      <NavbarAside />
      <GridItem>
        <Outlet />
      </GridItem>
    </Grid>
  )
}

export default PageContainer
