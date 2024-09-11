import { ClassifiedAPI } from "@/api/classified"
import { useQuery } from "@tanstack/react-query"
import { KEYS } from "@/utils/tanstack-query.enuns"
import {
  Classified,
  ClassifiedResonseDTO,
} from "@/api/classified/classified.types"

export function useGetClassifieds() {
  return useQuery<ClassifiedResonseDTO>({
    queryKey: [KEYS.GET_CLASSIFIEDS],
    queryFn: ClassifiedAPI.getAll,
  })
}

export function useGetSingleClassified(id: string) {
  return useQuery<Classified>({
    queryKey: [KEYS.GET_CLASSIFIEDS, id],
    queryFn: () => ClassifiedAPI.getOne(id),
  })
}
