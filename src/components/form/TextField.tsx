import { FC } from "react"

import { UseFormRegister } from "react-hook-form"

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react"

interface Props extends InputProps {
  label?: string
  register: UseFormRegister<any>
  errorMessage?: string
  name: string
}

const TextField: FC<Props> = ({
  register,
  errorMessage,
  label,
  name,
  ...props
}) => {
  return (
    <FormControl isInvalid={props.isInvalid}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input {...props} {...register(name)} />
      {errorMessage && props.isInvalid && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default TextField
