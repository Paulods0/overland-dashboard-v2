import { LogOut } from "lucide-react"
import Button from "@/components/ui/button/button"
import { Navigate } from "react-router-dom"

const LogoutButton = () => {
  async function handleLogOut() {
    localStorage.removeItem("user")
    return <Navigate to={"/login"} />
  }

  return (
    <Button
      icon={LogOut}
      buttonType="danger"
      onClick={handleLogOut}
      className="rounded-full"
    />
  )
}

export default LogoutButton
