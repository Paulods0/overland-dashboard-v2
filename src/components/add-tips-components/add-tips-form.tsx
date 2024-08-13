import Box from "../global/box"
import { Save } from "lucide-react"
import { Input } from "../ui/input-field"
import { Select } from "../ui/select-field"
import { CreateTipDTO } from "@/api/tips/tip.types"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"
import { AUTHOR_ID } from "../add-post-components/add-post-form"
import { uploadToFirebase } from "@/lib/firebase"
import { useCreateTip } from "@/lib/tanstack-query/tip/tip-mutations"
import { toast } from "react-toastify"
import Loading from "../global/loading"

type TipsProps = {
  content: string
}

const AddTipsForm = ({ content }: TipsProps) => {
  const { mutate, isPending } = useCreateTip()

  const [tip, setTip] = useState<CreateTipDTO>({
    author: AUTHOR_ID,
    tags: "",
    date: "",
    title: "",
    image: null,
    content: "",
    category: "",
    author_notes: "",
  })

  const [imageToShow, setImageShow] = useState<string | null>(null)

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (e.target.files) {
      const image = e.target.files[0]
      const urlImage = URL.createObjectURL(image)
      setImageShow(urlImage)
      setTip({ ...tip, image: image })
    }
  }

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault()
    try {
      if (!tip.title || !tip.author || !tip.image) {
        alert("Preencha todos os dados")
        return
      }

      const downlodURL = await uploadToFirebase(tip.image as File, "tips")
      const tagsArr = typeof tip.tags === "string" ? tip.tags.split(",") : ""

      const data: CreateTipDTO = {
        content,
        tags: tagsArr,
        date: tip.date,
        category: "tip",
        title: tip.title,
        image: downlodURL,
        author: tip.author,
        author_notes: tip.author_notes,
      }
      mutate(data, {
        onSuccess: () => console.log(data),
        onError: (error) => console.error(error),
      })

      toast.success("Publicação feita com sucesso")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao publicar")
    }
  }

  return (
    <Box className="flex flex-col">
      <form onSubmit={handleSubmitForm} className="space-y-4 flex flex-col">
        <FormButton
          type="submit"
          label="Publicar"
          disabled={isPending}
          icon={isPending ? Loading : Save}
          className="w-full bg-indigo-700 text-white border-none self-end"
        />
        <Input.Root>
          <Input.Label title="Título*" />
          <Input.Field
            type="text"
            value={tip.title}
            onChange={(e) => setTip({ ...tip, title: e.target.value })}
          />
        </Input.Root>

        {imageToShow && (
          <img
            src={imageToShow}
            alt={tip.title}
            className="size-14 object-contain"
          />
        )}

        <Input.Root>
          <Input.Label title="Imagem principal*" />
          <Input.Field type="file" accept="image/*" onChange={handleImage} />
        </Input.Root>

        <Input.Root className="w-full">
          <Input.Label title="Data de criação" />
          <Input.Field
            type="date"
            value={tip.date}
            onChange={(e) => setTip({ ...tip, date: e.target.value })}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label title="Tags (opcional e separar por vírgula)" />
          <Input.Field
            type="text"
            value={tip.tags}
            onChange={(e) => setTip({ ...tip, tags: e.target.value })}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label title="Notas do autor (opcional)" />
          <Input.TextArea
            className="h-20"
            value={tip.author_notes}
            onChange={(e) => setTip({ ...tip, author_notes: e.target.value })}
          />
        </Input.Root>

        <Select.Root>
          <Select.Label label="Autor" />
          <Select.Container
            defaultValue={tip.author}
            onChange={(e) => setTip({ ...tip, author: e.target.value })}
          >
            <Select.Option value="user-1" label="User 1" />
            <Select.Option value="user-" label="User 2" />
          </Select.Container>
        </Select.Root>
      </form>
    </Box>
  )
}

export default AddTipsForm
