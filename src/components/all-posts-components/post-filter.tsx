import { ChangeEvent } from "react"
import { Select } from "../../components/ui/select-field"

type Props = {
  handleCategory: (category: string) => void
}

const PostFilter = ({ handleCategory }: Props) => {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value.toLowerCase())
    handleCategory(e.target.value.toLowerCase())
  }

  return (
    <div className="lg:w-fit w-full h-auto">
      <Select.Container onChange={handleChange}>
        <Select.Option label="Reviews" />
        <Select.Option label="Passeios" />
      </Select.Container>
    </div>
  )
}

export default PostFilter
