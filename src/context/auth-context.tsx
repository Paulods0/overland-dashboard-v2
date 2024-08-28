import Cookies from "js-cookie"
import { isAxiosError } from "axios"
import { toast } from "react-toastify"
import axios from "@/config/axios.config"
import useIsLoading from "@/hooks/useIsLoading"
import React, { createContext, useContext, useState } from "react"

export type UserData = {
  email: string
  firstname: string
  lastname: string
  image: string
  role: string
}

type AuthContextType = {
  userId: string | undefined
  user: UserData | undefined
  token: string | undefined
  isLoading: boolean
  logout: () => void
  login: (email: string, password: string) => Promise<void>
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be called within AuthContext")
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, toggleLoading } = useIsLoading()

  const [user, setUser] = useState<UserData | undefined>(() => {
    const userData = localStorage.getItem("userData")
    return userData ? JSON.parse(userData) : undefined
  })

  const [userId, setUserId] = useState<string | undefined>(() => {
    const userId = localStorage.getItem("userId")
    return userId ? JSON.parse(userId) : undefined
  })

  const [token, setToken] = useState(() => {
    const token = Cookies.get("token")
    return token ? token : undefined
  })

  const login = async (email: string, password: string) => {
    toggleLoading(true)
    try {
      const response = await axios.post(`/auth/login`, {
        email: email,
        password: password,
      })
      const authData = await response.data
      if (response.status === 200) {
        setUserId(authData.id)
        setToken(authData.token)
        setUser(authData.user)
        localStorage.setItem("userData", JSON.stringify(authData.user))
        localStorage.setItem("userId", JSON.stringify(authData.id))
        Cookies.set("token", authData.token, { expires: 7 })
        toggleLoading(false)
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          console.error("Erro no servidor: " + error.response.data.message)
          toast.error(error.response.data.message)
        } else {
          console.error("Erro na rede ou outro: " + error.message)
          toast.error("Erro de conexão, tente mais tarde")
        }
      } else {
        console.error("Erro desconhecido: " + error)
        toast.error("Ocorreu um erro. Tente novamente mais tarde.")
      }
    } finally {
      toggleLoading(false)
    }
  }

  const logout = () => {
    toggleLoading(false)
    setToken(undefined)
    setUserId(undefined)
    setUser(undefined)
    localStorage.removeItem("userId")
    localStorage.removeItem("userData")
    Cookies.remove("token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        token,
        login,
        logout,
        setUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
