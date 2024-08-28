import { useAuth } from "@/context/auth-context"

const UserLogged = () => {
  const { user } = useAuth()
  return (
    <div className="lg:flex flex-col items-center hidden gap-2">
      <img
        alt="usuário"
        className="size-10 object-cover rounded-full"
        src={user?.image ? user?.image : "/profile.jpg"}
      />
      <div className="flex items-center gap-1">
        <span>{user?.firstname}</span>
        <span>{user?.lastname}</span>
      </div>
    </div>
  )
}

export default UserLogged
