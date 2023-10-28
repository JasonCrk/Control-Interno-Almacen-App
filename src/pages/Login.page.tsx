import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAppDispatch } from "../store/hooks"
import { setIsAuth, setTokens } from "../store/auth/authSlice"

import type { LoginCredentials } from "../features/authentication/models"

import { loginValidationSchema } from "../features/authentication/validations"

import { login } from "../features/authentication/services"

import { useCallService } from "../hooks/useCallFetch"

import { Button, Card, CardBody, CardHeader, Image } from "@chakra-ui/react"

import TextField from "../components/form/TextField"

import logoImg from "../assets/images/logo.jpg"

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { callService: callLoginService, isLoading } = useCallService({
    serviceFn: login,
    options: {
      onSuccess(data) {
        dispatch(setTokens(data))
        dispatch(setIsAuth())
        navigate("/")
      },
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginValidationSchema),
  })

  const handleLogin = handleSubmit(async credentials => {
    await callLoginService(credentials)
  })

  return (
    <Card width={"480px"}>
      <CardHeader display={"flex"} justifyContent={"center"}>
        <Image
          src={logoImg}
          alt="super"
          borderRadius={"full"}
          width={"150px"}
          height={"150px"}
          borderWidth={1}
          borderColor={"GrayText"}
          borderStyle={"solid"}
          objectFit={"cover"}
        />
      </CardHeader>

      <CardBody
        as="form"
        onSubmit={handleLogin}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
      >
        <TextField
          name="email"
          type="email"
          register={register}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          placeholder="Email"
        />

        <TextField
          name="password"
          type="password"
          register={register}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          placeholder="Password"
        />

        <Button
          type="submit"
          colorScheme="facebook"
          alignSelf={"center"}
          isLoading={isLoading}
          loadingText={"Iniciando sesión"}
        >
          Iniciar sesión
        </Button>
      </CardBody>
    </Card>
  )
}

export default Login
