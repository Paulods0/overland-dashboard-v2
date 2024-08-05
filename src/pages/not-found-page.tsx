import { Link } from "react-router-dom"
import { Undo2 } from "lucide-react"
import Container from "@/components/global/container"

const NotFoundPage = () => {
  return (
    <main className="h-screen flex items-center justify-center w-full bg-black">
      <Container
        className="flex flex-col
       items-center gap-8"
      >
        <h1 className="text-5xl font-medium text-indigo-700">
          Página não encontrada
        </h1>
        <Link
          to="/"
          className="rounded-lg px-4 w-fit py-2 flex items-center bg-indigo-700 text-baseColor gap-2"
        >
          Voltar
          <Undo2 />
        </Link>
      </Container>
    </main>
  )
}

export default NotFoundPage
