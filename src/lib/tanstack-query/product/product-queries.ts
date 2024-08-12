import { ProductAPI } from "@/api/product"
import { Product, ProductResponseDTO } from "@/api/product/product.types"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useQuery } from "@tanstack/react-query"

export const useGetProducts = (page: string) => {
  return useQuery<ProductResponseDTO>({
    queryKey: [KEYS.GET_PRODUCTS],
    queryFn: () => ProductAPI.getProducts(page),
  })
}

export const useGetSingleProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: [KEYS.GET_SINGLE_PRODUCT, id],
    queryFn: () => ProductAPI.getSingleProduct(id),
  })
}
