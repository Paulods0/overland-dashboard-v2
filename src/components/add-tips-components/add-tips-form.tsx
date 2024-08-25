import Box from "../global/box"
import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import { Input } from "../ui/input-field"
import { Select } from "../ui/select-field"
import useIsLoading from "@/hooks/useIsLoading"
import { uploadToFirebase } from "@/lib/firebase"
import { CreateTipDTO } from "@/api/tips/tip.types"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"
import { useCreateTip } from "@/lib/tanstack-query/tip/tip-mutations"
import { useGetUsers } from "@/lib/tanstack-query/users/user-queries"

type TipsProps = {
  content: string
}

const TIP_CATEGORY = "dicas"

const AddTipsForm = ({ content }: TipsProps) => {
  const { mutate } = useCreateTip()
  const { data: users } = useGetUsers("", "100")

  const { isLoading, toggleLoading } = useIsLoading()

  const [tip, setTip] = useState<CreateTipDTO>({
    tags: "",
    title: "",
    author: "",
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
    toggleLoading(true)
    try {
      if (!tip.title || !tip.author || !tip.image) {
        toast.error("Preencha todos os dados")
        toggleLoading(false)
        return
      }

      const downlodURL = await uploadToFirebase(tip.image as File, "tips")

      const data: CreateTipDTO = {
        content,
        tags: tip.tags,
        category: TIP_CATEGORY,
        title: tip.title,
        image: downlodURL,
        author: tip.author,
        author_notes: tip.author_notes,
      }

      mutate(data, {
        onSuccess: () => console.log(data),
        onError: (error) => console.error(error),
      })

      toggleLoading(false)
      toast.success("Dica adicionada com sucesso")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao publicar")
      toggleLoading(false)
    }
  }

  return (
    <Box className="flex flex-col">
      <form onSubmit={handleSubmitForm} className="space-y-4 flex flex-col">
        <FormButton
          type="submit"
          label="Publicar"
          disabled={isLoading}
          icon={isLoading ? Loading : Save}
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

        <Input.Root>
          <Input.Label title="Tags (opcional e separar por vírgula)" />
          <Input.Field
            type="text"
            value={tip.tags}
            onChange={(e) => {
              const tags = e.target.value.split(",")
              setTip({ ...tip, tags: tags })
            }}
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
          <Select.Label label="Autor*" />
          <Select.Container
            defaultValue={"none"}
            onChange={(e) => setTip({ ...tip, author: e.target.value })}
          >
            <Select.Option disabled value="none" label="Autor" />

            {users?.users.map((user, index) => (
              <Select.Option
                key={index}
                value={user._id}
                label={`${user.firstname} ${user.lastname}`}
              />
            ))}
          </Select.Container>
        </Select.Root>
      </form>
    </Box>
  )
}

export default AddTipsForm
