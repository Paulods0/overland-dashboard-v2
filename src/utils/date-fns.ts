import { pt } from "date-fns/locale"
import { format, parseISO, isValid } from "date-fns"

export function formatDate(date: string) {
  const parsedDate = parseISO(date)
  const isValidDate = isValid(parsedDate)

  if (isValidDate) {
    const newDate = format(parsedDate, "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    })
    return newDate
  }
  return ""
}
