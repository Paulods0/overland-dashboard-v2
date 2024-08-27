import UserImage from "./user-image"
import LoadingData from "@/components/global/loading-data"
import NothingToShow from "@/components/global/nothing-to-show"
import { useGetUsers } from "@/lib/tanstack-query/users/user-queries"

const UsersContainer = () => {
  const { data, isLoading } = useGetUsers("", "6")

  if (isLoading) return <LoadingData />
  if (!data?.users) return <NothingToShow name="usuário" />

  return (
    <div className="relative col-span-1 gap-4 rounded-2xl border h-full py-4 items-start w-full justify-center flex bg-blackAndLight flex-col">
      <div className="w-full self-start flex items-center justify-end px-6"></div>

      <div className="grid grid-cols-2 lg:grid-cols-2 h-full gap-2 w-full place-items-center z-20">
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
