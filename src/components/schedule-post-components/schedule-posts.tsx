import { SchedulePost } from "@/api/schedule/schedule.types"
import SchedulePostCard from "./schedule-post-card"

type SchedulesProps = {
  schedules: SchedulePost[]
}

const SchedulePosts = ({ schedules }: SchedulesProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-[60vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {schedules?.map((schedule, index) => (
          <SchedulePostCard schedule={schedule} key={index} />
        ))}
      </div>
    </div>
  )
}

export default SchedulePosts
