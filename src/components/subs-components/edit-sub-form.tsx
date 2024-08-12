import { Save } from "lucide-react"
import { toast } from "react-toastify"
import { Input } from "../ui/input-field"
import { FormEvent, useState } from "react"
import FormButton from "../ui/input-field/form-button"
import { DialogClose } from "../ui/dialog"
import Button from "../ui/button/button"

type SubProps = {
  name: string
  lastname: string
  email: string
}

const EditSubForm = () => {
  const [sub, setSub] = useState<SubProps>({
    name: "",
    email: "",
    lastname: "",
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const data: SubProps = { ...sub }
    toast.success("Dados atualizados com sucesso")
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input.Root>
        <Input.Label title="Nome" />
        <Input.Field
          type="text"
          value={sub.name}
          onChange={(e) => setSub({ ...sub, name: e.target.value })}
        />
      </Input.Root>
      <Input.Root>
        <Input.Label title="Sobrenome" />
        <Input.Field
          type="text"
          value={sub.lastname}
          onChange={(e) => setSub({ ...sub, lastname: e.target.value })}
        />
      </Input.Root>
      <Input.Root>
        <Input.Label title="Email" />
        <Input.Field
          type="email"
          value={sub.email}
          onChange={(e) => setSub({ ...sub, email: e.target.value })}
        />
      </Input.Root>
      <div className="flex gap-2 items-center self-end">
        <DialogClose>
          <Button label="Cancelar" buttonType="cancel" />
        </DialogClose>
        <FormButton label="Atualizar dados" icon={Save} className="w-fit" />
      </div>
    </form>
  )
}

export default EditSubForm
