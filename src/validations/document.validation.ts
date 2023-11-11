import z from "zod"

export const createDocumentSchemaValidation = z.object({
  title: z
    .string({
      invalid_type_error: "Debe de ser texto",
      required_error: "El titulo es requerido",
    })
    .min(1, { message: "El titulo es requerido" })
    .max(255, { message: "Máximo 255 caracteres" }),
  document: z
    .instanceof(File, { message: "El documento es requerido" })
    .refine(file => file.name.endsWith(".docx"), {
      message: "El documento debe de ser un archivo Word",
    }),
})

export const updateDocumentSchemaValidation = z.object({
  title: z
    .string({
      invalid_type_error: "Debe de ser texto",
      required_error: "El titulo es requerido",
    })
    .min(1, { message: "El titulo es requerido" })
    .max(255, { message: "Máximo 255 caracteres" }),
  document: z.optional(
    z
      .any()
      .nullish()
      .refine(
        (file: File | null | undefined) =>
          file instanceof File ? file.name.endsWith(".docx") : true,
        {
          message: "El documento debe de ser un archivo Word",
        }
      )
  ),
})
