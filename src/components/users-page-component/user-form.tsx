import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Button from "../ui/button/button"
import { Input } from "@/components/ui/input-field"
import { Select } from "@/components/ui/select-field"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"
import { DialogClose } from "../ui/dialog"

export type UserProps = {
  name: string
  surname: string
  image?: string
  role: string
  phone?: string
  email: string
}

const UserForm = () => {
  const [user, setUser] = useState<UserProps>({
    email: "",
    name: "",
    role: "",
    surname: "",
    image: "",
    phone: "",
  })

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]
      const urlImage = URL.createObjectURL(image)
      setUser({ ...user, image: urlImage })
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!user.name || !user.surname || !user.email || !user.role) {
      toast.error("Preencha todos os dados obrigatórios")
      return
    }
    const userData: UserProps = { ...user }
    toast.success("Usuário adicionado com sucesso")
    console.log(userData)
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {user.image && (
        <img
          src={user.image}
          className="size-12 object-contain aspect-square"
          alt={user.name + user.surname}
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
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Sobrenome*" />
        <Input.Field
          type="text"
          value={user.surname}
          onChange={(e) => setUser({ ...user, surname: e.target.value })}
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
          defaultValue="admin"
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <Select.Option value={"admin"} label="Admin" />
          <Select.Option value={"store manager"} label="Gestor de loja" />
          <Select.Option value={"publisher"} label="Publicador" />
        </Select.Container>
      </Select.Root>

      <Input.Root>
        <Input.Label title="Phone" />
        <Input.Field
          type="number"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
      </Input.Root>
      <div className="flex gap-2 items-center justify-end">
        <DialogClose asChild>
          <Button label="Cancelar " buttonType="cancel" />
        </DialogClose>
        <FormButton icon={Save} label="Salvar" />
      </div>
    </form>
  )
}

export default UserForm
