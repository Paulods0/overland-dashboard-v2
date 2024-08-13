import { Plus } from "lucide-react"
import Modal from "@/components/global/modal"
import Button from "@/components/ui/button/button"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import StoreTable from "@/components/store-components/store-table"
import AddStoreForm, {
  productCategories,
} from "@/components/store-components/add-store-form"
import { useGetProducts } from "@/lib/tanstack-query/product/product-queries"
import { useSearchParams } from "react-router-dom"
import LoadingData from "@/components/global/loading-data"
import NothingToShow from "@/components/global/nothing-to-show"
import { Select } from "@/components/ui/select-field"
import { ChangeEvent } from "react"

const StorePage = () => {
  const [search, setSearch] = useSearchParams({ page: "1", category: "" })

  const currentPage = search.get("page") || "1"
  const category = search.get("category") || ""
  console.log(category)

  const { data, isLoading } = useGetProducts(currentPage, category)

  if (isLoading) return <LoadingData />

  function handleCategory(e: ChangeEvent<HTMLSelectElement>) {
    const category = e.target.value
    setSearch((state) => {
      state.set("category", category)
      return state
    })
  }

  return (
    <main>
      <Container>
        <section className="flex flex-col gap-2">
          <div className="w-full flex items-center justify-between">
            <h3 className="font-bold text-xl">
              Total de artigos:
              <span className="font-extralight text-lg">
                {" "}
                {data?.products.length}
              </span>
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm">Filtrar:</h4>
                <Select.Container defaultValue=" " onChange={handleCategory}>
                  <Select.Option label={"Todos"} value={""} />
                  {productCategories.map((product, index) => (
                    <Select.Option
                      key={index}
                      label={product.name}
                      value={product.value}
                    />
                  ))}
                </Select.Container>
              </div>
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
          </div>
          {data!.products.length ? (
            <StoreTable products={data!.products} />
          ) : (
            <NothingToShow name="artigo" />
          )}
          <Pagination
            currentPage={Number(currentPage)}
            pages={data!.pages}
            setSearch={setSearch}
          />
        </section>
      </Container>
    </main>
  )
}

export default StorePage
