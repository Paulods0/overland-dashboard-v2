import LinkButton from "../../components/ui/button/link-button"
import PostFilter from "../../components/all-posts-components/post-filter"
const FilterContainer = () => {
  return (
    <div className="flex items-center w-full gap-4 flex-wrap">
      <PostFilter />
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
