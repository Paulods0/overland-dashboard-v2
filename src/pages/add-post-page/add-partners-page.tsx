import Container from "../../components/global/container"
import TextEditor from "../../components/global/text-editor"
import AddPartnerForm from "../../components/add-partner-page/add-partner-form"

const AddPartnersPage = () => {
  return (
    <main className="pb-6">
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
          <TextEditor />
          <AddPartnerForm />
        </section>
      </Container>
    </main>
  )
}

export default AddPartnersPage
