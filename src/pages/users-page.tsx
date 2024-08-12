import { Plus } from "lucide-react"
import Modal from "@/components/global/modal"
import Button from "@/components/ui/button/button"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import UserForm from "@/components/users-page-component/user-form"
import UsersTable from "@/components/users-page-component/users-table"

const UsersPage = () => {
  return (
    <main>
      <Container>
        <section className="w-full flex flex-col gap-4 ">
          <div className="w-full flex justify-between">
            <h4 className="font-bold text-xl">
              Total:
              <span className="text-base font-extralight"> 5</span>
            </h4>
            <Modal
              title="Adicionar usuário"
              description="Adicione um novo usuário para exercer funções dentro da plataforma de gerenciamento do site Overland Angola."
              trigger={
                <Button
                  buttonType="base"
                  className="w-fit"
                  icon={Plus}
                  label="Adicionar"
                />
              }
            >
              <UserForm />
            </Modal>
          </div>
          <UsersTable />
        </section>
        <Pagination />
      </Container>
    </main>
  )
}

export default UsersPage
