export const longDatetimeFormat = (datetime: string): string => {
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Lima",
    hour12: true,
  }).format(new Date(datetime))
}
