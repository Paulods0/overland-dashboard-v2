export type Subscriber = {
  _id: string
  email: string
  name: string
  phone?: string
  country?: string
  countryCode?: string
}

export interface CreateSubscriberDTO {
  email: string
  name: string
  phone?: string
  country?: string
  countryCode?: string
}

export interface UpdateSubscriberDTO {
  id: string
  name?: string
  email?: string
  phone?: string
  country?: string
  countryCode?: string
}

export interface SubscriberResponseDTO {
  pages: number
  subs: Subscriber[]
}
