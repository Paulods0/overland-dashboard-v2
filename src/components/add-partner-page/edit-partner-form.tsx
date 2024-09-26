import Box from "../global/box"
import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import { Input } from "../ui/input-field"
import { Select } from "../ui/select-field"
import useIsLoading from "@/hooks/useIsLoading"
import LoadingData from "../global/loading-data"
import NothingToShow from "../global/nothing-to-show"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"
import { useGetUsers } from "@/lib/tanstack-query/users/user-queries"
import { deleteFromFirebase, uploadToFirebase } from "@/lib/firebase"
import { Partner, UpdatePartnerDTO } from "@/api/partner/partner.type"
import { useUpdatePartner } from "@/lib/tanstack-query/partner/partner-mutations"

type Props = {
  partner?: Partner
  content: string
}

const EditPartnerForm = ({ partner, content }: Props) => {
  const { mutateAsync } = useUpdatePartner()
  const { data: users } = useGetUsers("", "100")

  const { isLoading, toggleLoading } = useIsLoading()
  const [previewImage, setPreviewImage] = useState<string | null>("")

  if (!partner) return <LoadingData />

  const [updatePartner, setUpdatePartner] = useState<UpdatePartnerDTO>({
    content,
    _id: partner._id,
    date: partner.date,
    title: partner.title,
    image: partner.image,
    author: partner.author._id,
    author_notes: partner.author_notes,
  })

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]
      const imgURL = URL.createObjectURL(image)
      setPreviewImage(imgURL)
      setUpdatePartner({ ...updatePartner, image: image })
      return () => URL.revokeObjectURL(imgURL)
    }
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toggleLoading(true)

    let newImageURL = partner?.image

    try {
      if (previewImage && updatePartner.image instanceof File) {
        await deleteFromFirebase(partner?.image!, "partners")
        newImageURL = await uploadToFirebase(updatePartner.image, "partners")
      }

      const data: UpdatePartnerDTO = {
        content,
        _id: partner!._id,
        image: newImageURL,
        date: updatePartner.date,
        tags: updatePartner.tags,
        title: updatePartner.title,
        author: updatePartner.author,
        author_notes: updatePartner.author_notes,
      }

      const response = await mutateAsync(data)
      toast.success(response.message)
    } catch (error: any) {
      if (newImageURL !== partner?.image) {
        await deleteFromFirebase(newImageURL!, "partners")
      }
      toast.error(error)
    } finally {
      toggleLoading(false)
    }
  }

  return (
    <Box className="flex flex-col">
      <form onSubmit={handleSubmitForm} className="space-y-4 flex flex-col">
        <FormButton
          label="Atualizar"
          disabled={isLoading}
          icon={isLoading ? Loading : Save}
        />

        <Input.Root>
          <Input.Label title="Título*" />
          <Input.Field
            type="text"
            value={updatePartner.title}
            onChange={(e) =>
              setUpdatePartner({ ...updatePartner, title: e.target.value })
            }
          />
        </Input.Root>

        <img
          alt={updatePartner.title}
          src={previewImage ? previewImage : partner?.image}
          className="size-14 object-contain"
        />

        <Input.Root>
          <Input.Label title="Imagem principal*" />
          <Input.Field type="file" accept="image/*" onChange={handleImage} />
        </Input.Root>

        <Input.Root>
          <Input.Label title="Tags (opcional e separar por vírgula)" />
          <Input.Field
            type="text"
            value={updatePartner.tags}
            onChange={(e) => {
              const newTags = e.target.value.split(",")
              setUpdatePartner({ ...updatePartner, tags: newTags })
            }}
          />
        </Input.Root>
        {/* <Input.Root>
          <Input.Label title="Data*" />
          <Input.Field
            type="date"
            value={updatePartner.date}
            onChange={(e) => {
              setUpdatePartner({
                ...updatePartner,
                date: e.target.value,
              })
            }}
          />
        </Input.Root> */}

        <Input.Root>
          <Input.Label title="Notas do autor (opcional)" />
          <Input.TextArea
            className="h-20"
            value={updatePartner.author_notes}
            onChange={(e) =>
              setUpdatePartner({
                ...updatePartner,
                author_notes: e.target.value,
              })
            }
          />
        </Input.Root>

        <Select.Root>
          <Select.Label label="Autor" />
          <Select.Container
            defaultValue={partner.author._id}
            onChange={(e) =>
              setUpdatePartner({ ...updatePartner, author: e.target.value })
            }
          >
            {/* <Select.Option
              selected
              disabled
              value={partner.author._id}
              label={`${partner.author.firstname} ${partner.author.lastname}`}
            /> */}
            {users?.users ? (
              users?.users.map((user, index) => (
                <Select.Option
                  key={index}
                  value={user._id}
                  label={`${user.firstname} ${user.lastname}`}
                />
              ))
            ) : (
              <NothingToShow name="usuário" />
            )}
          </Select.Container>
        </Select.Root>
      </form>
    </Box>
  )
}

export default EditPartnerForm
