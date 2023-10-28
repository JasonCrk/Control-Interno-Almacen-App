import z from "zod"

export const loginValidationSchema = z.object({
  email: z
    .string({
      invalid_type_error: "La correo electrónico debe de ser texto",
      required_error: "El correo electrónico es requerido",
    })
    .email({ message: "El correo electrónico es invalido" }),
  password: z
    .string({
      invalid_type_error: "La contraseña debe de ser texto",
      required_error: "La contraseña es requerida",
    })
    .min(1, { message: "La contraseña es requerida" })
    .max(240, { message: "Máximo 240 caracteres" }),
})
