import { toast } from "react-toastify"
import { UserPlus } from "lucide-react"
import Loading from "../global/loading"
import Button from "../ui/button/button"
import { DialogClose } from "../ui/dialog"
import { FormEvent, useState } from "react"
import useIsLoading from "@/hooks/useIsLoading"
import { Input } from "@/components/ui/input-field"
import FormButton from "@/components/ui/input-field/form-button"
import { useCreateSub } from "@/lib/tanstack-query/subs/subs-mutation"
import { CreateSubscriberDTO } from "@/api/subscriber/subscriber.types"

export const SubsForm = () => {
  const { isLoading, toggleLoading } = useIsLoading()
  const { mutate } = useCreateSub()

  const [subscriber, setSubscriber] = useState<CreateSubscriberDTO>({
    name: "",
    email: "",
    phone: "",
    country: "",
    countryCode: "",
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toggleLoading(true)
    try {
      if (!subscriber.name || !subscriber.email || !subscriber.country) {
        toast.error("Preecnha todos os campos obrigatórios")
        toggleLoading(false)
        return
      }

      const data: CreateSubscriberDTO = { ...subscriber }
      console.log(data)
      mutate(data)
      toast.success("Subscrição feita com sucesso.")
      toggleLoading(false)
    } catch (error) {
      toggleLoading(false)
      console.error(error)
    }
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
        <Input.Label title="País*" />
        <Input.Field
          type="text"
          value={subscriber.country}
          onChange={(e) =>
            setSubscriber({ ...subscriber, country: e.target.value })
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

        <FormButton
          label="Subscrever"
          disabled={isLoading}
          icon={isLoading ? Loading : UserPlus}
        />
      </div>
    </form>
  )
}
