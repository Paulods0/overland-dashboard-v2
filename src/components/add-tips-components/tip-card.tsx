import Box from "@/components/global/box"
import { Edit3, Trash } from "lucide-react"
import { Tip } from "@/api/tips/tip.types"
import Modal from "@/components/global/modal"
import Button from "@/components/ui/button/button"
import AlertModal from "@/components/global/alert-modal"

type Props = {
  tip: Tip
}

const TipCard = ({ tip }: Props) => {
  return (
    <Box className="relative border rounded-lg h-fit p-4 w-full flex flex-col gap-2">
      <img
        src={tip.image}
        className="w-full h-[20vh] rounded-lg object-contain"
        alt={tip.title}
      />

      <div className="flex w-full items-end justify-between py-4">
        <div className="flex flex-col items-end w-full">
          <h1>{tip.title}</h1>
          <h4 className="text-xs italic">Dicas</h4>
        </div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center justify-end gap-2">
            <Modal
              trigger={<Button icon={Edit3} buttonType="base" />}
              title=""
              description=""
            >
              Algum formulário aqui.
            </Modal>
            <AlertModal
              trigger={<Button icon={Trash} buttonType="danger" />}
              actionBtn={<Button buttonType="danger" label="Remover" />}
              title="Tem a certeza que pretendes remover esta dica?"
            />
          </div>
          <h4 className="italic text-xs">19 de Junho de 2024</h4>
        </div>
      </div>
    </Box>
  )
}

export default TipCard
