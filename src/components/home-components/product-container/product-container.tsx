import LoadingData from "@/components/global/loading-data"
import NothingToShow from "@/components/global/nothing-to-show"
import { useGetProducts } from "@/lib/tanstack-query/product/product-queries"
import ProductGrid from "./product-grid"

const ProductContainer = () => {
  const { data, isLoading } = useGetProducts("", "")

  if (isLoading) return <LoadingData />
  if (!data?.products) return <NothingToShow name="artigo" />
  return (
    <div className="w-full">
      {!data?.products ? (
        <NothingToShow name="artigo" />
      ) : (
        <ProductGrid products={data.products} />
      )}
    </div>
  )
}

export default ProductContainer
