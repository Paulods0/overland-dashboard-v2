import { Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Button from "@/components/ui/button/button"
import { Input } from "@/components/ui/input-field/index"

const LoginPage = () => {
  const navigate = useNavigate()

  function Login() {
    localStorage.setItem("login", "isLogged")
    navigate("/")
  }

  return (
    <main className="h-screen flex items-center justify-center flex-col bg-neutral-950">
      <img
        src="/logotipo-texto.png"
        alt="logotipo"
        className="w-[14rem] h-[6rem] object-cover"
      />

      <div className="flex flex-col w-full md:w-[80vw] lg:w-[20vw] items-center justify-center px-6 lg:px-0">
        <h1 className="text-2xl text-white mt-2 mb-4">Faça o seu login</h1>
        <form className="flex flex-col text-baseColor gap-2 w-full">
          <Input.Root>
            <Input.Label title="Email" />
            <Input.Field type="email" />
          </Input.Root>

          <Input.Root className="relative">
            <Input.Label title="Palavra-passe" />
            <Input.Field type="password" icon={Eye} />
          </Input.Root>

          <Button
            type="submit"
            label="Entrar"
            onClick={Login}
            className="bg-white text-black mt-3 w-full"
          />
        </form>
      </div>
    </main>
  )
}

export default LoginPage
