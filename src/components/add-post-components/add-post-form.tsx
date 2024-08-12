import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import Box from "../../components/global/box"
import useIsLoading from "@/hooks/useIsLoading"
import { uploadToFirebase } from "@/lib/firebase"
import { CreatePostDTO } from "@/api/post/post.types"
import FormButton from "../ui/input-field/form-button"
import { Input } from "../../components/ui/input-field"
import { ChangeEvent, FormEvent, useState } from "react"
import { Select } from "../../components/ui/select-field"
import { useCreatePost } from "@/lib/tanstack-query/post/post-mutations"

type FormProps = {
  content: string
}

export type TPost = {
  title: string
  tags?: string
  date: string
  author: string
  latLang: string
  category: string
  highlighted: boolean
  authorNotes?: string
  mainImage: File | string | null
}

export const AUTHOR_ID = "66b50327c6794b27ee46c6f1"

const AddPostForm = ({ content }: FormProps) => {
  const { mutate } = useCreatePost()
  const { isLoading, toggleLoading } = useIsLoading()
  const [previewImg, setPreviewImg] = useState<string | null>(null)

  const [post, setPost] = useState<TPost>({
    date: "",
    tags: "",
    title: "",
    author: AUTHOR_ID,
    latLang: "",
    category: "",
    mainImage: "",
    authorNotes: "",
    highlighted: false,
  })

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]
      const urlImage = URL.createObjectURL(image)
      setPost({ ...post, mainImage: image })
      setPreviewImg(urlImage)
    }
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toggleLoading(true)
    try {
      if (
        !post.title ||
        !post.mainImage ||
        !post.category ||
        !post.author ||
        !post.date
      ) {
        toast.error("Por favor preencha todos os campos obrigatórios")
        toggleLoading(false)
        throw new Error("Form error, empty input")
      }
      const coordinates = post.latLang ? post.latLang.split(",") : ""
      const geoCoordinates = {
        latitude: coordinates[0],
        longitude: coordinates[1],
      }

      const imageURL = await uploadToFirebase(post.mainImage as File, "posts")
      const tagsArr = post.tags ? post.tags.split(",") : ""

      const data: CreatePostDTO = {
        tags: tagsArr,
        date: post.date,
        content: content,
        title: post.title,
        mainImage: imageURL,
        author_id: post.author,
        category: post.category,
        highlighted: post.highlighted,
        author_notes: post.authorNotes,
        latitude: geoCoordinates.latitude,
        longitude: geoCoordinates.longitude,
      }
      mutate(data)
      toggleLoading(false)
      toast.success("Post adicinado com sucesso")
      resetInputs()
    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data.message)
      resetInputs()
    }
  }

  function resetInputs() {
    setPost({
      tags: "",
      date: "",
      title: "",
      author: "",
      latLang: "",
      category: "",
      mainImage: "",
      authorNotes: "",
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
            value={post.tags}
            onChange={(e) => setPost({ ...post, tags: e.target.value })}
          />
        </Input.Root>

        {post.category === "Passeios" && (
          <Input.Root>
            <Input.Label title="Latitude e Longitude" />
            <Input.Field
              type="number"
              value={post.latLang}
              onChange={(e) => setPost({ ...post, latLang: e.target.value })}
            />
          </Input.Root>
        )}

        <Input.Root>
          <Input.Label title="Notas do autor (opcional)" />
          <Input.TextArea
            className="h-20"
            value={post.authorNotes}
            onChange={(e) => setPost({ ...post, authorNotes: e.target.value })}
          />
        </Input.Root>

        <Select.Root>
          <Select.Label label="Autor" />
          <Select.Container
            onChange={(e) => setPost({ ...post, author: e.target.value })}
          >
            <Select.Option value={"user-1"} label="User 1" />
            <Select.Option value={"user-2"} label="User 2" />
          </Select.Container>
        </Select.Root>

        <Select.Root>
          <Select.Label label="Categoria" />
          <Select.Container
            onChange={(e) => setPost({ ...post, category: e.target.value })}
          >
            <Select.Option value="Passeios" label="Passeios" />
            <Select.Option value="Reviews" label="Reviews" />
            <Select.Option value="Histórias" label="Histórias" />
            <Select.Option value="Jornal Overland" label="Jornal Overland" />
            <Select.Option
              value="Overland Explorer"
              label="Overland Explorer"
            />
          </Select.Container>
        </Select.Root>
      </form>
    </Box>
  )
}

export default AddPostForm
