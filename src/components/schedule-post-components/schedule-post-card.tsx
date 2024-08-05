import Box from "../global/box"
import Button from "../ui/button/button"
import { Edit, Trash } from "lucide-react"
import AlertModal from "../global/alert-modal"
import EditSchedulePostForm from "./edit-schedule-post-form"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"

const SchedulePostCard = () => {
  return (
    <Box className="space-y-4">
      <img
        src="/bg.jpg"
        className="h-40 object-cover w-full rounded-lg"
        alt=""
      />

      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">Título</h1>
          <h4 className="italic text-xs">21 de julho 2024</h4>
        </div>

        <div className="flex items-center gap-2 ">
          <AlertModal
            title="Tens a certeza que pretendes eliminar este documento?"
            description="Esta acção não pode ser desfeita. Pretende continuar?"
            actionBtn={<Button className="bg-red-700" label="Eliminar" />}
            trigger={
              <Button
                icon={Trash}
                className="bg-red-700 text-white border-none"
              />
            }
          />

          <Dialog>
            <DialogTrigger asChild>
              <Button icon={Edit} />
            </DialogTrigger>
            <DialogContent>
              <EditSchedulePostForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Box>
  )
}

export default SchedulePostCard
