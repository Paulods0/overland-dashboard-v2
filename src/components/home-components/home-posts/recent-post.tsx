import { Link } from "react-router-dom"
import { Post } from "@/api/post/post.types"
import { formatDate } from "@/utils/date-fns"

type Props = {
  post: Post
}

const RecentPost = ({ post }: Props) => {
  const postDate = formatDate(post.date)

  return (
    <li>
      <Link
        to={`/post/${post._id}`}
        className="w-full overflow-hidden h-[15vh] p-2 border border-neutral-400/50 rounded-lg flex items-center justify-between"
      >
        <div className="flex h-full items-start">
          <img
            src={post.mainImage}
            className="w-36 h-full rounded-lg bg-zinc-400 object-cover"
            alt="imagem do post"
          />
          <div className="flex flex-col gap-2 px-2 w-full lg:w-[30vw]">
            <div className="flex flex-col items-start">
              <h1 className="text-lg font-bold line-clamp-1">{post.title}</h1>
            </div>

            <ul className="flex">
              {post.tag.map((tag, index) => (
                <li className="text-xs italic" key={index}>
                  #{tag.trim()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden lg:flex flex-col justify-between items-end gap-2 h-full p-1">
          <img
            alt={post.author.firstname}
            className="size-8 rounded-full object-cover"
            src={post.author.image ? post.author.image : "/icons/user.png"}
          />
          <div className="flex flex-col items-end">
            <p className="italic text-sm">{post.category}</p>
            <p className="italic text-sm">{postDate}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RecentPost
