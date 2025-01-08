import Container from "@/components/global/container"
import LoadingData from "@/components/global/loading-data"
import NothingToShow from "@/components/global/nothing-to-show"
import PartnerImageCard from "@/components/partners-images/partner-image-card"
import AddSponsorImageButton from "@/components/partners-images/add-sponsor-image-button"
import { useGetSponsorsImages } from "@/lib/tanstack-query/partner-image/partner-image-query"

const SponsorsImagesPage = () => {
  const { data, isLoading } = useGetSponsorsImages()

  if (isLoading) return <LoadingData />

  return (
    <Container className="py-8 flex flex-col items-center gap-10 min-h-screen">
      {/** TOP SECTION */}

      <section className="w-full flex items-center justify-end">
        <AddSponsorImageButton />
      </section>
      {/** BOTTOM SECTION */}

      <section className="grow w-full">
        {data && data?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {data.map((item, index) => (
              <PartnerImageCard key={index} data={item} />
            ))}
          </div>
        ) : (
          <NothingToShow name="patrocinador" />
        )}
      </section>
    </Container>
  )
}

export default SponsorsImagesPage
