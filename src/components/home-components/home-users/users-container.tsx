import UserImage from "./user-image"
import LinkButton from "../../ui/button/link-button"
import { ArrowRight } from "lucide-react"

const UsersContainer = () => {
  return (
    <div className="gap-4 rounded-lg h-full py-4 items-start w-full justify-center flex flex-col bg-neutral-900">
      <div className="w-full self-start flex items-center justify-end px-6">
        <LinkButton
          href="/usuários"
          icon={ArrowRight}
          label="Ver usuários"
          className="lg:text-base text-white self-end underline border-none"
        />
      </div>

      <div className="grid grid-cols-3 h-full gap-2 w-full place-items-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <UserImage key={i} />
        ))}
      </div>
    </div>
  )
}

export default UsersContainer
