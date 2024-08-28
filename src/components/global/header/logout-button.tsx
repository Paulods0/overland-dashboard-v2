import { LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import Button from "@/components/ui/button/button"
import { useNavigate } from "react-router-dom"

const LogoutButton = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <Button
      icon={LogOut}
      onClick={handleLogout}
      buttonType="danger"
      className="rounded-full"
    />
  )
}

export default LogoutButton
