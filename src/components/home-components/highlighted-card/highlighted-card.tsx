import LoadingData from "@/components/global/loading-data"
import NothingToShow from "@/components/global/nothing-to-show"
import { useGetHighlightedPost } from "@/lib/tanstack-query/post/post-queries"

const HighlightedCard = () => {
  const { data, isLoading } = useGetHighlightedPost()

  if (isLoading) return <LoadingData />
  if (!data) return <NothingToShow name="destaque" className="w-[300px] h-full border rounded-3xl"/>

  return (
    <div className="relative h-full rounded-3xl w-full lg:flex-1">
      <img
        alt={data.title}
        src={data.mainImage}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
      />
    </div>
  )
}

export default HighlightedCard
