import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import { Select } from "@/components/ui/select-field"
import ClassifiedPosts from "@/components/classified-post-components/classified-posts"

const ClassifiedPostPage = () => {
  return (
    <main>
      <Container>
        <section className="w-full flex flex-col gap-4">
          <div className="flex items-center w-full justify-between ">
            <h1 className="md:text-2xl font-bold text-xl">Classificados</h1>
            <div className="flex items-center gap-2">
              <h4 className="font-bold">Filtrar:</h4>
              <Select.Container className="w-fit px-2">
                <Select.Option label="Ativo" />
                <Select.Option label="Inativo" />
                <Select.Option label="Para venda" />
                <Select.Option label="Para Comprar" />
              </Select.Container>
            </div>
          </div>

          <ClassifiedPosts />
          <Pagination />
        </section>
      </Container>
    </main>
  )
}

export default ClassifiedPostPage
