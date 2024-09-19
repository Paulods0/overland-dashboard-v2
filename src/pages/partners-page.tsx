import { Plus } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import Container from "@/components/global/container"
import Pagination from "@/components/global/pagination"
import LoadingData from "@/components/global/loading-data"
import LinkButton from "@/components/ui/button/link-button"
import NothingToShow from "@/components/global/nothing-to-show"
import PartnerCard from "@/components/partner-post-components/partner-card"
import { useGetPartners } from "@/lib/tanstack-query/partner/partner-queries"

const PartnerPage = () => {
  const [search, setSearch] = useSearchParams({ page: "1" })
  const currentPage = search.get("page") || "1"

  const { data, isLoading } = useGetPartners(currentPage)

  if (isLoading) return <LoadingData />
  if (!data?.partners) return <NothingToShow name="parceiro" />

  return (
    <Container className="flex flex-col gap-2 w-full py-4">
      <div className="w-full flex items-center justify-end">
        <LinkButton
          href="/novo/parceiro"
          label="Adicionar"
          icon={Plus}
          className="bg-white text-black"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:grid-cols-4 h-[60vh] overflow-y-auto">
        {data?.partners.map((partner, index) => (
          <PartnerCard partner={partner} key={index} />
        ))}
      </div>

      <Pagination
        pages={data!.pages}
        setSearch={setSearch}
        currentPage={Number(currentPage)}
      />
    </Container>
  )
}

export default PartnerPage
