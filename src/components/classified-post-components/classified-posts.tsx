import LoadingData from "../global/loading-data"
import NothingToShow from "../global/nothing-to-show"
import ClassifiedPostCard from "./classified-post-card"
import { useGetClassifieds } from "@/lib/tanstack-query/classified/classified-queries"

const ClassifiedPosts = () => {
  const { data, isLoading } = useGetClassifieds()

  if (isLoading) return <LoadingData />

  return (
    <>
      {data && data.posts.length > 0 ? (
        <div className="w-full h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {data.posts.map((post, index) => (
            <ClassifiedPostCard key={index} post={post} />
          ))}
        </div>
      ) : (
        <NothingToShow name="classificado" />
      )}
    </>
  )
}

export default ClassifiedPosts
