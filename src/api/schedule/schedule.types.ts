export type SchedulePost = {
  id: string
  file: string
  title: string
  author: string
}

export interface CreateScheduleDTO {
  file: string
  title: string
  author: string
}

export interface UpdateScheduleDTO {
  id: string
  file?: string | File
  title?: string
  author?: string
}

export interface ScheduleResponseDTO {
  total: number
  pages: number
  posts: SchedulePost[]
}
