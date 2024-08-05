import { Plus } from "lucide-react"
import Button from "@/components/ui/button/button"
import Container from "@/components/global/container"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import SchedulePosts from "@/components/schedule-post-components/schedule-posts"
import SchedulePostForm from "@/components/schedule-post-components/schedule-post-form"
import Pagination from "@/components/global/pagination"

const SchedulePostPage = () => {
  return (
    <main>
      <Container>
        <section className="w-full flex flex-col gap-4">
          <div className="flex items-center w-full justify-between ">
            <h1 className="md:text-2xl font-bold text-xl">Agenda AO</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button icon={Plus} label="Adicionar" className="self-end w-fit" />
              </DialogTrigger>
              <DialogContent>
                <SchedulePostForm />
              </DialogContent>
            </Dialog>
          </div>

          <SchedulePosts />
          <Pagination />
        </section>
      </Container>
    </main>
  )
}

export default SchedulePostPage
