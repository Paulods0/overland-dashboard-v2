import { NavLink } from "react-router-dom"
import { HEADER_LINKS } from "../../../constants/header-content"

const NavigationBar = () => {
  return (
    <nav className="hidden w-full items-center justify-center lg:flex">
      <ul className="flex h-full flex-col gap-2 w-full">
        {HEADER_LINKS.map((link, index) => (
          <li key={index} className="flex h-full w-full text-zinc-400  text-sm">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "w-full bg-lightBlack py-2 rounded-full "
                  : "w-full py-2 rounded-full hover:bg-lightBlack transition-all duration-200"
              }
              to={link.link}
            >
              <div className="flex px-4 items-center gap-2">
                <link.icon size={16} />
                {link.label}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavigationBar
