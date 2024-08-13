import { Post } from "@/api/post/post.types"

type Props = {
  post: Post
}

const RecentPost = ({ post }: Props) => {
  return (
    <li className="w-full p-2 border border-neutral-400/50 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={post.mainImage}
          className="size-20 rounded-lg bg-zinc-400 object-cover"
          alt="imagem do post"
        />
        <div className="flex flex-col px-2 w-full lg:w-[30vw]">
          <h1 className="text-lg font-bold line-clamp-1">{post.title}</h1>
          <p className="line-clamp-2" dangerouslySetInnerHTML={{__html: post.content}}/>
        </div>
      </div>

      <div className="hidden lg:flex flex-col justify-between items-end gap-2 h-full p-1">
        <img
          src="/profile.jpg"
          alt=""
          className="size-8 rounded-full object-cover"
        />
        <p>{post.date}</p>
      </div>
    </li>
  )
}

export default RecentPost
