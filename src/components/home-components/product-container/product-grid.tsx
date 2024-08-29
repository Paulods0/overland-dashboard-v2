import Box from "@/components/global/box"
import { Product } from "@/api/product/product.types"

type Props = {
  products?: Product[]
}

const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-x-auto w-full gap-2">
      {products?.map((product, index) => {
        const formatedPice = new Intl.NumberFormat("currency", {
          style: "currency",
          currency: "AKZ",
        }).format(Number(product.price))
        return (
          <Box key={index} className="flex flex-col rounded-xl gap-2 w-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg object-cover h-20"
            />
            <div className="flex flex-col w-full">
              <h4 className="text-sm md:text-normal capitalize">{product.name}</h4>
              <h4 className="text-sm md:text-normal text-zinc-400">{product.category}</h4>
              <h4 className="text-sm md:text-normal italic">Preço: {formatedPice}</h4>
            </div>
          </Box>
        )
      })}
    </div>
  )
}

export default ProductGrid