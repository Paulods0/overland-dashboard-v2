import {
  Subscriber,
  UpdateSubscriberDTO,
} from "@/api/subscriber/subscriber.types"
import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import Button from "../ui/button/button"
import { Input } from "../ui/input-field"
import { DialogClose } from "../ui/dialog"
import { FormEvent, useState } from "react"
import FormButton from "../ui/input-field/form-button"
import { useUpdateSub } from "@/lib/tanstack-query/subs/subs-mutation"

type Props = {
  subscriber: Subscriber
}

const EditSubForm = ({ subscriber }: Props) => {
  const { mutate, isPending } = useUpdateSub()

  const [sub, setSub] = useState<UpdateSubscriberDTO>({
    id: subscriber._id,
    name: subscriber.name,
    email: subscriber.email,
    phone: subscriber.phone,
    country: subscriber.country,
    countryCode: subscriber.countryCode,
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      const data: UpdateSubscriberDTO = { ...sub }
      toast.success("Dados atualizados com sucesso")
      console.log(data)
      mutate(data)
    } catch (error) {
      toast.error("Erro ao atualizar os dados, tente novamente")
    }
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

        <FormButton
          className="w-fit"
          disabled={isPending}
          label="Atualizar dados"
          icon={isPending ? Loading : Save}
        />
      </div>
    </form>
  )
}

export default EditSubForm
