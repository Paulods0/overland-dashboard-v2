import { UserPlus } from "lucide-react"
import { FormEvent, useState } from "react"
import { Input } from "@/components/ui/input-field"
import FormButton from "@/components/ui/input-field/form-button"
import { toast } from "react-toastify"
import Button from "../ui/button/button"
import { DialogClose } from "../ui/dialog"

type SubscriberProps = {
  name: string
  surname: string
  email: string
}

export const SubsForm = () => {
  const [subscriber, setSubscriber] = useState<SubscriberProps>({
    email: "",
    name: "",
    surname: "",
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!subscriber.name || !subscriber.surname || !subscriber.email) {
      toast.error("Preecnha todos os campos obrigatórios")
      return
    }

    const data: SubscriberProps = { ...subscriber }
    console.log(data)
    toast.success("Subscrição feita com sucesso.")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input.Root>
        <Input.Label title="Nome*" />
        <Input.Field
          type="text"
          value={subscriber.name}
          onChange={(e) =>
            setSubscriber({ ...subscriber, name: e.target.value })
          }
        />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Sobrenome*" />
        <Input.Field
          type="text"
          value={subscriber.surname}
          onChange={(e) =>
            setSubscriber({ ...subscriber, surname: e.target.value })
          }
        />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Email*" />
        <Input.Field
          type="email"
          value={subscriber.email}
          onChange={(e) =>
            setSubscriber({ ...subscriber, email: e.target.value })
          }
        />
      </Input.Root>
      <div className="flex items-center gap-2 justify-end">
        <DialogClose asChild>
          <Button label="Cancelar" buttonType="cancel" />
        </DialogClose>
        <FormButton label="Subscrever" icon={UserPlus} />
      </div>
    </form>
  )
}
