import Button from "@/components/ui/button/button"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { useState } from "react"

type Props = {}

const totalPages = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
]
const MAX_VIEW_BUTTONS = 5

const Pagination = ({}: Props) => {
  const [currentPage, setCurrentPage] = useState(1)

  const controls = {
    calculateMaxViewButtons: () => {
      let maxLeft = currentPage - Math.floor(MAX_VIEW_BUTTONS / 2)
      let maxRight = currentPage + Math.floor(MAX_VIEW_BUTTONS / 2)

      if (maxLeft <= 1) {
        maxLeft = 1
        maxRight = MAX_VIEW_BUTTONS
      }
      if (maxRight > totalPages.length) {
        maxRight = totalPages.length
        maxLeft = totalPages.length - (MAX_VIEW_BUTTONS - 1)
      }
      return { maxLeft, maxRight }
    },
    nextPage: () => {
      setCurrentPage((prev) => {
        if (prev >= totalPages.length) {
          return totalPages.length
        } else {
          return prev + 1
        }
      })
    },
    prevPage: () => {
      setCurrentPage((prev) => {
        if (prev === 1) {
          return 1
        } else {
          return prev - 1
        }
      })
    },
    goTo: (page: number) => {
      setCurrentPage(page)
    },
    goToStart: () => {
      setCurrentPage(1)
    },
    goToEnd: () => {
      setCurrentPage(totalPages.length)
    },
  }

  const { maxLeft, maxRight } = controls.calculateMaxViewButtons()
  const slicedPages = totalPages.slice(maxLeft - 1, maxRight)

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
