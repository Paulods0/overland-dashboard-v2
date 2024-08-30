import { EyeIcon, Plus } from "lucide-react"
import RecentPostTable from "./recent-post-table"
import Loading from "@/components/global/loading"
import LinkButton from "../../ui/button/link-button"
import NothingToShow from "@/components/global/nothing-to-show"
import { useGetAllPosts } from "@/lib/tanstack-query/post/post-queries"

const RecentPosts = () => {
  const { data, isLoading } = useGetAllPosts("", "", "8")

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <Loading size={20} />
      </div>
    )
  }

  return (
    <div className="lg:col-span-2 lg:p-4  flex flex-col gap-4 border rounded-2xl bg-blackAndLight p-4">
      <div className="w-full lg:flex-row flex-col lg:gap-0 gap-6 flex  items-start lg:items-center justify-between">
        <h1 className="font-semibold lg:font-normal text-xl lg:text-base">
          Últimos posts
        </h1>
        <div className="flex flex-row items-end lg:items-center gap-2 w-full lg:w-fit justify-end lg:justify-normal">
          <LinkButton
            href="/novo"
            icon={Plus}
            className="bg-white text-black lg:w-full w-fit"
          />
          <LinkButton
            href="/posts"
            icon={EyeIcon}
            className="bg-white text-black lg:w-full w-fit"
          />
        </div>
      </div>

      <ul className="flex flex-col gap-2 h-[50vh] w-full overflow-auto lg:pr-2">
        {data && data?.posts.length > 0 ? (
          <RecentPostTable posts={data.posts} />
        ) : (
          <NothingToShow name="post" />
        )}
      </ul>
    </div>
  )
}

export default RecentPosts
