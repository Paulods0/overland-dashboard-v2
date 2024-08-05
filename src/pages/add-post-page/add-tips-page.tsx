import Container from "../../components/global/container"
import TextEditor from "../../components/global/text-editor"
import AddTipsForm from "../../components/add-tips-components/add-tips-form"

const AddTipsPage = () => {
  return (
    <main>
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
          <TextEditor />
          <AddTipsForm />
        </section>
      </Container>
    </main>
  )
}

export default AddTipsPage
