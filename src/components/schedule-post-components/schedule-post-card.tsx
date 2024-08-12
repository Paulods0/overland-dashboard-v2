import Box from "../global/box"
import Modal from "../global/modal"
import Button from "../ui/button/button"
import { Edit, Trash } from "lucide-react"
import AlertModal from "../global/alert-modal"
import EditSchedulePostForm from "./edit-schedule-post-form"
import { SchedulePost } from "@/api/schedule/schedule.types"

type Props = {
  schedule: SchedulePost
}

const SchedulePostCard = ({ schedule }: Props) => {
  return (
    <Box className="space-y-4 h-[40vh]">
      <img
        src="/icons/agenda-ao.png"
        className="h-[20vh] object-contain w-full rounded-lg"
        alt={schedule.title}
      />

      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">{schedule.title}</h1>
          <h4 className="italic text-xs">21 de julho 2024</h4>
        </div>

        <div className="flex items-center gap-2 ">
          <AlertModal
            title="Tens a certeza que pretendes eliminar este documento?"
            actionBtn={<Button className="bg-red-700" label="Eliminar" />}
            trigger={
              <Button
                icon={Trash}
                className="bg-red-700 text-white border-none"
              />
            }
          />

          <Modal
            title="Atualizar os dados"
            description="Atualize os dados e corrige os erros"
            trigger={<Button icon={Edit} />}
          >
            <EditSchedulePostForm />
          </Modal>
        </div>
      </div>
    </Box>
  )
}

export default SchedulePostCard
