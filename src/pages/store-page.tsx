import { Plus } from "lucide-react"
import Modal from "@/components/global/modal"
import Button from "@/components/ui/button/button"
import { useSearchParams } from "react-router-dom"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import LoadingData from "@/components/global/loading-data"
import NothingToShow from "@/components/global/nothing-to-show"
import StoreTable from "@/components/store-components/store-table"
import StoreFilter from "@/components/store-components/store-filter"
import AddStoreForm from "@/components/store-components/add-store-form"
import { useGetProducts } from "@/lib/tanstack-query/product/product-queries"

const StorePage = () => {
  const [search, setSearch] = useSearchParams({
    page: "",
    limit: "",
    category: "",
  })

  const limit = search.get("limit") || ""
  const currentPage = search.get("page") || ""
  const category = search.get("category") || ""

  const { data, isLoading } = useGetProducts(currentPage, category, limit)

  if (isLoading) return <LoadingData />

  return (
    <Container className="w-full py-4 h-full flex flex-col justify-between items-center gap-2">
      <div className="w-full flex items-center justify-between">
        <StoreFilter setSearch={setSearch} searchValue={[limit, category]} />

        <Modal
          title="Novo Artigo"
          description="Adicione uma image, nome, preço e descrição ao artigo."
          trigger={
            <Button
              className="rounded-full"
              label="Adicionar"
              icon={Plus}
              buttonType="base"
            />
          }
        >
          <AddStoreForm />
        </Modal>
      </div>

      {data && data.products.length > 0 ? (
        <StoreTable products={data!.products} />
      ) : (
        <NothingToShow name="artigo" />
      )}
      <Pagination
        currentPage={Number(currentPage)}
        pages={data!.pages}
        setSearch={setSearch}
      />
    </Container>
  )
}

export default StorePage
