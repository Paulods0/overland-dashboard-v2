import Container from "../components/global/container"
import CardsContainer from "../components/home-components/home-card/cards-container"
import UsersContainer from "../components/home-components/home-users/users-container"
import RecentPostsContainer from "../components/home-components/home-posts/recent-posts-container"

const HomePage = () => {
  return (
    <main>
      <Container className="flex flex-col gap-4">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <CardsContainer />
          <div className="h-56 rounded-lg w-full lg:flex-1 bg-zinc-400"></div>
        </section>

        <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
          <RecentPostsContainer />
          <UsersContainer />
        </section>
      </Container>
    </main>
  )
}

export default HomePage
