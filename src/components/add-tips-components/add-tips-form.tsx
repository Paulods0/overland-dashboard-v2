import Box from "../global/box"
import { Save } from "lucide-react"
import { Input } from "../ui/input-field"
import { Select } from "../ui/select-field"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"

type TipsProps = {
  content: string
}

const AddTipsForm = ({ content }: TipsProps) => {
  const [tags, setTags] = useState("")
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [authorNotes, setAuthorNotes] = useState("")
  const [image, setImage] = useState<string | null>(null)

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (e.target.files) {
      const image = e.target.files[0]
      const urlImage = URL.createObjectURL(image)
      setImage(urlImage)
    }
  }

  function handleSubmitForm(e: FormEvent) {
    e.preventDefault()

    if (!title || !author || !image || !date) {
      alert("Preencha todos os dados")
      return
    }

    const data = {
      image,
      tags,
      date,
      author,
      content,
      authorNotes,
      category: "tip",
    }

    console.log(data)
  }

  return (
    <Box className="flex flex-col">
      <form onSubmit={handleSubmitForm} className="space-y-4 flex flex-col">
        <FormButton
          icon={Save}
          type="submit"
          label="Publicar"
          className="w-full bg-indigo-700 text-white border-none self-end"
        />
        <Input.Root>
          <Input.Label title="Título*" />
          <Input.Field
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Input.Root>

        {image && (
          <img src={image} alt={title} className="size-14 object-contain" />
        )}

        <Input.Root>
          <Input.Label title="Imagem principal*" />
          <Input.Field type="file" accept="image/*" onChange={handleImage} />
        </Input.Root>

        <Input.Root className="w-full">
          <Input.Label title="Data de criação" />
          <Input.Field
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label title="Tags (opcional e separar por vírgula)" />
          <Input.Field
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label title="Notas do autor (opcional)" />
          <Input.TextArea
            className="h-20"
            value={authorNotes}
            onChange={(e) => setAuthorNotes(e.target.value)}
          />
        </Input.Root>

        <Select.Root>
          <Select.Label label="Autor" />
          <Select.Container
            defaultValue={authorNotes}
            onChange={(e) => setAuthor(e.target.value)}
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
