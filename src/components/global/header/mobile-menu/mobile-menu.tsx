import { X } from "lucide-react"
import ThemeButton from "../../theme-button"
import Button from "../../../ui/button/button"
import MobileNavigation from "./mobile-navigation"

type Props = {
  handleOpenMenu: () => void
}

const MobileMenu = ({ handleOpenMenu }: Props) => {
  return (
    <>
      <div
        onClick={handleOpenMenu}
        className="fixed inset-0 w-full h-full bg-black/80"
      />

      <div className="fixed w-[85vw] h-screen top-0 border-l border-l-neutral-600/70 flex gap-4 flex-col py-4 right-0 transition-all duration-200 ease-in-out bg-baseColor">
        <Button
          icon={X}
          onClick={handleOpenMenu}
          className="bg-red-700 text-white w-fit border-none self-end mr-4"
        />
        <MobileNavigation handleOpenMenu={handleOpenMenu} />
        <footer className="w-full px-4 justify-end flex">
          <ThemeButton />
        </footer>
      </div>
    </>
  )
}

export default MobileMenu
