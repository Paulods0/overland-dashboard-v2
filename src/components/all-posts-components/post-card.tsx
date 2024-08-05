import Box from "../global/box"
import PostActionButtons from "./post-action-buttons"

const PostCard = () => {
  return (
    <Box className="relative border rounded-lg p-4 w-full flex flex-col gap-2">
      <img
        loading="lazy"
        src="/bg.jpg"
        alt="image do post"
        className="w-full h-full rounded-lg"
      />
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg line-clamp-1">Título do post</h1>
        <div className="w-full flex items-start justify-between">
          <p className="text-sm">categoria</p>
          <p className="italic text-sm">22 de Julho de 2024</p>
        </div>
        <PostActionButtons />
      </div>
    </Box>
  )
}

export default PostCard
