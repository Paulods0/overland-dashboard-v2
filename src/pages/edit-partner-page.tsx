import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Container from "@/components/global/container"
import LoadingData from "@/components/global/loading-data"
import TextEditor from "../components/global/tip-tap/tip-tap"
import EditPartnerForm from "@/components/add-partner-page/edit-partner-form"
import { useGetSinglePartner } from "@/lib/tanstack-query/partner/partner-queries"

const EditPartnerPage = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetSinglePartner(id!)

  const [content, setContent] = useState("")

  function handleContent(newContent: string) {
    setContent(newContent)
  }

  useEffect(() => {
    if (data?.content && !isLoading) {
      setContent(data.content)
    }
  }, [data, isLoading])

  if (isLoading) return <LoadingData />

  return (
    <Container className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 py-6">
      <TextEditor
        content={content}
        setContent={(newContent: string) => handleContent(newContent)}
      />
      <EditPartnerForm partner={data} content={content} />
    </Container>
  )
}

export default EditPartnerPage
