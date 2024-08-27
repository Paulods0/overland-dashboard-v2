import useIsOnline from "./hooks/useIsOnline"
import { useTheme } from "./context/theme-context"
import { Navigate, Outlet } from "react-router-dom"
import SideBar from "./components/global/header/sidebar"
import { Suspense } from "react"
import Fallback from "./components/global/fallback"

const ProtectedRoutes = () => {
  const { isOnline } = useIsOnline()
  const isLogged = localStorage.getItem("login")
  const { theme } = useTheme()

  if (!isOnline)
    return (
      <div className="text-white gap-4 bg-black h-screen w-full justify-center flex flex-col items-center">
        <img
          src="/logotipo-texto.png"
          alt="logotipo"
          className="w-full h-32 object-contain"
        />
        <h1 className="text-lg">
          🔴 Estás offline, por favor verifique a sua conexão 🔴
        </h1>
      </div>
    )

  if (!isLogged) {
    return <Navigate to="/login" />
  }

  return (
    <main
      className={`relative  bg-baseColor text-baseColor flex flex-col lg:flex-row ${theme}`}
    >
      <SideBar />
      <div className="w-full min-h-screen">
        <Suspense fallback={<Fallback />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  )
}

export default ProtectedRoutes
