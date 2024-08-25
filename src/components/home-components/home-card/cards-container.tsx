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
  const { isLoading: isLoadingProducts, data: products } = useGetProducts("","")

  return (
    <div className="flex w-full md:col-span-2 items-center flex-wrap md:flex-nowrap lg:justify-end gap-2">
      <CardStatus
        data={posts}
        link="/posts"
        title="Posts"
        icon={ScrollText}
        color="bg-red-600"
        isLoading={isLoadingPosts}
      />
      <CardStatus
        icon={Users}
        data={users}
        link="/usuários"
        title="Usuários"
        color="bg-indigo-600"
        isLoading={isLoadingUsers}
      />
      <CardStatus
        link="/loja"
        data={products}
        icon={ShoppingCart}
        color="bg-neutral-800"
        title="Artigos na loja"
        isLoading={isLoadingProducts}
      />
    </div>
  )
}

export default CardsContainer
