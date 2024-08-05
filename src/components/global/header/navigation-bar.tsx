import { NavLink } from "react-router-dom"
import { HEADER_LINKS } from "../../../constants/header-content"

const NavigationBar = () => {
  return (
    <nav className="hidden lg:inline-block">
      <ul className="flex items-center gap-5">
        {HEADER_LINKS.map((link, index) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-700 text-lg font-medium"
                  : "text-zinc-500 text-lg hover:text-zinc-400 transition-all duration-200 font-medium"
              }
              to={link.link}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavigationBar
