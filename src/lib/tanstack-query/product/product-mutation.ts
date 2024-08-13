import { ProductAPI } from "@/api/product"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.CREATE_PRODUCT],
    mutationFn: ProductAPI.createProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_PRODUCTS] }),
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.UPDATE_PRODUCT],
    mutationFn: ProductAPI.updateProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_PRODUCTS] }),
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.DELETE_PRODUCT],
    mutationFn: ProductAPI.deleteProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_PRODUCTS] }),
  })
}
