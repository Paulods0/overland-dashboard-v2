import { Save } from "lucide-react"
import Box from "../../components/global/box"
import Container from "../../components/global/container"
import { Input } from "../../components/ui/input-field"
import FormButton from "../../components/ui/input-field/form-button"

const AddSchedulePage = () => {
  return (
    <main className="flex items-center justify-center h-[calc(100vh-150px)]">
      <Container className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl font-bold">Agenda AO</h1>
        <Box className="lg:w-[50vw] w-full mx-auto">
          <form className="w-full space-y-4 flex flex-col">
            <Input.Root>
              <Input.Label title="Título*" />
              <Input.Field type="text" />
            </Input.Root>

            <Input.Root>
              <Input.Label title="Ficheiro PDF*" />
              <Input.Field type="file" accept=".pdf" />
            </Input.Root>

            <FormButton type="submit" label="Salvar" icon={Save} className="self-end bg-indigo-700 text-white"/>
          </form>
        </Box>
      </Container>
    </main>
  )
}

export default AddSchedulePage
