import { ChangeEvent } from "react"
import { Input } from "../ui/input-field"
import { productCategories } from "./add-store-form"
import { Select } from "@/components/ui/select-field"
import { SetURLSearchParams } from "react-router-dom"

type Props = {
  searchValue?: string[]
  setSearch: SetURLSearchParams
}

const StoreFilter = ({ searchValue, setSearch }: Props) => {
  const [limit] = searchValue ? searchValue : [""]

  function handleCategory(e: ChangeEvent<HTMLSelectElement>) {
    const category = e.target.value
    if (category !== "") {
      setSearch((state) => {
        state.set("category", category)
        return state
      })
    } else {
      setSearch((state) => {
        state.delete("category")
        return state
      })
    }
  }

  function handleLimit(e: ChangeEvent<HTMLInputElement>) {
    const limit = parseInt(e.target.value)
    if (!isNaN(limit) && limit > 0) {
      setSearch((state) => {
        state.set("limit", limit.toString())
        return state
      })
    } else {
      setSearch((state) => {
        state.delete("limit")
        return state
      })
    }
  }

  return (
    <div className="flex items-center gap-2">
      <h4 className="font-bold text-sm">Filtrar:</h4>

      <Input.Root className="w-24">
        <Input.Field
          type="number"
          value={limit}
          placeholder="Limite"
          onChange={handleLimit}
          className="placeholder:text-zinc-200"
        />
      </Input.Root>

      <Select.Container
        className="w-44"
        defaultValue={""}
        onChange={handleCategory}
      >
        <Select.Option label={"Todos"} value={""} />
        {productCategories.map((product, index) => (
          <Select.Option
            key={index}
            label={product.name}
            value={product.value}
          />
        ))}
      </Select.Container>
    </div>
  )
}

export default StoreFilter
