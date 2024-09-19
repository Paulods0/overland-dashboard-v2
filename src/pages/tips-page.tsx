import { Plus } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import LoadingData from "@/components/global/loading-data"
import LinkButton from "@/components/ui/button/link-button"
import TipCard from "@/components/add-tips-components/tip-card"
import NothingToShow from "@/components/global/nothing-to-show"
import { useGetTips } from "@/lib/tanstack-query/tip/tip-queries"

const TipsPage = () => {
  const [search, setSearch] = useSearchParams({ page: "1" })
  const currentPage = search.get("page") || "1"

  const { data, isLoading } = useGetTips(currentPage)

  if (isLoading) return <LoadingData />
  // if (!data?.posts) return <NothingToShow name="dica" />

  return (
    <Container className="flex flex-col gap-2 w-full py-4">
      <div className="w-full flex items-center justify-end">
        <LinkButton
          href="/novo/dica"
          label="Adicionar"
          icon={Plus}
          className="bg-white text-black"
        />
      </div>
      {data && data?.posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:grid-cols-4 h-[60vh] overflow-y-auto">
          {data?.posts.map((tip, index) => (
            <TipCard key={index} tip={tip} />
          ))}
        </div>
      ) : (
        <NothingToShow name="dica" />
      )}

      <Pagination currentPage={1} pages={data!.pages} setSearch={setSearch} />
    </Container>
  )
}

export default TipsPage
