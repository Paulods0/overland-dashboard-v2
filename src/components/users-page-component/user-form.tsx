import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import Button from "../ui/button/button"
import { DialogClose } from "../ui/dialog"
import { uploadToFirebase } from "@/lib/firebase"
import { Input } from "@/components/ui/input-field"
import { Select } from "@/components/ui/select-field"
import { CreateUserDTO } from "@/api/users/user.type"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"
import { useCreateUser } from "@/lib/tanstack-query/users/user-mutations"

export const roles = [
  {
    role: "admin",
    label: "Admin",
  },
  {
    role: "store-manager",
    label: "Gestor de loja",
  },
  {
    role: "publicator",
    label: "Publicador",
  },
]

const UserForm = () => {
  const { mutate, isPending } = useCreateUser()

  const [user, setUser] = useState<CreateUserDTO>({
    role: "",
    email: "",
    image: null,
    lastname: "",
    password: "",
    firstname: "",
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]
      const urlImage = URL.createObjectURL(image)
      setUser({ ...user, image: image })
      setPreviewImage(urlImage)
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      if (
        !user.firstname ||
        !user.firstname ||
        !user.email ||
        !user.role ||
        !user.password
      ) {
        toast.error("Preencha todos os dados obrigatórios")
        return
      }

      const imagedURL = user.image
        ? await uploadToFirebase(user.image as File, "profile")
        : ""

      const data: CreateUserDTO = {
        ...user,
        image: imagedURL as string,
      }
      mutate(data)
      toast.success("Usuário adicionado com sucesso")
      resetInputs()
      console.log(data)
    } catch (error) {
      resetInputs()
      toast.error("Erro ao criar usuário, tente novamente")
      console.error(error)
    }
  }

  function resetInputs() {
    setUser({
      role: "",
      image: "",
      email: "",
      lastname: "",
      password: "",
      firstname: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {previewImage && (
        <img
          src={previewImage}
          alt={user.firstname + user.lastname}
          className="size-12 object-contain aspect-square"
        />
      )}

      <Input.Root>
        <Input.Label title="Imagem" />
        <Input.Field type="file" accept="image/*" onChange={handleImage} />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Nome*" />
        <Input.Field
          type="text"
          value={user.firstname}
          onChange={(e) => setUser({ ...user, firstname: e.target.value })}
        />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Sobrenome*" />
        <Input.Field
          type="text"
          value={user.lastname}
          onChange={(e) => setUser({ ...user, lastname: e.target.value })}
        />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Email*" />
        <Input.Field
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </Input.Root>

      <Select.Root>
        <Select.Label label="Role*" />
        <Select.Container
          defaultValue="role"
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <Select.Option disabled value="role" label="Escolher a role" />

          {roles.map((role, index) => (
            <Select.Option key={index} value={role.role} label={role.label} />
          ))}
        </Select.Container>
      </Select.Root>

      <Input.Root>
        <Input.Label title="Palavra-passe*" />
        <Input.Field
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </Input.Root>

      <div className="flex gap-2 items-center justify-end">
        <DialogClose asChild>
          <Button label="Cancelar " buttonType="cancel" />
        </DialogClose>

        <FormButton
          disabled={isPending}
          icon={isPending ? Loading : Save}
          label="Salvar"
        />
      </div>
    </form>
  )
}

export default UserForm
