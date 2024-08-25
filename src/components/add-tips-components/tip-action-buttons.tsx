import { toast } from "react-toastify"
import Button from "../ui/button/button"
import { Tip } from "@/api/tips/tip.types"
import { Edit3, Trash } from "lucide-react"
import AlertModal from "../global/alert-modal"
import useIsLoading from "@/hooks/useIsLoading"
import LinkButton from "../ui/button/link-button"
import { deleteFromFirebase } from "@/lib/firebase"
import { useDeleteTip } from "@/lib/tanstack-query/tip/tip-mutations"

type Props = {
  tip: Tip
}

const TipActionButtons = ({ tip }: Props) => {
  const { isLoading, toggleLoading } = useIsLoading()
  const { mutate } = useDeleteTip()

  async function handleDeleteTip() {
    toggleLoading(true)
    try {
      await deleteFromFirebase(tip.image, "tips")
      mutate(tip._id)
      toggleLoading(false)
    } catch (error) {
      toggleLoading(false)
      toast.error("Erro ao remover a dica, tente novamente")
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <LinkButton
        icon={Edit3}
        href={`/dica/${tip._id}`}
        className="w-fit bg-white text-black"
      />

      <AlertModal
        trigger={<Button icon={Trash} buttonType="danger" />}
        title="Tem a certeza que pretendes remover esta dica?"
        actionBtn={
          <Button
            buttonType="danger"
            onClick={handleDeleteTip}
            label={isLoading ? "Removendo..." : "Remover"}
          />
        }
      />
    </div>
  )
}

export default TipActionButtons
