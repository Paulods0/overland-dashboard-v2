import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import Button from "@/components/ui/button/button"
import { SetURLSearchParams } from "react-router-dom"

type Props = {
  pages?: number
  currentPage: number
  setSearch: SetURLSearchParams
}

const MAX_VIEW_BUTTONS = 5

const Pagination = ({ pages, currentPage, setSearch }: Props) => {
  if (!pages) return

  const controls = {
    calculateMaxViewButtons: () => {
      let maxLeft = currentPage - Math.floor(MAX_VIEW_BUTTONS / 2)
      let maxRight = currentPage + Math.floor(MAX_VIEW_BUTTONS / 2)

      if (maxLeft < 1) {
        maxLeft = 1
        maxRight = MAX_VIEW_BUTTONS
      }

      if (maxRight > pages) {
        maxRight = pages
        maxLeft = pages - (MAX_VIEW_BUTTONS - 1)
        if (maxLeft < 1) {
          maxLeft = 1
        }
      }

      return { maxLeft, maxRight }
    },

    nextPage: () => {
      setSearch((state) => {
        let page = Number(state.get("page"))

        if (page >= pages) {
          state.set("page", String(pages))
          return state
        } else {
          const nextPage = page + 1
          state.set("page", String(nextPage))
          return state
        }
      })
    },
    prevPage: () => {
      setSearch((state) => {
        let page = Number(state.get("page"))
        if (page <= 1) {
          state.set("page", "1")
          return state
        } else {
          const prevPage = page - 1
          state.set("page", String(prevPage))
          return state
        }
      })
    },
    goTo: (page: number) => {
      setSearch((state) => {
        state.set("page", String(page))
        return state
      })
    },
    goToStart: () => {
      setSearch((state) => {
        state.set("page", String(1))
        return state
      })
    },
    goToEnd: () => {
      setSearch((state) => {
        state.set("page", String(pages))
        return state
      })
    },
  }

  const { maxLeft, maxRight } = controls.calculateMaxViewButtons()

  const slicedPages = Array.from(
    { length: maxRight - maxLeft + 1 },
    (_, i) => i + maxLeft
  )

  return (
    <div className="w-full px-4 lg:px-0 mx-auto justify-center py-8 flex items-center gap-2 lg:w-[90vw]">
      <Button onClick={controls.goToStart} icon={ChevronsLeft} />
      <Button onClick={controls.prevPage} icon={ChevronLeft} />
      {slicedPages.map((page) => (
        <Button
          key={page}
          label={`${page}`}
          onClick={() => controls.goTo(page)}
          className={`!w-10 ${
            currentPage === page ? "bg-indigo-700 text-white" : ""
          }`}
        />
      ))}
      <Button onClick={controls.nextPage} icon={ChevronRight} />
      <Button onClick={controls.goToEnd} icon={ChevronsRight} />
    </div>
  )
}

export default Pagination
