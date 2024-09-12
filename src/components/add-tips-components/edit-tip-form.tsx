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
import { Tip, UpdateTipDTO } from "@/api/tips/tip.types"
import { useGetUsers } from "@/lib/tanstack-query/users/user-queries"
import { useUpdateTip } from "@/lib/tanstack-query/tip/tip-mutations"
import { deleteFromFirebase, uploadToFirebase } from "@/lib/firebase"

type Props = {
  tip?: Tip
  content: string
}

const EditTipForm = ({ tip, content }: Props) => {
  const { mutateAsync } = useUpdateTip()
  const { data: users } = useGetUsers("", "100")

  const { isLoading, toggleLoading } = useIsLoading()
  const [previewImage, setPreviewImage] = useState<string | null>("")

  if (!tip) return <LoadingData />

  const [updateTip, setUpdateTip] = useState<UpdateTipDTO>({
    content,
    id: tip._id,
    image: tip.image,
    title: tip.title,
    category: tip.category,
    author: tip.author._id,
    author_notes: tip.author_notes,
    tags: tip.tags ? tip.tags?.join(",") : "",
  })

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]
      const imgURL = URL.createObjectURL(image)
      setPreviewImage(imgURL)
      setUpdateTip({ ...updateTip, image: image })
      return () => URL.revokeObjectURL(imgURL)
    }
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toggleLoading(true)

    let newImageURL = tip?.image

    try {
      if (previewImage && updateTip.image instanceof File) {
        await deleteFromFirebase(tip!.image, "tips")
        newImageURL = await uploadToFirebase(updateTip.image, "tips")
      }

      const data: UpdateTipDTO = {
        content,
        id: tip!._id,
        image: newImageURL,
        tags: updateTip.tags,
        title: updateTip.title,
        author: updateTip.author,
        category: updateTip.category,
        author_notes: updateTip.author_notes,
      }

      const response = await mutateAsync(data)
      toast.success(response.message)
    } catch (error: any) {
      if (newImageURL !== tip?.image) {
        await deleteFromFirebase(newImageURL!, "tips")
      }
      toast.error(error)
      console.log("Erro ao atualizar os dados", error)
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
            value={updateTip.title}
            onChange={(e) =>
              setUpdateTip({ ...updateTip, title: e.target.value })
            }
          />
        </Input.Root>

        <img
          alt={updateTip.title}
          src={previewImage ? previewImage : tip?.image}
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
            value={updateTip.tags}
            onChange={(e) => {
              const newTags = e.target.value.split(",")
              setUpdateTip({ ...updateTip, tags: newTags })
            }}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label title="Notas do autor (opcional)" />
          <Input.TextArea
            className="h-20"
            value={updateTip.author_notes}
            onChange={(e) =>
              setUpdateTip({ ...updateTip, author_notes: e.target.value })
            }
          />
        </Input.Root>

        <Select.Root>
          <Select.Label label="Autor" />
          <Select.Container
            defaultValue={updateTip.author}
            onChange={(e) =>
              setUpdateTip({ ...updateTip, author: e.target.value })
            }
          >
            <Select.Option
              selected
              disabled
              value={tip.author._id}
              label={`${tip.author.firstname} ${tip.author.lastname}`}
            />
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

export default EditTipForm
