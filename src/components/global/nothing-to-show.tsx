import { twMerge } from "tailwind-merge"

type Props = {
  name: string
  className?: string
}

const NothingToShow = ({ name, className }: Props) => {
  return (
    <div
      className={twMerge(
        "w-full h-[calc(100vh-300px)] flex items-center justify-center",
        className
      )}
    >
      <h1 className="text-lg">Não há nenhum {name} ainda.</h1>
    </div>
  )
}

export default NothingToShow
