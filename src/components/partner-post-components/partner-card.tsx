import Box from "@/components/global/box"
import { Partner } from "@/api/partner/partner.type"
import PartnerActionButtons from "./partner-action-buttons"

type Props = {
  partner: Partner
}

const PartnerCard = ({ partner }: Props) => {
  return (
    <Box className="flex flex-col p-4 gap-4 h-[250px] justify-between">
      <img
        src={partner.image}
        className="object-contain w-full h-[15vh]"
        alt={partner.title}
      />

      <div className="flex flex-col w-full items-end justify-between gap-3">
        <div className="flex w-full flex-col gap-2">
          <h1>{partner.title}</h1>
          <h4 className="text-xs italic font-bold">#Parceiros</h4>
        </div>

        <PartnerActionButtons partner={partner} />
      </div>
    </Box>
  )
}

export default PartnerCard
