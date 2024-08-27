import { useEffect, useState } from "react"
import { MenuIcon } from "lucide-react"
import MobileMenu from "./mobile-menu"
import { AnimatePresence } from "framer-motion"
import Button from "@/components/ui/button/button"
import { useTheme } from "../../../../context/theme-context"

const MobileMenuButton = () => {
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const bgAndTextColorBasedOnTheme =
    theme === "dark" ? "bg-white text-black" : "bg-black text-white"

  function handleOpenMenu() {
    setIsMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    document.body.style.overflowY = isMenuOpen ? "hidden" : "auto"

    return () => {
      document.body.style.overflowY = "auto"
    }
  }, [isMenuOpen])

  return (
    <>
      <Button
        icon={MenuIcon}
        onClick={handleOpenMenu}
        className={`${bgAndTextColorBasedOnTheme} rounded-full`}
      />
      <AnimatePresence mode="wait">
        {isMenuOpen && <MobileMenu handleOpenMenu={handleOpenMenu} />}
      </AnimatePresence>
    </>
  )
}

export default MobileMenuButton
