import { Save } from "lucide-react"
import { roles } from "./user-form"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import Button from "../ui/button/button"
import { DialogClose } from "../ui/dialog"
import { Input } from "@/components/ui/input-field"
import { Select } from "@/components/ui/select-field"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"
import { UpdateUserDTO, User } from "@/api/users/user.type"
import { deleteFromFirebase, uploadToFirebase } from "@/lib/firebase"
import { useUpdateUser } from "@/lib/tanstack-query/users/user-mutations"

type Props = {
  user: User
}

const EditUserForm = ({ user }: Props) => {
  const { mutate, isPending } = useUpdateUser()
  const [updateUser, setUpdateUser] = useState<UpdateUserDTO>({
    id: user._id,
    role: user.role,
    image: user.image,
    email: user.email,
    lastname: user.lastname,
    firstname: user.firstname,
  })

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]
      const urlImage = URL.createObjectURL(image)
      setUpdateUser({ ...updateUser, image: urlImage })
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      let newProfileImage: string | undefined = user.image

      if (updateUser.image) {
        if (user.image) {
          await deleteFromFirebase(user.image, "profile")
        }
        newProfileImage = await uploadToFirebase(
          updateUser.image as File,
          "profile"
        )
      }

      const userData: UpdateUserDTO = { ...updateUser, image: newProfileImage }

      mutate(userData)
      toast.success("Os dados do usuário foram atualizados com sucesso")
      console.log(userData)
    } catch (error) {
      toast.error("Erro ao atualizar os dados do usuário")
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {user.image && (
        <img
          src={user.image}
          className="size-12 object-contain aspect-square"
          alt={""}
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
          value={updateUser.firstname}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, firstname: e.target.value })
          }
        />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Sobrenome*" />
        <Input.Field
          type="text"
          value={updateUser.lastname}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, lastname: e.target.value })
          }
        />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Email*" />
        <Input.Field
          type="email"
          value={updateUser.email}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, email: e.target.value })
          }
        />
      </Input.Root>

      <Select.Root>
        <Select.Label label="Role*" />
        <Select.Container
          defaultValue={user.role}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, role: e.target.value })
          }
        >
          {roles.map((role, index) => (
            <Select.Option key={index} value={role.role} label={role.label} />
          ))}
        </Select.Container>
      </Select.Root>

      <div className="flex gap-2 items-center justify-end">
        <DialogClose asChild>
          <Button label="Cancelar" buttonType="cancel" />
        </DialogClose>

        <FormButton
          type="submit"
          disabled={isPending}
          label="Salvar alterações"
          icon={isPending ? Loading : Save}
        />
      </div>
    </form>
  )
}

export default EditUserForm
