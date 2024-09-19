import { Edit3, Trash } from "lucide-react"
import LinkButton from "../ui/button/link-button"
import Button from "@/components/ui/button/button"
import { Partner } from "@/api/partner/partner.type"
import AlertModal from "@/components/global/alert-modal"

type Props = {
  partner: Partner
}

const PartnerActionButtons = ({ partner }: Props) => {
  return (
    <div className="w-full flex items-center justify-end pt-2 border-t gap-2">
      <LinkButton
        icon={Edit3}
        href={`/parceiro/${partner._id}`}
        className="bg-white text-black"
      />
      <AlertModal
        trigger={
          <Button className="rounded-full" icon={Trash} buttonType="danger" />
        }
        actionBtn={<Button buttonType="danger" label="Remover" />}
        title="Tem a certeza que pretendes remover esta dica?"
      />
    </div>
  )
}

export default PartnerActionButtons
