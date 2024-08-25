import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import { categories } from "./edit-post-form"
import Box from "../../components/global/box"
import useIsLoading from "@/hooks/useIsLoading"
import { uploadToFirebase } from "@/lib/firebase"
import NothingToShow from "../global/nothing-to-show"
import { CreatePostDTO } from "@/api/post/post.types"
import FormButton from "../ui/input-field/form-button"
import { Input } from "../../components/ui/input-field"
import { ChangeEvent, FormEvent, useState } from "react"
import { Select } from "../../components/ui/select-field"
import { useGetUsers } from "@/lib/tanstack-query/users/user-queries"
import { useCreatePost } from "@/lib/tanstack-query/post/post-mutations"

type FormProps = {
  content: string
}

export const AUTHOR_ID = "66b50327c6794b27ee46c6f1"

const AddPostForm = ({ content }: FormProps) => {
  const { mutate } = useCreatePost()
  const { data: users, isLoading: isLoadingUsers } = useGetUsers("", "100")
  const { isLoading, toggleLoading } = useIsLoading()

  const [previewImg, setPreviewImg] = useState<string | null>(null)
  const [coordinates, setCoordinates] = useState<string | undefined>(undefined)

  const [post, setPost] = useState<CreatePostDTO>({
    content,
    date: "",
    tag: "",
    title: "",
    category: "",
    latitude: "",
    author_id: "",
    longitude: "",
    mainImage: "",
    author_notes: "",
    highlighted: false,
  })

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]
      const urlImage = URL.createObjectURL(image)
      setPreviewImg(urlImage)
      setPost({ ...post, mainImage: image })
    }
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toggleLoading(true)
    console.log(post)
    try {
      if (
        !post.title ||
        !post.mainImage ||
        !post.category ||
        !post.author_id ||
        !post.date
      ) {
        toast.error("Por favor preencha todos os campos obrigatórios")
        toggleLoading(false)
        throw new Error("Form error, empty input")
      }

      if (post.category === "Passeios") {
        if (!coordinates || !coordinates.includes(",")) {
          toast.error(
            "Por favor insira a latitude e a longitude separadas por vírgula."
          )
          toggleLoading(false)
          return
        }
      }

      const imageURL = await uploadToFirebase(post.mainImage as File, "posts")
      const [lat, long] =
        coordinates && coordinates.includes(",")
          ? coordinates.split(",")
          : [undefined, undefined]

      const data: CreatePostDTO = {
        latitude: lat,
        longitude: long,
        tag: post.tag,
        date: post.date,
        content: content,
        title: post.title,
        mainImage: imageURL,
        category: post.category,
        author_id: post.author_id,
        highlighted: post.highlighted,
        author_notes: post.author_notes,
      }
      console.log(data)

      mutate(data)
      toggleLoading(false)
      toast.success("Post adicinado com sucesso")
      resetInputs()
    } catch (error: any) {
      console.log(error)
      toast.error(error)
    }
  }

  function resetInputs() {
    setCoordinates(undefined)
    setPreviewImg(null)
    setPost({
      tag: "",
      date: "",
      title: "",
      content: "",
      latitude: "",
      author_id: "",
      longitude: "",
      mainImage: null,
      category: "none",
      author_notes: "",
      highlighted: false,
    })
  }

  return (
    <Box className="flex flex-col">
      <form onSubmit={handleSubmitForm} className="space-y-4 flex flex-col">
        <FormButton
          disabled={isLoading}
          icon={isLoading ? Loading : Save}
          label="Publicar"
        />
        <Input.Root>
          <Input.Label title="Título*" />
          <Input.Field
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </Input.Root>

        {previewImg && (
          <img
            src={previewImg}
            alt={post.title}
            className="size-14 object-contain"
          />
        )}

        <Input.Root>
          <Input.Label title="Imagem principal*" />
          <Input.Field type="file" accept="image/*" onChange={handleImage} />
        </Input.Root>

        <div className="flex items-start gap-4">
          <Input.Root className="w-full">
            <Input.Label title="Data de criação" />
            <Input.Field
              type="date"
              value={post.date}
              onChange={(e) => setPost({ ...post, date: e.target.value })}
            />
          </Input.Root>

          <Input.Root>
            <Input.Label title="Destacar" />
            <Input.Field
              type="checkbox"
              className="size-8 border-none"
              checked={post.highlighted}
              onChange={(e) =>
                setPost({ ...post, highlighted: e.target.checked })
              }
            />
          </Input.Root>
        </div>

        <Input.Root>
          <Input.Label title="Tags (opcional e separar por vírgula)" />
          <Input.Field
            type="text"
            value={post.tag}
            onChange={(e) => {
              const tag = e.target.value.split(",")
              setPost({ ...post, tag })
            }}
          />
        </Input.Root>

        {post.category === "Passeios" && (
          <Input.Root>
            <Input.Label title="Latitude e Longitude" />
            <Input.Field
              type="text"
              value={coordinates}
              onChange={(e) => setCoordinates(e.target.value)}
            />
          </Input.Root>
        )}

        <Input.Root>
          <Input.Label title="Notas do autor (opcional)" />
          <Input.TextArea
            className="h-20"
            value={post.author_notes}
            onChange={(e) => setPost({ ...post, author_notes: e.target.value })}
          />
        </Input.Root>

        <Select.Root>
          <Select.Label label="Autor" />
          {isLoadingUsers ? (
            <Loading />
          ) : !users?.users ? (
            <NothingToShow name="usuário" />
          ) : (
            <Select.Container
              onChange={(e) => setPost({ ...post, author_id: e.target.value })}
            >
              {users.users.map((user, index) => (
                <Select.Option
                  key={index}
                  value={user._id}
                  label={`${user.firstname} ${user.lastname}`}
                />
              ))}
            </Select.Container>
          )}
        </Select.Root>

        <Select.Root>
          <Select.Label label="Categoria" />
          <Select.Container
            defaultValue="none"
            onChange={(e) => setPost({ ...post, category: e.target.value })}
          >
            <Select.Option disabled value={"none"} label={"Categoria"} />
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

export default AddPostForm
