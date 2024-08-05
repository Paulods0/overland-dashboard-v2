import React from "react"
import ReactDOM from "react-dom/client"
import { router } from "./routes/index.tsx"
import { RouterProvider } from "react-router-dom"

import "./index.css"
import ThemeContextProvider from "./context/theme-context.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <RouterProvider
        router={router}
        fallbackElement={
          <h1 className="text-xl text-blue-700">Carregando rotas...</h1>
        }
      />
    </ThemeContextProvider>
  </React.StrictMode>
)
