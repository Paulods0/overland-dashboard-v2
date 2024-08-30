import { ProductAPI } from "@/api/product"
import { Product, ProductResponseDTO } from "@/api/product/product.types"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useQuery } from "@tanstack/react-query"

export const useGetProducts = (
  page: string,
  category: string,
  limit: string
) => {
  return useQuery<ProductResponseDTO>({
    queryKey: [KEYS.GET_PRODUCTS, page, category, limit],
    queryFn: () => ProductAPI.getProducts(page, category, limit),
  })
}

export const useGetSingleProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: [KEYS.GET_SINGLE_PRODUCT, id],
    queryFn: () => ProductAPI.getSingleProduct(id),
  })
}
