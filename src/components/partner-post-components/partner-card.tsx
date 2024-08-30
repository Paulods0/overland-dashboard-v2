import Box from "@/components/global/box"
import { Edit3, Trash } from "lucide-react"
import LinkButton from "../ui/button/link-button"
import Button from "@/components/ui/button/button"
import { Partner } from "@/api/partner/partner.type"
import AlertModal from "@/components/global/alert-modal"

type Props = {
  partner: Partner
}

const PartnerCard = ({ partner }: Props) => {
  return (
    <Box className="flex flex-col gap-4 h-fit divide-y">
      <img
        src={partner.image}
        className="object-contain w-full h-[25vh]"
        alt={partner.title}
      />
      <div className="flex w-full items-end justify-between py-3">
        <div className="flex flex-col w-full">
          <h1>{partner.title}</h1>
          <h4 className="text-xs italic font-bold mt-2">#Parceiros</h4>
        </div>

        <div className="flex flex-col items-end w-full">
          <h4 className="italic text-xs">{partner.date}</h4>
          <div className="flex items-center gap-2">
            <LinkButton
              icon={Edit3}
              href={`/parceiro/${partner._id}`}
              className="bg-white text-black"
            />
            <AlertModal
              trigger={<Button icon={Trash} buttonType="danger" />}
              actionBtn={<Button buttonType="danger" label="Remover" />}
              title="Tem a certeza que pretendes remover esta dica?"
            />
          </div>
        </div>
      </div>
    </Box>
  )
}

export default PartnerCard
