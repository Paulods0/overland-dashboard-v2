import { ChangeEvent } from "react"
import { Select } from "../../components/ui/select-field"
import { categories } from "../add-post-components/edit-post-form"

type Props = {
  handleCategory: (category: string) => void
}

const PostFilter = ({ handleCategory }: Props) => {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value) {
      handleCategory(e.target.value.toLowerCase().replace(" ", "-"))
    } else {
      handleCategory(e.target.value)
    }
  }

  return (
    <div className="lg:w-fit w-full h-auto">
      <Select.Container onChange={handleChange}>
        <Select.Option value={""} label={"Todos"} />
        {categories.map((category, index) => (
          <Select.Option
            key={index}
            value={category.value}
            label={category.label}
          />
        ))}
      </Select.Container>
    </div>
  )
}

export default PostFilter
