import CardStatus from "./card-status"

const CardsContainer = () => {
  return (
    <div className="flex w-full md:col-span-2 items-center flex-wrap md:flex-nowrap lg:justify-end gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <CardStatus key={index} />
      ))}
    </div>
  )
}

export default CardsContainer
