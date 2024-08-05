import { Menu } from "lucide-react"
import { useState } from "react"
import MobileMenu from "./mobile-menu"
import { useTheme } from "../../../../context/theme-context"

const MobileMenuButton = () => {
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const bgAndTextColorBasedOnTheme =
    theme === "dark" ? "bg-white text-black" : "bg-black text-white"

  function handleOpenMenu() {
    setIsMenuOpen((prev) => !prev)
  }

  isMenuOpen
    ? (document.body.style.overflowY = "hidden")
    : (document.body.style.overflowY = "auto")

  return (
    <>
      <button
        onClick={handleOpenMenu}
        className={`${bgAndTextColorBasedOnTheme} size-10 lg:hidden rounded-lg flex items-center justify-center`}
      >
        <Menu />
      </button>
      {isMenuOpen && <MobileMenu handleOpenMenu={handleOpenMenu} />}
    </>
  )
}

export default MobileMenuButton
