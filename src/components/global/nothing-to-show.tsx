type Props = {
  name: string
}

const NothingToShow = ({ name }: Props) => {
  return (
    <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center">
      <h1 className="text-lg">Não há nenhum {name} ainda.</h1>
    </div>
  )
}

export default NothingToShow
