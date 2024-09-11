import Logo from "../logo"
import ThemeButton from "../theme-button"
// import LogoutButton from "./logout-button"
import NavigationBar from "./navigation-bar"
import MobileMenuButton from "./mobile-menu/mobile-menu-button"
import UserLogged from "./user-logged"

const SideBar = () => {
  return (
    <aside className="flex z-40 bg-baseColor sticky top-0 w-full lg:h-screen h-fit lg:w-[15vw] border-b border-b-lightBlack lg:border-b-0 justify-center py-4 lg:border-r lg:border-r-neutral-600/40 px-4">
      <div className="flex flex-row lg:flex-col w-full justify-between items-center lg:h-full">
        <div className="flex flex-row justify-between lg:justify-normal lg:flex-col items-center gap-4 w-full">
          <Logo />
          <UserLogged />
          <NavigationBar />
          <div className="lg:hidden flex items-center gap-4">
            <ThemeButton />
            <MobileMenuButton />
          </div>
        </div>

        <div className="hidden lg:flex">
          <ThemeButton />
          {/* <LogoutButton /> */}
        </div>
      </div>
    </aside>
  )
}

export default SideBar
