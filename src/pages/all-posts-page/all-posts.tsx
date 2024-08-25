import { Plus } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import LoadingData from "@/components/global/loading-data"
import LinkButton from "@/components/ui/button/link-button"
import NothingToShow from "@/components/global/nothing-to-show"
import PostCard from "@/components/all-posts-components/post-card"
import { useGetAllPosts } from "@/lib/tanstack-query/post/post-queries"
import FilterContainer from "@/components/all-posts-components/filter-container"

const AllPosts = () => {
  const [search, setSearch] = useSearchParams({
    page: "1",
    category: "",
    limit: "",
  })

  const currentPage = search.get("page") || "1"
  const category = search.get("category") || ""
  const limit = search.get("limit") || "2"

  const { data, isLoading } = useGetAllPosts(currentPage, category, limit)

  if (isLoading) return <LoadingData />

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

          {!data?.posts ? (
            <NothingToShow name="post" />
          ) : (
            <div className="w-full h-[50dvh] md:h-[60vh] py-2 overflow-y-auto grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 gap-4 lg:grid-cols-4 place-items-center">
              {data?.posts?.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          <Pagination
            pages={data?.pages}
            setSearch={setSearch}
            currentPage={Number(currentPage)}
          />
        </section>
      </Container>
    </main>
  )
}

export default AllPosts
