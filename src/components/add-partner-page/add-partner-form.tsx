import Box from "../global/box"
import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import { Input } from "../ui/input-field"
import { Select } from "../ui/select-field"
import { uploadToFirebase } from "@/lib/firebase"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"
import { CreatePartnerDTO } from "@/api/partner/partner.type"
import { AUTHOR_ID } from "../add-post-components/add-post-form"
import { useGetUsers } from "@/lib/tanstack-query/users/user-queries"
import { useCreatePartner } from "@/lib/tanstack-query/partner/partner-mutations"

type PartnerProps = {
  content: string
}

const AddPartnerForm = ({ content }: PartnerProps) => {
  const { mutate, isPending } = useCreatePartner()
  const { data: users } = useGetUsers("", "100")

  const [partner, setPartner] = useState<CreatePartnerDTO>({
    date: "",
    tags: "",
    title: "",
    image: "",
    content: "",
    author_notes: "",
    author: AUTHOR_ID,
  })

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (e.target.files) {
      const image = e.target.files[0]
      const urlImage = URL.createObjectURL(image)
      setPreviewImage(urlImage)
      setPartner({ ...partner, image: image })
    }
  }

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault()
    try {
      if (
        !partner.title ||
        !partner.author ||
        !partner.image ||
        !partner.date
      ) {
        toast.error("Preencha todos os dados")
        return
      }

      const downloadURL = await uploadToFirebase(
        partner.image as File,
        "partners"
      )
      const tagArr =
        typeof partner.tags === "string" ? partner.tags.split(",") : ""

      const data: CreatePartnerDTO = {
        content,
        tags: tagArr,
        image: downloadURL,
        date: partner.date,
        title: partner.title,
        author: partner.author,
        author_notes: partner.author_notes,
      }

      console.log(data)
      mutate(data)
      toast.success("Publicado com sucesso")
    } catch (error) {
      console.log(error)
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
            value={partner.title}
            onChange={(e) => setPartner({ ...partner, title: e.target.value })}
          />
        </Input.Root>

        {previewImage && (
          <img
            src={previewImage}
            alt={partner.title}
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
            value={partner.date}
            onChange={(e) => setPartner({ ...partner, date: e.target.value })}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label title="Tags (opcional e separar por vírgula)" />
          <Input.Field
            type="text"
            value={partner.tags}
            onChange={(e) => setPartner({ ...partner, tags: e.target.value })}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label title="Notas do autor (opcional)" />
          <Input.TextArea
            className="h-20"
            value={partner.author_notes}
            onChange={(e) =>
              setPartner({ ...partner, author_notes: e.target.value })
            }
          />
        </Input.Root>

        <Select.Root>
          <Select.Label label="Autor*" />
          <Select.Container
            defaultValue={"none"}
            onChange={(e) => setPartner({ ...partner, author: e.target.value })}
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

export default AddPartnerForm
