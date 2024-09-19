import {
  Carousel,
  CarouselNext,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
} from "../ui/carousel"
import { Classified } from "@/api/classified/classified.types"

type Props = {
  post: Classified
}

const ClassifiedCarousel = ({ post }: Props) => {
  return (
    <Carousel>
      <CarouselContent>
        {post.images && post.images.length > 0 ? (
          post.images.map((post, index) => (
            <CarouselItem key={index}>
              <img
                src={post}
                alt="Imagem"
                className="h-[200px] w-full object-contain"
              />
            </CarouselItem>
          ))
        ) : (
          <h1>Não há nada.</h1>
        )}
      </CarouselContent>
      <CarouselPrevious className="bg-white text-black" />
      <CarouselNext className="bg-white text-black" />
    </Carousel>
  )
}

export default ClassifiedCarousel
