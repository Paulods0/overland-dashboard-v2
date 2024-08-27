import CardStatus from "./card-status"
import { useGetUsers } from "@/lib/tanstack-query/users/user-queries"
import { useGetAllPosts } from "@/lib/tanstack-query/post/post-queries"
import { useGetProducts } from "@/lib/tanstack-query/product/product-queries"

import { Users } from "lucide-react"
import { ScrollText } from "lucide-react"
import { ShoppingCart } from "lucide-react"

const CardsContainer = () => {
  const { isLoading: isLoadingUsers, data: users } = useGetUsers("", "1")
  const { isLoading: isLoadingPosts, data: posts } = useGetAllPosts("", "", "1")
  const { isLoading: isLoadingProducts, data: products } = useGetProducts(
    "",
    ""
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-2 w-full lg:flex-[2]">
      <CardStatus
        data={posts}
        link="/posts"
        title="Posts"
        icon={ScrollText}
        color="bg-red-600"
        isLoading={isLoadingPosts}
        className="h-full w-full rounded-3xl p-4"
      />
      <CardStatus
        icon={Users}
        data={users}
        link="/usuários"
        title="Usuários"
        color="bg-indigo-600"
        isLoading={isLoadingUsers}
        className="h-full w-full lg:row-span-2 rounded-3xl p-4"
      />

      <CardStatus
        link="/loja"
        data={products}
        icon={ShoppingCart}
        color="bg-neutral-800"
        title="Artigos na loja"
        isLoading={isLoadingProducts}
        className="h-full w-full rounded-3xl p-4"
      />
    </div>
  )
}

export default CardsContainer
