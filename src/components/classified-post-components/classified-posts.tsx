import ClassifiedPostCard from "./classified-post-card"

const ClassifiedPosts = () => {
  return (
    <div className="w-full h-[60vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {Array.from({ length: 10 }).map((_, index) => (
        <ClassifiedPostCard key={index} />
      ))}
    </div>
  )
}

export default ClassifiedPosts
