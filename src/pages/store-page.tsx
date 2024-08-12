import { Plus } from "lucide-react"
import Modal from "@/components/global/modal"
import Button from "@/components/ui/button/button"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import StoreTable from "@/components/store-components/store-table"
import AddStoreForm from "@/components/store-components/add-store-form"

const StorePage = () => {
  return (
    <main>
      <Container>
        <section className="flex flex-col gap-2">
          <div className="w-full flex items-center justify-between">
            <h3 className="font-bold text-xl">
              Total de artigos:
              <span className="font-extralight text-lg"> 8</span>
            </h3>
            <Modal
              title="Novo Artigo"
              description="Adicione uma image, nome, preço e descrição ao artigo."
              trigger={
                <Button label="Adicionar" icon={Plus} buttonType="base" />
              }
            >
              <AddStoreForm />
            </Modal>
          </div>
          <StoreTable />
          <Pagination />
        </section>
      </Container>
    </main>
  )
}

export default StorePage
