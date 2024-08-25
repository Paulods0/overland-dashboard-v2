import { Plus } from "lucide-react"
import RecentPost from "./recent-post"
import Loading from "@/components/global/loading"
import LinkButton from "../../ui/button/link-button"
import NothingToShow from "@/components/global/nothing-to-show"
import { useGetAllPosts } from "@/lib/tanstack-query/post/post-queries"

const RecentPostsContainer = () => {
  const { data, isLoading } = useGetAllPosts("", "", "4")

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <Loading size={20} />
      </div>
    )
  }

  return (
    <div className="lg:col-span-2 lg:p-4 flex flex-col gap-4">
      <div className="w-full lg:flex-row flex-col lg:gap-0 gap-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Últimos posts</h1>
        <div className="flex items-center gap-2 w-full lg:w-fit justify-between lg:justify-normal">
          <LinkButton
            href="/novo"
            label="Adicionar"
            icon={Plus}
            className="bg-white text-black"
          />
          <LinkButton
            href="/posts"
            label="Ver todos"
            className="border-none underline"
          />
        </div>
      </div>

      <ul className="flex flex-col gap-2 h-[35vh] w-full overflow-auto lg:pr-2">
        {!data?.posts ? (
          <NothingToShow name="post" />
        ) : (
          data?.posts.map((post, index) => (
            <RecentPost key={index} post={post} />
          ))
        )}
      </ul>
    </div>
  )
}

export default RecentPostsContainer
