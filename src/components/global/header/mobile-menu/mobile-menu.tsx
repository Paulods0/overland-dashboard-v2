import { X } from "lucide-react"
import Button from "../../../ui/button/button"
import MobileNavigation from "./mobile-navigation"

import { motion } from "framer-motion"

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

      <motion.div
        initial={{ width: "0" }}
        animate={{ width: "85vw" }}
        exit={{ width: "0" }}
        transition={{ ease: "easeInOut" }}
        className="fixed h-screen top-0 border-l border-l-neutral-600/70 flex gap-4 flex-col py-4 right-0 bg-baseColor"
      >
        <Button
          icon={X}
          onClick={handleOpenMenu}
          className="bg-red-700 text-white w-fit border-none self-end mr-4"
        />
        <MobileNavigation handleOpenMenu={handleOpenMenu} />
      </motion.div>
    </>
  )
}

export default MobileMenu
