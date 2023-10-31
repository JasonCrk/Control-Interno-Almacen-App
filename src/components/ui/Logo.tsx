import { FC } from "react"

import { ColorProps, Image, SpaceProps, Stack, Text } from "@chakra-ui/react"

import logoImage from "../../assets/images/logo.jpg"

type LogoTitleFormat = "long" | "sort"
type LogoTitleDirection = "row" | "column"

interface Props {
  imageSize: string
  padding?: SpaceProps["padding"]
  imageShadow?: boolean
  showTitle?: boolean
  titleFormat?: LogoTitleFormat
  titleSize?: string
  titleDirection?: LogoTitleDirection
  titleColor?: ColorProps["color"]
}

const Logo: FC<Props> = ({
  imageSize,
  imageShadow,
  padding,
  showTitle,
  titleColor,
  titleSize = "1.1rem",
  titleFormat = "sort",
  titleDirection = "row",
}) => {
  return (
    <Stack
      alignItems={"center"}
      spacing={4}
      direction={titleDirection}
      padding={padding}
    >
      <Image
        src={logoImage}
        alt="logo"
        width={imageSize}
        height={imageSize}
        rounded={"full"}
        shadow={imageShadow ? "lg" : "none"}
      />

      {showTitle ? (
        titleFormat === "sort" ? (
          <Text fontSize={titleSize} color={titleColor} fontWeight={"semibold"}>
            SMV
          </Text>
        ) : titleFormat === "long" ? (
          <Text
            fontSize={titleSize}
            color={titleColor}
            fontWeight={"semibold"}
            lineHeight={1.4}
            textAlign={titleDirection === "column" ? "center" : "start"}
          >
            Superintendencia del Mercado de Valores
          </Text>
        ) : null
      ) : null}
    </Stack>
  )
}

export default Logo
