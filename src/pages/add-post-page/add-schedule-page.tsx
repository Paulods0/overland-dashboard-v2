import Box from "../../components/global/box"
import Container from "../../components/global/container"
import SchedulePostForm from "@/components/schedule-post-components/schedule-post-form"

const AddSchedulePage = () => {
  return (
    <main className="flex items-center justify-center h-[calc(100vh-150px)]">
      <Container className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl font-bold">Agenda AO</h1>
        <Box className="lg:w-[50vw] w-full mx-auto">
          <SchedulePostForm />
        </Box>
      </Container>
    </main>
  )
}

export default AddSchedulePage
