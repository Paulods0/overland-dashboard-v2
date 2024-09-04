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
    limit: "",
    category: "",
  })

  const limit = search.get("limit") || "8"
  const category = search.get("category") || ""
  const currentPage = search.get("page") || "1"

  const { data, isLoading } = useGetAllPosts(currentPage, limit, category)

  if (isLoading) return <LoadingData />

  return (
    <Container className="flex gap-12 flex-col py-4">
      <div className="flex items-center w-full justify-between flex-wrap gap-4">
        <FilterContainer setSearch={setSearch} />
        <LinkButton
          label="Adicionar"
          href="/novo"
          icon={Plus}
          className="bg-white text-black w-fit"
        />
      </div>

      {data && data?.posts.length > 0 ? (
        <div className="h-[50dvh] md:h-[80vh] py-2 grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 gap-4 lg:grid-cols-4 place-items-center w-full">
          {data?.posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <NothingToShow name="post" />
      )}

      <Pagination
        pages={data?.pages}
        setSearch={setSearch}
        currentPage={Number(currentPage)}
      />
    </Container>
  )
}

export default AllPosts
