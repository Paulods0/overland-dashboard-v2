import { UserAPI } from "@/api/users"
import { useQuery } from "@tanstack/react-query"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { User, UserResponseDTO } from "@/api/users/user.type"

export const useGetUsers = (page?: string,limit?:string) => {
  return useQuery<UserResponseDTO>({
    queryKey: [KEYS.GET_USERS, page, limit],
    queryFn: () => UserAPI.getUsers(page, limit),
  })
}

export const useGetSingleUser = (id: string) => {
  return useQuery<User>({
    queryKey: [KEYS.GET_SINGLE_USER],
    queryFn: () => UserAPI.getSingleUser(id),
  })
}
