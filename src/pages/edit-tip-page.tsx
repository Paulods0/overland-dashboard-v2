import { useState } from "react"
import { useParams } from "react-router-dom"
import Container from "@/components/global/container"
import LoadingData from "@/components/global/loading-data"
import TextEditor from "../components/global/tip-tap/tip-tap"
import { useGetSingleTip } from "@/lib/tanstack-query/tip/tip-queries"
import EditTipForm from "@/components/add-tips-components/edit-tip-form"

const EditTipPage = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetSingleTip(id!)

  const [content, setContent] = useState("")

  if (isLoading) return <LoadingData />

  function handleContent(newContent: string) {
    setContent(newContent)
  }

  return (
    <Container className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 py-6">
      <TextEditor
        content={content}
        setContent={(newContent: string) => handleContent(newContent)}
      />
      <EditTipForm tip={data} content={content} />
    </Container>
  )
}

export default EditTipPage
