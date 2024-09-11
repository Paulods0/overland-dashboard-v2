import { Users } from "lucide-react"
import CardStatus from "./card-status"
import { ScrollText } from "lucide-react"
import { ShoppingCart } from "lucide-react"
import LoadingData from "@/components/global/loading-data"
import { useGetSubs } from "@/lib/tanstack-query/subs/subs-queries"
import { useGetAllPosts } from "@/lib/tanstack-query/post/post-queries"
import { useGetProducts } from "@/lib/tanstack-query/product/product-queries"

const CardsContainer = () => {
  const { isLoading: isLoadingUsers, data: subs } = useGetSubs("")
  const { isLoading: isLoadingPosts, data: posts } = useGetAllPosts("", "", "1")
  const { isLoading: isLoadingProducts, data: products } = useGetProducts(
    "",
    "",
    ""
  )

  if (isLoadingUsers || isLoadingPosts || isLoadingProducts) {
    return <LoadingData />
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-2 w-full lg:flex-[2]">
      <CardStatus
        data={posts}
        link="/posts"
        title="Posts"
        icon={ScrollText}
        color="bg-red-600"
        className="h-full w-full rounded-3xl p-4"
      />
      <CardStatus
        icon={Users}
        data={subs}
        title="Inscritos"
        link="/inscritos"
        color="bg-indigo-600"
        className="h-full w-full rounded-3xl p-4"
      />

      <CardStatus
        link="/loja"
        data={products}
        icon={ShoppingCart}
        color="bg-neutral-800"
        title="Artigos na loja"
        className="h-full w-full rounded-3xl p-4"
      />

      <div className="flex flex-col items-center gap-8">
        <h3>Ativar/Desativar envio de emails.</h3>

        <button className={`relative border rounded-full w-24 h-8`}>
          <input type="checkbox" className="size-6 " />
        </button>
      </div>
    </div>
  )
}

export default CardsContainer
