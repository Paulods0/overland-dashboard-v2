  import { SetURLSearchParams } from "react-router-dom"
  import LinkButton from "../../components/ui/button/link-button"
  import PostFilter from "../../components/all-posts-components/post-filter"

  type Props = {
    setSearch: SetURLSearchParams
  }

  const FilterContainer = ({ setSearch }: Props) => {
    
    function handleCategory(category: string) {
      if (category && category !== "") {
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

    return (
      <div className="flex items-center gap-4 flex-wrap">
        <PostFilter handleCategory={handleCategory} />
        <LinkButton
          label="Agenda AO"
          href="/agenda-ao"
          className="bg-neutral-800 text-white"
        />
        <LinkButton
          label="Classificados"
          href="/classificados"
          className="bg-neutral-800 text-white"
        />
      </div>
    )
  }

  export default FilterContainer
