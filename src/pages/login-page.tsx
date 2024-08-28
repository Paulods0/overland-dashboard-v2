import Cookies from "js-cookie"
import { Navigate, useNavigate } from "react-router-dom"
import Button from "@/components/ui/button/button"
import Fallback from "@/components/global/fallback"
import { FormEvent, Suspense, useState } from "react"
import { useAuthContext } from "@/context/auth-context"
import { Input } from "@/components/ui/input-field/index"

type LoginInCredentials = {
  email: string
  password: string
}

const LoginPage = () => {
  const { login, isLoading } = useAuthContext()
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState<LoginInCredentials>({
    email: "",
    password: "",
  })

  const token = Cookies.get("token")

  if (token) {
    return <Navigate to="/" />
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    await login(credentials.email, credentials.password)
    navigate("/login")
  }

  return (
    <Suspense fallback={<Fallback />}>
      <main className="h-screen flex items-center justify-center flex-col bg-baseColor text-baseColor">
        <img
          src="/logotipo-texto.png"
          alt="logotipo"
          className="w-[14rem] h-[6rem] object-cover"
        />

        <div className="flex flex-col w-full md:w-[80vw] lg:w-[20vw] items-center justify-center px-6 lg:px-0">
          <h1 className="text-2xl text-white mt-2 mb-4">Faça o seu login</h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col text-baseColor gap-2 w-full"
          >
            <Input.Root>
              <Input.Label title="Email" />
              <Input.Field
                type="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </Input.Root>

            <Input.Root className="relative">
              <Input.Label title="Palavra-passe" />
              <Input.Field
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </Input.Root>

            <Button
              type="submit"
              disabled={isLoading}
              label={isLoading ? "Entrando..." : "Entrar"}
              className="bg-indigo-600 text-white mt-3 w-full"
            />
          </form>
        </div>
      </main>
    </Suspense>
  )
}

export default LoginPage
