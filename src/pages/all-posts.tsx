import { Plus } from "lucide-react"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import LinkButton from "@/components/ui/button/link-button"
import PostCard from "@/components/all-posts-components/post-card"
import FilterContainer from "@/components/all-posts-components/filter-container"

const AllPosts = () => {
  return (
    <main>
      <Container>
        <section className="w-full flex gap-2 flex-col">
          <div className="w-full flex items-center justify-between lg:flex-nowrap flex-wrap gap-4">
            <FilterContainer />
            <LinkButton
              label="Adicionar"
              href="/novo"
              icon={Plus}
              className="bg-white text-black"
            />
          </div>

          <div className="w-full h-[50dvh] md:h-[60vh] py-2 overflow-y-auto grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 gap-4 lg:grid-cols-4 place-items-center">
            {Array.from({ length: 10 }).map((_, index) => (
              <PostCard key={index} />
            ))}
          </div>
          <Pagination />
        </section>
      </Container>
    </main>
  )
}

export default AllPosts
