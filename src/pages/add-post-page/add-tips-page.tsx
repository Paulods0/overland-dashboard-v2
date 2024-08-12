import { useState } from "react"
import Container from "../../components/global/container"
import TextEditor from "../../components/global/tip-tap/tip-tap"
import AddTipsForm from "../../components/add-tips-components/add-tips-form"

const AddTipsPage = () => {
  const [content, setContent] = useState("")

  function handleContent(newContent: string) {
    setContent(newContent)
  }

  return (
    <main>
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
          <TextEditor
            content={content}
            setContent={(newContent: string) => handleContent(newContent)}
          />
          <AddTipsForm content={content} />
        </section>
      </Container>
    </main>
  )
}

export default AddTipsPage
