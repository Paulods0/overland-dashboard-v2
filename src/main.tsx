import React from "react"
import ReactDOM from "react-dom/client"
import { router } from "./routes/index.tsx"
import { ToastContainer } from "react-toastify"
import { RouterProvider } from "react-router-dom"
import ThemeContextProvider from "./context/theme-context.tsx"

import "./index.css"
import "react-toastify/dist/ReactToastify.css"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "./lib/tanstack-query/index.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          fallbackElement={
            <h1 className="text-xl text-blue-700">Carregando rotas...</h1>
          }
        />
      </QueryClientProvider>
      <ToastContainer
        closeButton
        hideProgressBar
        autoClose={2000}
        position="bottom-right"
      />
    </ThemeContextProvider>
  </React.StrictMode>
)
