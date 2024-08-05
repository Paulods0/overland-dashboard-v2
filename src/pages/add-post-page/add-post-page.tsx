import Container from "../../components/global/container"
import TextEditor from "../../components/global/text-editor"
import AddPostForm from "../../components/add-post-components/add-post-form"

const AddPostPage = () => {
  return (
    <main className="min-h-screen pb-6">
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
          <TextEditor />
          <AddPostForm />
        </section>
      </Container>
    </main>
  )
}

export default AddPostPage
