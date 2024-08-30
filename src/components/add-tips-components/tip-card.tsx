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
    <Box className="relative h-[40vh] border rounded-lg divide-y-2 p-4 w-full flex flex-col gap-2">
      <img
        src={tip.image}
        alt={tip.title}
        className="w-full h-[20vh] rounded-lg object-contain"
      />

      <div className="flex w-full items-end justify-between py-4">
        <div className="flex flex-col items-start w-full">
          <h1>{tip.title}</h1>
          <h4 className="italic text-xs">{newDate}</h4>
          <h4 className="italic text-xs font-bold mt-2">#Dicas</h4>
        </div>

        <div className="flex flex-col items-end w-full gap-2">
          <TipActionButtons tip={tip} />
        </div>
      </div>
    </Box>
  )
}

export default TipCard
