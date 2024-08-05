import { createContext, ReactNode, useContext, useState } from "react"

export type Theme = "light" | "dark"

type ThemeContextProvider = {
  children: ReactNode
}

type ThemeContextType = {
  changeTheme: () => void
  theme: Theme
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

const ThemeContextProvider = ({ children }: ThemeContextProvider) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const currTheme = localStorage.getItem("theme") as Theme
    return currTheme ? currTheme : "light"
  })

  function changeTheme() {
    const currTheme = theme === "dark" ? "light" : "dark"
    setTheme(currTheme)
    localStorage.setItem("theme", currTheme)
  }

  return (
    <ThemeContext.Provider value={{ changeTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("ThemeContext error")
  }
  return context
}
