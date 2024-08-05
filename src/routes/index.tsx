import { Page } from "./lazy-pages"
import ProtectedRoutes from "../protected-routes"
import NotFoundPage from "../pages/not-found-page"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Page.LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        index: true,
        element: <Page.HomePage />,
      },
      {
        path: "novo",
        element: <Page.SelectPostType />,
      },
      {
        path: "novo/post-normal",
        element: <Page.AddPostPage />,
      },
      {
        path: "novo/agenda-ao",
        element: <Page.AddSchedulePage />,
      },
      {
        path: "novo/dica",
        element: <Page.AddTipsPage />,
      },
      {
        path: "novo/parceiro",
        element: <Page.AddPartnersPage />,
      },
      {
        path: "posts",
        element: <Page.AllPosts />,
      },
      {
        path: "usuários",
        element: <Page.UsersPage />,
      },
      {
        path: "loja",
        element: <Page.StorePage />,
      },
      {
        path: "inscritos",
        element: <Page.SubsPage />,
      },
      {
        path: "dicas",
        element: <Page.TipsPage />,
      },
      {
        path: "parceiros",
        element: <Page.PartnersPage />,
      },
      {
        path: "agenda-ao",
        element: <Page.SchedulePostsPage />,
      },
      {
        path: "classificados",
        element: <Page.ClassifiedPostsPage />,
      },
    ],
  },
])
