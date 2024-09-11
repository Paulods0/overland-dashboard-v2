import { toast } from "react-toastify"
import Button from "../ui/button/button"
import { DialogClose } from "../ui/dialog"
import { Select } from "../ui/select-field"
import { ChangeEvent, useState } from "react"
import {
  Classified,
  UpdateClassifiedDTO,
} from "@/api/classified/classified.types"
import { useUpdateClassified } from "@/lib/tanstack-query/classified/classified-mutations"

type Props = {
  post: Classified
}

const EditClassifiedForm = ({ post }: Props) => {
  const { mutateAsync, isPending } = useUpdateClassified()
  const [status, setStatus] = useState("")

  async function handleUpdate() {
    try {
      const updatePostDTO: UpdateClassifiedDTO = {
        id: post._id,
        status: status,
      }
      const response = await mutateAsync(updatePostDTO)
      toast.success(response.message)
    } catch (error: any) {
      toast.error(error)
      console.log(error)
    }
  }

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    setStatus(e.target.value)
  }

  return (
    <form className="space-y-4">
      <Select.Root>
        <Select.Label label="Alterar o status" />
        <Select.Container defaultValue={post.status} onChange={handleSelect}>
          <Select.Option label="Ativo" value={"active"} />
          <Select.Option label="Inativo" value={"inactive"} />
          <Select.Option label="Suspendido" value={"suspended"} />
        </Select.Container>
      </Select.Root>

      <div className="flex items-center gap-2 justify-end">
        <DialogClose asChild>
          <Button label="Cancelar" buttonType="cancel" />
        </DialogClose>

        <Button
          disabled={isPending}
          onClick={handleUpdate}
          className="bg-indigo-600 text-white"
          label={isPending ? "Atualizando..." : "Salvar alterações"}
        />
      </div>
    </form>
  )
}

export default EditClassifiedForm
