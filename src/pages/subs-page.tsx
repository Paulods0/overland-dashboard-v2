import { Plus } from "lucide-react"
import Modal from "@/components/global/modal"
import Button from "@/components/ui/button/button"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import SubsTable from "@/components/subs-components/subs-table"

import { useSearchParams } from "react-router-dom"
import LoadingData from "@/components/global/loading-data"
import NothingToShow from "@/components/global/nothing-to-show"
import { SubsForm } from "@/components/subs-components/subs-form"
import { useGetSubs } from "@/lib/tanstack-query/subs/subs-queries"

const SubsPage = () => {
  const [search, setSearch] = useSearchParams({ page: "1" })
  const currentPage = search.get("page") || "1"

  const { data, isLoading } = useGetSubs(currentPage)

  if (isLoading) return <LoadingData />

  return (
    <main>
      <Container>
        <section className="flex flex-col gap-4">
          <div className="w-full flex items-center justify-between">
            <h4 className="font-bold text-xl">
              Total de inscritos:
              <span className="text-lg font-extralight">
                {" "}
                {data?.subs.length}
              </span>
            </h4>
            <Modal
              title="Adiconar um inscrito"
              description="Adicione um novo inscrito para que ele possa receber notícias sobre o nosso site regularmente"
              trigger={
                <Button
                  icon={Plus}
                  label="Adicionar"
                  buttonType="base"
                  className="w-fit"
                />
              }
              cancelBtn={false}
            >
              <SubsForm />
            </Modal>
          </div>
          {data!.subs.length > 0 ? (
            <SubsTable subs={data!.subs} />
          ) : (
            <NothingToShow name="subscrito" />
          )}
          <Pagination
            pages={data!.pages}
            setSearch={setSearch}
            currentPage={Number(currentPage)}
          />
        </section>
      </Container>
    </main>
  )
}

export default SubsPage
