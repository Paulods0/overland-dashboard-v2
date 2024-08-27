import Box from "../global/box"
import Modal from "../global/modal"
import Button from "../ui/button/button"
import { Select } from "../ui/select-field"
import AlertModal from "../global/alert-modal"
import { Edit, Save, Trash } from "lucide-react"

const ClassifiedPostCard = () => {
  return (
    <Box className="space-y-4">
      <img
        src="/bg.jpg"
        className="h-40 object-cover w-full rounded-lg"
        alt=""
      />

      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">Título</h1>
          <h4 className="italic text-xs">21 de julho 2024</h4>
        </div>

        <div className="flex items-center justify-end gap-2 ">
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
            title="Atualizar o estado"
            trigger={<Button icon={Edit} />}
            actionBtn={
              <Button
                className="bg-indigo-700 text-white"
                icon={Save}
                label="Salvar alterações"
              />
            }
          >
            <Select.Container>
              <Select.Option label="Ativo" />
              <Select.Option label="Inativo" />
              <Select.Option label="Suspenso" />
            </Select.Container>
          </Modal>
        </div>
      </div>
    </Box>
  )
}

export default ClassifiedPostCard
