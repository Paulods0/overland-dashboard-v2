import { Plus, Save } from "lucide-react"
import Modal from "@/components/global/modal"
import Button from "@/components/ui/button/button"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import SubsTable from "@/components/subs-components/subs-table"

const SubsPage = () => {
  return (
    <main>
      <Container>
        <section className="flex flex-col gap-4">
          <div className="w-full flex items-center justify-between">
            <h4 className="font-bold text-xl">
              Total de inscritos:
              <span className="text-lg font-extralight"> 8</span>
            </h4>
            <Modal
              trigger={
                <Button icon={Plus} label="Adicionar" buttonType="base" className="" />
              }
              actionBtn={
                <Button
                  icon={Save}
                  label="Salvar"
                  className="border-none bg-indigo-700 text-white"
                />
              }
            >
              Algum formulário aqui
            </Modal>
          </div>

          <SubsTable />
          <Pagination />
        </section>
      </Container>
    </main>
  )
}

export default SubsPage
