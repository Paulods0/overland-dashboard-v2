import { Plus } from "lucide-react"
import Modal from "@/components/global/modal"
import { useSearchParams } from "react-router-dom"
import Button from "@/components/ui/button/button"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import LoadingData from "@/components/global/loading-data"
import NothingToShow from "@/components/global/nothing-to-show"
import UserForm from "@/components/users-page-component/user-form"
import { useGetUsers } from "@/lib/tanstack-query/users/user-queries"
import UsersTable from "@/components/users-page-component/users-table"

const UsersPage = () => {
  const [search, setSearch] = useSearchParams({ page: "1" })
  const currentPage = search.get("page") || "1"

  const { data, isLoading } = useGetUsers(currentPage)

  if (isLoading) return <LoadingData />

  return (
    <main>
      <Container>
        <section className="w-full flex flex-col gap-4 ">
          <div className="w-full flex justify-between">
            <h4 className="font-bold text-xl">
              Total:
              <span className="text-base font-extralight">
                {data?.users.length}
              </span>
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
          {!data?.users ? (
            <NothingToShow name="usuário" />
          ) : (
            <UsersTable users={data?.users} />
          )}
        </section>
        <Pagination
          currentPage={Number(currentPage)}
          pages={data!.pages}
          setSearch={setSearch}
        />
      </Container>
    </main>
  )
}

export default UsersPage
