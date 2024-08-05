import Container from "../container"
import { Link, useLocation } from "react-router-dom"
import ThemeButton from "../theme-button"
import NavigationBar from "./navigation-bar"
import MobileMenuButton from "./mobile-menu/mobile-menu-button"
import { useEffect, useState } from "react"

const Header = () => {
  const { pathname } = useLocation()
  const [headTitle, setHeadTitle] = useState("Dashboard")

  function changeHeadTitle() {
    const pathArr = pathname.split("/").filter((path) => path !== "")
    const path =
      pathArr.length > 0 ? decodeURIComponent(pathArr[pathArr.length - 1]) : ""
    const decodedPath = decodeURIComponent(path)

    if (pathArr.length > 0) {
      setHeadTitle(decodedPath)
    } else {
      setHeadTitle("Dashboard")
    }
  }

  useEffect(() => {
    changeHeadTitle()
  }, [pathname])

  return (
    <header className="sticky z-20 top-0 bg-baseColor w-full py-4 mb-8 border-b-[1px] border-b-neutral-400/40">
      <Container className="flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl md:text-4xl font-bold text-baseColor capitalize"
        >
          {headTitle}
        </Link>
        <NavigationBar />
        <div className="hidden lg:flex items-center gap-8">
          <ThemeButton />
          <img
            className="size-8 rounded-full object-cover"
            src="/logotipo-texto.png"
          />
        </div>
        <MobileMenuButton />
      </Container>
    </header>
  )
}

export default Header
