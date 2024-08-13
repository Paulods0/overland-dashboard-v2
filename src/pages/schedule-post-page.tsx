import { Plus } from "lucide-react"
import Modal from "@/components/global/modal"
import Loading from "../components/global/loading"
import { useSearchParams } from "react-router-dom"
import Button from "@/components/ui/button/button"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import SchedulePosts from "@/components/schedule-post-components/schedule-posts"
import { useGetSchedules } from "@/lib/tanstack-query/schedule/schedule-queries"
import SchedulePostForm from "@/components/schedule-post-components/schedule-post-form"

const SchedulePostPage = () => {
  const [search, setSearch] = useSearchParams({ page: "1" })
  const page = search.get("page") ?? "1"

  const { data, isLoading } = useGetSchedules(page)

  if (isLoading) return <Loading />

  return (
    <main>
      <Container>
        <section className="w-full flex flex-col gap-4">
          <div className="flex items-center w-full justify-between ">
            <h1 className="md:text-2xl font-bold text-xl">Agenda AO</h1>
            <Modal
              title="Adicionar um Documento"
              description="Adicione um novo documento em PDF."
              trigger={
                <Button
                  icon={Plus}
                  label="Adicionar"
                  className="self-end w-fit"
                />
              }
            >
              <SchedulePostForm />
            </Modal>
          </div>

          <SchedulePosts schedules={data!.posts} />
          <Pagination pages={data!.pages} currentPage={Number(page)} setSearch={setSearch} />
        </section>
      </Container>
    </main>
  )
}

export default SchedulePostPage
