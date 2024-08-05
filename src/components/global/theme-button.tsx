import { Sun } from "lucide-react"
import { useTheme } from "../../context/theme-context"
import Button from "../ui/button/button"

const ThemeButton = () => {
  const { changeTheme, theme } = useTheme()
  const bgAndTextColorBasedOnTheme =
    theme === "dark" ? "bg-white text-black" : "bg-black text-white"
  return (
    <Button
      icon={Sun}
      onClick={() => changeTheme()}
      className={`${bgAndTextColorBasedOnTheme} w-fit`}
    />
  )
}

export default ThemeButton
