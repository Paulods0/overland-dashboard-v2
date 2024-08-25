import { Suspense } from "react"
import { useTheme } from "./context/theme-context"
import { Navigate, Outlet } from "react-router-dom"
import Fallback from "./components/global/fallback"
import Header from "./components/global/header/header"
import useIsOnline from "./hooks/useIsOnline"

const ProtectedRoutes = () => {
  const { isOnline } = useIsOnline()
  const isLogged = localStorage.getItem("login")
  const { theme } = useTheme()

  if (!isOnline)
    return (
      <div className="text-white gap-4 bg-black h-screen w-full justify-center flex flex-col items-center">
        <img src="/logotipo-texto.png" alt="logotipo" className="w-full h-32 object-contain" />
        <h1 className="text-lg">🔴 Estás offline, por favor verifique a sua conexão 🔴</h1>
      </div>
    )

  if (!isLogged) {
    return <Navigate to="/login" />
  }

  return (
    <div className={`min-h-screen bg-baseColor text-baseColor ${theme}`}>
      <Suspense fallback={<Fallback />}>
        <Header />
        <Outlet />
      </Suspense>
    </div>
  )
}

export default ProtectedRoutes
