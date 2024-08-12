import { SchedulePostAPI } from "@/api/schedule"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateSchedule = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.CREATE_SCHEDULE],
    mutationFn: SchedulePostAPI.createSchedule,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_SCHEDULES] }),
  })
}

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.UPDATE_SCHEDULE],
    mutationFn: SchedulePostAPI.updateSchedule,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_SCHEDULES] }),
  })
}

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.DELETE_SCHEDULE],
    mutationFn: SchedulePostAPI.deleteSchedule,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_SCHEDULES] }),
  })
}
