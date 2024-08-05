import { Suspense } from "react"
import { useTheme } from "./context/theme-context"
import { Navigate, Outlet } from "react-router-dom"
import Fallback from "./components/global/fallback"
import Header from "./components/global/header/header"

const ProtectedRoutes = () => {
  const isLogged = localStorage.getItem("login")
  const { theme } = useTheme()

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
