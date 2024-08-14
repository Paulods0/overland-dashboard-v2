import UserImage from "./user-image"
import LinkButton from "../../ui/button/link-button"
import { ArrowRight } from "lucide-react"
import { useGetUsers } from "@/lib/tanstack-query/users/user-queries"
import LoadingData from "@/components/global/loading-data"
import NothingToShow from "@/components/global/nothing-to-show"

const UsersContainer = () => {
  const { data, isLoading } = useGetUsers("", "6")

  if (isLoading) return <LoadingData />
  if (!data?.users) return <NothingToShow name="usuário" />

  return (
    <div className="relative gap-4 rounded-lg h-full py-4 items-start w-full justify-center flex border flex-col bg-black/50 backdrop-blur-md">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full z-10 size-32 md:size-44 blur-2xl bg-gradient-to-tr from-red-600 to-indigo-600" />

      <div className="w-full self-start flex items-center justify-end px-6">
        <LinkButton
          href="/usuários"
          icon={ArrowRight}
          label="Ver usuários"
          className="lg:text-base text-white self-end underline border-none"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 h-full gap-2 w-full place-items-center z-20">
        {data?.users.map((user, index) => (
          <UserImage
            key={index}
            image={user.image}
            name={`${user?.firstname} ${user.lastname}`}
          />
        ))}
      </div>
    </div>
  )
}

export default UsersContainer
