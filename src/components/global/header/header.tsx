import Container from "../container"
import ThemeButton from "../theme-button"
import { useEffect, useState } from "react"
import NavigationBar from "./navigation-bar"
import { Link, useLocation } from "react-router-dom"
import MobileMenuButton from "./mobile-menu/mobile-menu-button"

const Header = () => {
  const { pathname } = useLocation()
  const [headTitle, setHeadTitle] = useState("Dashboard")

  function changeHeadTitle() {
    const pathArr = pathname.split("/").filter((path) => path !== "")
    const path =
      pathArr.length > 0 ? decodeURIComponent(pathArr[pathArr.length - 1]) : ""
    const decodedPath = decodeURIComponent(path)

    const decodeURLTitle = decodedPath.includes("-")
      ? decodedPath.replace("-", " ")
      : decodedPath

    if (pathArr.length > 0) {
      setHeadTitle(decodeURLTitle)
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
