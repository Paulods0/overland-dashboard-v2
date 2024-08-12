import { SchedulePostAPI } from "@/api/schedule"
import {
  SchedulePost,
  ScheduleResponseDTO,
} from "@/api/schedule/schedule.types"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useQuery } from "@tanstack/react-query"

export const useGetSchedules = (page: string) => {
  return useQuery<ScheduleResponseDTO>({
    queryKey: [KEYS.GET_SCHEDULES],
    queryFn: () => SchedulePostAPI.getSchedules(page),
  })
}

export const useGetSingleSchedule = (id: string) => {
  return useQuery<SchedulePost>({
    queryKey: [KEYS.GET_SINGLE_SCHEDULE, id],
    queryFn: () => SchedulePostAPI.getSingleSchedule(id),
  })
}
