import { Select } from "../../components/ui/select-field"

const PostFilter = () => {
  return (
    <div className="lg:w-fit w-full h-auto">
      <Select.Container>
        <Select.Option label="Reviews" />
        <Select.Option label="Passeios" />
      </Select.Container>
    </div>
  )
}

export default PostFilter
