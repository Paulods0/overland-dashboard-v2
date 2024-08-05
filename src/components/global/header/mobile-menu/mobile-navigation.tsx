import { NavLink } from "react-router-dom"
import { HEADER_LINKS } from "../../../../constants/header-content"

type Props = {
  handleOpenMenu: () => void
}

const MobileNavigation = ({ handleOpenMenu }: Props) => {
  return (
    <ul className="w-full flex flex-col">
      {HEADER_LINKS.map((link, index) => (
        <li
          key={index}
          className={`text-xl h-16 flex items-center px-4 uppercase gap-2 ${
            index !== HEADER_LINKS.length - 1 &&
            "border-b border-b-neutral-600/60"
          }`}
        >
          <NavLink
            key={index}
            to={link.link}
            onClick={handleOpenMenu}
            className={({ isActive }) =>
              isActive
                ? "flex items-center flex-1 text-sm gap-2 text-indigo-700"
                : "flex items-center flex-1 text-sm gap-2 text-baseColor"
            }
          >
            {link.icon && <link.icon size={18} />} {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default MobileNavigation
