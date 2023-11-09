import type { ChangeEvent, FC } from "react"

import { UseFormRegister } from "react-hook-form"

import { Box, Button, Flex, Input, Text } from "@chakra-ui/react"

import { HiDocumentText } from "react-icons/hi"

interface Props {
  register: UseFormRegister<any>
  onChange?: (file: ChangeEvent<HTMLInputElement>) => void
  errorMessage?: string
  isError?: boolean
  name: string
  accept: string
  value?: File
}

const UploadFileButton: FC<Props> = ({
  name,
  register,
  errorMessage,
  isError,
  accept,
  onChange,
  value,
}) => {
  return (
    <Box>
      <Input
        id="document"
        type="file"
        display="none"
        accept={accept}
        {...register(name, { onChange })}
      />
      <Flex gap={2} alignItems={"center"}>
        <Button
          as={"label"}
          htmlFor="document"
          mb={1}
          variant={"outline"}
          colorScheme={isError ? "red" : "linkedin"}
        >
          Seleccionar documento
        </Button>

        {value ? (
          <Flex color={"linkedin.600"} fontSize={"lg"} alignItems={"center"}>
            <HiDocumentText style={{ fontSize: "1.9rem" }} />
            <Text>{value.name}</Text>
          </Flex>
        ) : (
          <Text>No ha seleccionado ningún documento</Text>
        )}
      </Flex>

      {isError && (
        <Text color={"red.500"} fontSize={"sm"}>
          {errorMessage}
        </Text>
      )}
    </Box>
  )
}

export default UploadFileButton
