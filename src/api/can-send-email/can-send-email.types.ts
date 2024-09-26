export type UpdateCanSendEmailRequestDTO = {
  id: string
  value: boolean
}

export type SendEmail = {
  _id: string
  canSendEmail: boolean
}

export type SendEmailResponseDTO = {
  _id: string
  canSendEmail: boolean
}
