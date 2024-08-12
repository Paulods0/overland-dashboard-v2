import { ProductAPI } from "@/api/product"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation } from "@tanstack/react-query"

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: [KEYS.CREATE_PRODUCT],
    mutationFn: ProductAPI.createProduct,
  })
}

export const useUpdateProduct = () => {
  return useMutation({
    mutationKey: [KEYS.UPDATE_PRODUCT],
    mutationFn: ProductAPI.updateProduct,
  })
}

export const useDeleteProduct = () => {
  return useMutation({
    mutationKey: [KEYS.DELETE_PRODUCT],
    mutationFn: ProductAPI.deleteProduct,
  })
}
