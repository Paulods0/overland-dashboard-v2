import LoadingData from "@/components/global/loading-data"
import NothingToShow from "@/components/global/nothing-to-show"
import { useGetHighlightedPost } from "@/lib/tanstack-query/post/post-queries"

const HighlightedCard = () => {
  const { data, isLoading } = useGetHighlightedPost()

  if (isLoading) return <LoadingData />
  if (!data) return <NothingToShow name="destaque" />

  return (
    <div className="relative h-56 rounded-lg w-full lg:flex-1 bg-black/60">
      <img
        alt={data.title}
        src={data.mainImage}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
      />
    </div>
  )
}

export default HighlightedCard
