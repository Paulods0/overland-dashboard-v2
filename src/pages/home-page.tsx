import { Plus } from "lucide-react"
import Container from "../components/global/container"
import LinkButton from "@/components/ui/button/link-button"
import RecentPosts from "../components/home-components/home-posts/recent-posts"
import CardsContainer from "../components/home-components/home-card/cards-container"
import UsersContainer from "../components/home-components/home-users/users-container"
import HighlightedCard from "@/components/home-components/highlighted-card/highlighted-card"
import ProductContainer from "@/components/home-components/product-container/product-container"

const HomePage = () => {
  return (
    <main className="flex-1 w-full h-full py-4">
      <Container className="flex flex-col gap-4">
        <div className="w-full h-fit lg:h-[45vh] py-2 flex lg:flex-row flex-col items-center gap-2">
          <CardsContainer />
          <HighlightedCard />
        </div>

        <RecentPosts />
        <div className="grid grid-cols-1 lg:h-[60vh] lg:grid-cols-3 rounded-xl gap-4">
          <div className="lg:col-span-2 rounded-2xl bg-blackAndLight border w-full flex flex-col lg:items-end gap-2 p-4">
            <div className="w-full flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold lg:font-normal lg:text-base ">
                Produtos
              </h1>
              <div className="flex items-center lg:justify-normal justify-end gap-2">
                <LinkButton
                  href="/loja"
                  icon={Plus}
                  className="bg-white text-lightBlack lg:w-full w-fit"
                />
              </div>
            </div>
            <ProductContainer />
          </div>
          <UsersContainer />
        </div>
      </Container>
    </main>
  )
}

export default HomePage
