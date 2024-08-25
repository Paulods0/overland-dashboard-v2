import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import Box from "../../components/global/box"
import useIsLoading from "@/hooks/useIsLoading"
import LoadingData from "../global/loading-data"
import NothingToShow from "../global/nothing-to-show"
import FormButton from "../ui/input-field/form-button"
import { Input } from "../../components/ui/input-field"
import { ChangeEvent, FormEvent, useState } from "react"
import { Select } from "../../components/ui/select-field"
import { Post, UpdatePostDTO } from "@/api/post/post.types"
import { useGetUsers } from "@/lib/tanstack-query/users/user-queries"
import { deleteFromFirebase, uploadToFirebase } from "@/lib/firebase"
import { useUpdatePost } from "@/lib/tanstack-query/post/post-mutations"

export type Props = {
  post?: Post
  content: string
}

export const categories = [
  { value: "Reviews", label: "Reviews" },
  { value: "Passeios", label: "Passeios" },
  { value: "Histórias", label: "Histórias" },
  { value: "Jornal Overland", label: "Jornal Overland" },
  { value: "Overland Explorer", label: "Overland Explorer" },
]

const EdittPostForm = ({ post, content }: Props) => {
  const { mutate } = useUpdatePost()
  const { data: users } = useGetUsers("", "100")

  const { isLoading, toggleLoading } = useIsLoading()
  const [previewImg, setPreviewImg] = useState<string | null>(null)

  if (!post) return <LoadingData />

  const coordinates = `${post.latitude}, ${post.longitude}`

  const [updatePost, setUpdatePost] = useState<UpdatePostDTO>({
    id: post._id,
    date: post.date,
    content: content,
    title: post.title,
    tag: post.tag.join(","),
    category: post.category,
    author_id: post.author._id,
    highlighted: post.highlighted,
    author_notes: post.author_notes,
  })

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]
      const urlImage = URL.createObjectURL(image)
      setUpdatePost({ ...updatePost, mainImage: image })
      setPreviewImg(urlImage)
    }
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toggleLoading(true)
    try {
      let postImg = post?.mainImage

      if (previewImg) {
        await deleteFromFirebase(post!.mainImage, "posts")
        postImg = await uploadToFirebase(updatePost.mainImage as File, "posts")
      }

      const data: UpdatePostDTO = {
        id: post!._id,
        content: content,
        mainImage: postImg,
        date: updatePost.date,
        tag: updatePost?.tag,
        title: updatePost.title,
        latitude: updatePost.latitude,
        category: updatePost.category,
        longitude: updatePost.longitude,
        author_id: updatePost.author_id,
        highlighted: updatePost.highlighted,
        author_notes: updatePost.author_notes,
      }

      mutate(data)
      toggleLoading(false)
      toast.success("Atualizado com sucesso")
    } catch (error: any) {
      console.log(error)
      toast.error("Erro ao atualizar o post")
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
            value={updatePost.title}
            onChange={(e) =>
              setUpdatePost({ ...updatePost, title: e.target.value })
            }
          />
        </Input.Root>

        <img
          alt={updatePost.title}
          src={previewImg ? previewImg : post.mainImage}
          className="size-14 object-contain"
        />

        <Input.Root>
          <Input.Label title="Imagem principal*" />
          <Input.Field type="file" accept="image/*" onChange={handleImage} />
        </Input.Root>

        <div className="flex items-start gap-4">
          <Input.Root className="w-full">
            <Input.Label title="Data de criação" />
            <Input.Field
              type="date"
              value={updatePost.date}
              onChange={(e) =>
                setUpdatePost({ ...updatePost, date: e.target.value })
              }
            />
          </Input.Root>

          <Input.Root>
            <Input.Label title="Destacar" />
            <Input.Field
              type="checkbox"
              className="size-8 border-none"
              checked={updatePost.highlighted}
              onChange={(e) =>
                setUpdatePost({ ...updatePost, highlighted: e.target.checked })
              }
            />
          </Input.Root>
        </div>

        <Input.Root>
          <Input.Label title="Tags (opcional e separar por vírgula)" />
          <Input.Field
            type="text"
            value={updatePost.tag}
            onChange={(e) => {
              const newTags = e.target.value.split(",")
              setUpdatePost({ ...updatePost, tag: newTags })
            }}
          />
        </Input.Root>

        {updatePost.category === "Passeios" && (
          <Input.Root>
            <Input.Label title="Latitude e Longitude" />
            <Input.Field
              type="number"
              value={coordinates}
              onChange={(e) =>
                setUpdatePost({
                  ...updatePost,
                  latitude: e.target.value.split(",")[0],
                  longitude: e.target.value.split(",")[1],
                })
              }
            />
          </Input.Root>
        )}

        <Input.Root>
          <Input.Label title="Notas do autor (opcional)" />
          <Input.TextArea
            className="h-20"
            value={updatePost.author_notes}
            onChange={(e) =>
              setUpdatePost({ ...updatePost, author_notes: e.target.value })
            }
          />
        </Input.Root>

        <Select.Root>
          <Select.Label label="Autor" />
          <Select.Container
            defaultValue={post.author._id}
            onChange={(e) =>
              setUpdatePost({ ...updatePost, author_id: e.target.value })
            }
          >
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

        <Select.Root>
          <Select.Label label="Categoria" />
          <Select.Container
            defaultValue={updatePost.category}
            onChange={(e) =>
              setUpdatePost({ ...updatePost, category: e.target.value })
            }
          >
            {categories.map((category, index) => (
              <Select.Option
                key={index}
                value={category.value}
                label={category.label}
              />
            ))}
          </Select.Container>
        </Select.Root>
      </form>
    </Box>
  )
}

export default EdittPostForm
