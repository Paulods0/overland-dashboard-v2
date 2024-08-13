export type Role = "admin" | "store-manager" | "publicator" | string

export type User = {
  role: Role
  _id: string
  email: string
  image?: string
  lastname: string
  firstname: string
}
export interface CreateUserDTO {
  role: Role
  email: string
  password: string
  lastname: string
  firstname: string
  image?: File | string | null
}
export interface UserResponseDTO {
  pages: number
  users: User[]
}

export interface UpdateUserDTO {
  id: string
  role?: Role
  email?: string
  password?: string
  lastname?: string
  firstname?: string
  image?: File | string | null
}
