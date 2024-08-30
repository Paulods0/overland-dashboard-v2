import Box from "../global/box"
import { Post } from "@/api/post/post.types"
import { formatDate } from "@/utils/date-fns"
import PostActionButtons from "./post-action-buttons"

type Props = {
  post: Post
}

const PostCard = ({ post }: Props) => {
  const formatedDate = formatDate(post.date)
  // const tags = post.tag.length > 0 && post.tag[0].trim()
  return (
    <Box className="relative border rounded-lg p-4 w-full flex flex-col gap-2">
      <img
        src={post.mainImage}
        alt="image do post"
        className="w-full h-[15vh] rounded-lg object-cover"
      />
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg line-clamp-1">{post.title}</h1>
        <div className="w-full flex items-end justify-between">
          <p className="text-xs">{post.category}</p>

          <div className="flex flex-col items-end">
            <p className="italic text-xs">{formatedDate}</p>
            <ul className="flex">
              {/* {tags && <p className="italic text-xs">#{tags}</p>} */}
            </ul>
          </div>
        </div>
        <PostActionButtons
          postId={post._id}
          author={post.author}
          mainImage={post.mainImage}
        />
      </div>
    </Box>
  )
}

export default PostCard
