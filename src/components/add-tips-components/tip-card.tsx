import Box from "@/components/global/box"
import { Tip } from "@/api/tips/tip.types"
import { formatDate } from "@/utils/date-fns"
import TipActionButtons from "./tip-action-buttons"

type Props = {
  tip: Tip
}

const TipCard = ({ tip }: Props) => {
  const newDate = formatDate(tip.createdAt.split("T")[0])

  return (
    <Box className="relative h-[250px] border rounded-lg p-4 w-full flex flex-col gap-4">
      <img
        src={tip.image}
        alt={tip.title}
        className="w-full h-[15vh] rounded-lg object-contain"
      />
      <div className="flex flex-col justify-between h-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col w-full gap-2">
            <h2 className="font-bold">{tip.title}</h2>

            <div className="flex text-xs items-center justify-between w-full">
              <h5>#Dicas</h5>
              <h5 className="italic">{newDate}</h5>
            </div>
          </div>
        </div>

        <div className="w-full border-t pt-3 flex justify-end">
          <TipActionButtons tip={tip} />
        </div>
      </div>
    </Box>
  )
}

export default TipCard
