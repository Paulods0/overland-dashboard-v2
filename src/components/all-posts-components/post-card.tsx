import Box from "../global/box"
import PostActionButtons from "./post-action-buttons"
import { Post } from "@/api/post/post.types"

type Props = {
  post: Post
}

const PostCard = ({ post }: Props) => {
  return (
    <Box className="relative border rounded-lg p-4 w-full flex flex-col gap-2">
      <img
        src={post.mainImage}
        alt="image do post"
        className="w-full h-[20vh] rounded-lg object-contain"
      />
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg line-clamp-1">{post.title}</h1>
        <div className="w-full flex items-start justify-between">
          <p className="text-sm">{post.category}</p>
          <p className="italic text-sm">{post.date}</p>
        </div>
        <PostActionButtons postId={post._id} />
      </div>
    </Box>
  )
}

export default PostCard
