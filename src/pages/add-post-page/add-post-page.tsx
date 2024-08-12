import { useState } from "react"
import Container from "../../components/global/container"
import TipTapEditor from "../../components/global/tip-tap/tip-tap"
import AddPostForm from "../../components/add-post-components/add-post-form"

const AddPostPage = () => {
  const [content, setContent] = useState("")

  function handleContent(newContent: string) {
    setContent(newContent)
  }

  return (
    <main className="min-h-screen pb-6">
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
          <TipTapEditor
            content={content}
            setContent={(newContent: string) => handleContent(newContent)}
          />
          <AddPostForm content={content} />
        </section>
        <pre className="text-sm text-zinc-400">{}</pre>
      </Container>
    </main>
  )
}

export default AddPostPage
