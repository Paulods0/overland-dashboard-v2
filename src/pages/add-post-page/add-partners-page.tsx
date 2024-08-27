import { useState } from "react"
import Container from "../../components/global/container"
import TextEditor from "../../components/global/tip-tap/tip-tap"
import AddPartnerForm from "../../components/add-partner-page/add-partner-form"

const AddPartnersPage = () => {
  const [content, setContent] = useState("")

  function handleContent(newContent: string) {
    setContent(newContent)
  }

  return (
    <main className="py-4">
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
          <TextEditor
            content={content}
            setContent={(newContent: string) => handleContent(newContent)}
          />
          <AddPartnerForm content={content} />
        </section>
      </Container>
    </main>
  )
}

export default AddPartnersPage
