import { Plus } from "lucide-react"
import Loading from "@/components/global/loading"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import LinkButton from "@/components/ui/button/link-button"
import PostCard from "@/components/all-posts-components/post-card"
import { useGetAllPosts } from "@/lib/tanstack-query/post/post-queries"
import FilterContainer from "@/components/all-posts-components/filter-container"
import { useSearchParams } from "react-router-dom"

const AllPosts = () => {
  const [search, setSearch] = useSearchParams({ page: "1", category: "" })

  const currentPage = Number(search.get("page") || 1)
  console.log(currentPage)

  const { data, isLoading } = useGetAllPosts(currentPage)
  // console.log(data?.posts)

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-120px)] flex items-center justify-center">
        <Loading size={32} />
      </div>
    )
  }

  return (
    <main>
      <Container>
        <section className="w-full flex gap-2 flex-col">
          <div className="w-full flex items-center justify-between lg:flex-nowrap flex-wrap gap-4">
            <FilterContainer setSearch={setSearch} />
            <LinkButton
              label="Adicionar"
              href="/novo"
              icon={Plus}
              className="bg-white text-black"
            />
          </div>

          <div className="w-full h-[50dvh] md:h-[60vh] py-2 overflow-y-auto grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 gap-4 lg:grid-cols-4 place-items-center">
            {data?.posts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <Pagination currentPage={1} setSearch={setSearch} />
        </section>
      </Container>
    </main>
  )
}

export default AllPosts
