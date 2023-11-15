export const datetimeFormat = (
  datetime: string,
  dateStyle: Intl.DateTimeFormatOptions["dateStyle"]
): string => {
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle,
    timeStyle: "short",
    timeZone: "America/Lima",
    hour12: true,
  }).format(new Date(datetime))
}
