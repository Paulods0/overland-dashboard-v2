import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Container from "@/components/global/container"
import LoadingData from "@/components/global/loading-data"
import TipTapEditor from "@/components/global/tip-tap/tip-tap"
import { useGetSinglePost } from "@/lib/tanstack-query/post/post-queries"
import EdittPostForm from "@/components/add-post-components/edit-post-form"

const EditPostPage = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetSinglePost(id!)
  const [content, setContent] = useState("")

  useEffect(() => {
    if (data?.content && !isLoading) {
      setContent(data.content)
    }
  }, [data, isLoading])

  if (isLoading) return <LoadingData />

  return (
    <main className="min-h-screen py-6">
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
          <TipTapEditor content={content!} setContent={setContent} />
          <EdittPostForm post={data} content={content!} />
        </section>
        <pre className="text-sm text-zinc-400">{}</pre>
      </Container>
    </main>
  )
}

export default EditPostPage
