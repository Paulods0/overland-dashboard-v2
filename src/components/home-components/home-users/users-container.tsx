import UserImage from "./user-image"
import LoadingData from "@/components/global/loading-data"
import NothingToShow from "@/components/global/nothing-to-show"
import LinkButton from "@/components/ui/button/link-button"
import { useGetUsers } from "@/lib/tanstack-query/users/user-queries"
import { Eye, Plus } from "lucide-react"

const UsersContainer = () => {
  const { data, isLoading } = useGetUsers("", "6")

  if (isLoading) return <LoadingData />
  if (!data?.users) return <NothingToShow name="usuário" />

  return (
    <div className="relative lg:col-span-1 gap-4 rounded-2xl border h-full py-4 items-start w-full justify-center flex bg-blackAndLight flex-col">
      <div className="w-full flex items-center justify-between mb-4 px-6">
        Usuários
        <div className="flex items-center gap-2">
          <LinkButton
            icon={Plus}
            href="/usuário"
            className="rounded-full bg-white text-black"
          />
          <LinkButton
            icon={Eye}
            href="/usuários"
            className="rounded-full bg-white text-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-3 h-full gap-2 w-full place-items-center z-20">
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
